import { useEffect, useState } from "react";
import api from "../api/axios";
import { Trash2, Edit2, Mail, CheckCheck } from "lucide-react";
import Swal from "sweetalert2";

function AdminPanel() {
    const [bookings, setBookings] = useState([]);
    const [messages, setMessages] = useState([]);
    const [activeTab, setActiveTab] = useState("bookings");

    const fetchData = async () => {
        try {
            const [bRes, mRes] = await Promise.all([
                api.get("/bookings/all"),
                api.get("/messages/all")
            ]);
            setBookings(bRes.data);
            setMessages(mRes.data);
        } catch (err) {
            console.error("Fetch error", err);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const showBookingDetails = (b) => {
        Swal.fire({
            title: `<span style="font-weight: 900; color: #111;">Appointment Details</span>`,
            html: `
                <div style="text-align: left; font-family: 'Inter', sans-serif; padding: 10px;">
                    <div style="background: #fff5f8; padding: 15px; border-radius: 20px; margin-bottom: 15px; border: 1px solid #ffe4ed;">
                        <p style="margin: 0; font-size: 10px; font-weight: 900; color: #db2777; letter-spacing: 1px;">CLIENT</p>
                        <p style="margin: 5px 0 0; font-weight: 700; font-size: 16px;">${b.userId?.fullName || "Guest User"}</p>
                        <p style="margin: 0; font-size: 13px; color: #666;">${b.userId?.email || "No email provided"}</p>
                    </div>
                    <div style="padding: 5px 15px;">
                        <p style="margin: 0 0 5px; font-size: 13px;"><strong>Service:</strong> <span style="color: #db2777;">${b.serviceName}</span></p>
                        <p style="margin: 0 0 5px; font-size: 13px;"><strong>Date:</strong> ${b.date}</p>
                        <p style="margin: 0; font-size: 13px;"><strong>Time:</strong> ${b.time}</p>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Reschedule',
            cancelButtonText: 'Close',
            confirmButtonColor: '#db2777',
            cancelButtonColor: '#f3f4f6',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) editBooking(b);
        });
    };

    const readMessage = (msg) => {
        Swal.fire({
            title: `<div style="display: flex; align-items: center; gap: 10px; justify-content: center;">
                        <span style="font-size: 20px;">✉️</span>
                        <span style="font-weight: 900;">Message</span>
                    </div>`,
            html: `
                <div style="text-align: left; padding: 10px;">
                    <div style="margin-bottom: 20px;">
                        <p style="margin: 0; font-size: 11px; font-weight: 900; color: #999; text-transform: uppercase;">From</p>
                        <p style="margin: 2px 0; font-weight: 800; font-size: 18px; color: #111;">${msg.fullName}</p>
                        <p style="margin: 0; font-size: 13px; color: #db2777; font-weight: 600;">${msg.email}</p>
                    </div>
                    <div style="background: #f9fafb; padding: 20px; border-radius: 20px; border: 1px solid #f3f4f6;">
                        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #444; white-space: pre-wrap;">&quot;${msg.message}&quot;</p>
                    </div>
                    <p style="margin-top: 15px; font-size: 10px; color: #ccc; text-align: right;">Received: ${new Date(msg.createdAt).toLocaleString()}</p>
                </div>
            `,
            confirmButtonText: msg.status === 'read' ? 'Close' : 'Mark as read',
            confirmButtonColor: '#000',
        }).then(async (result) => {
            if (result.isConfirmed && msg.status !== 'read') {
                try {
                    await api.patch(`/messages/${msg._id}/read`);
                    setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, status: 'read' } : m));
                } catch (err) {
                    console.error("Could not mark as read", err);
                }
            }
        });
    };

    const deleteBooking = async (id) => {
        const result = await Swal.fire({
            title: 'Cancel booking?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Yes, cancel it',
        });
        if (result.isConfirmed) {
            try {
                await api.delete(`/bookings/${id}`);
                setBookings(bookings.filter(b => b._id !== id));
                Swal.fire({ title: 'Cancelled!', icon: 'success', confirmButtonColor: '#000' });
            } catch (err) {
                Swal.fire('Error', 'Could not cancel booking', 'error');
            }
        }
    };

    const editBooking = async (booking) => {
        const { value: formValues } = await Swal.fire({
            title: 'Change Time',
            html: `
                <input id="swal-date" type="date" class="swal2-input" value="${booking.date}" style="border-radius: 15px;">
                <select id="swal-time" class="swal2-input" style="border-radius: 15px;">
                    <option value="10:00 AM" ${booking.time === "10:00 AM" ? "selected" : ""}>10:00 AM</option>
                    <option value="12:00 PM" ${booking.time === "12:00 PM" ? "selected" : ""}>12:00 PM</option>
                    <option value="02:00 PM" ${booking.time === "02:00 PM" ? "selected" : ""}>02:00 PM</option>
                    <option value="04:00 PM" ${booking.time === "04:00 PM" ? "selected" : ""}>04:00 PM</option>
                    <option value="06:00 PM" ${booking.time === "06:00 PM" ? "selected" : ""}>06:00 PM</option>
                </select>
            `,
            showCancelButton: true,
            confirmButtonText: 'Save',
            confirmButtonColor: '#db2777',
            preConfirm: () => ({
                date: document.getElementById('swal-date').value,
                time: document.getElementById('swal-time').value
            })
        });

        if (formValues) {
            try {
                await api.put(`/bookings/${booking._id}`, formValues);
                setBookings(bookings.map(b => b._id === booking._id ? { ...b, ...formValues } : b));
                Swal.fire({ title: 'Success!', icon: 'success', confirmButtonColor: '#db2777' });
            } catch (err) {
                Swal.fire('Error', err.response?.data?.message || 'Could not reschedule', 'error');
            }
        }
    };

    const deleteMessage = async (id) => {
        const result = await Swal.fire({
            title: 'Delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000',
            confirmButtonText: 'Delete'
        });
        if (result.isConfirmed) {
            try {
                await api.delete(`/messages/${id}`);
                setMessages(messages.filter(m => m._id !== id));
            } catch (err) {
                Swal.fire('Error', 'Could not delete message', 'error');
            }
        }
    };

    const unreadCount = messages.filter(m => m.status !== 'read').length;

    return (
        <div className="max-w-6xl mx-auto p-6 min-h-screen">
            <h1 className="text-4xl font-black mb-10 text-gray-900 tracking-tight">Admin Dashboard</h1>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 bg-gray-100 p-2 rounded-[28px] w-fit">
                <button
                    onClick={() => setActiveTab("bookings")}
                    className={`px-8 py-3 rounded-[22px] font-bold transition-all ${activeTab === "bookings" ? "bg-white text-pink-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                    Bookings <span className="ml-2 text-[10px] bg-pink-100 px-2 py-0.5 rounded-full">{bookings.length}</span>
                </button>
                <button
                    onClick={() => setActiveTab("messages")}
                    className={`px-8 py-3 rounded-[22px] font-bold transition-all ${activeTab === "messages" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                    Messages
                    {unreadCount > 0 && (
                        <span className="ml-2 text-[10px] bg-pink-500 text-white px-2 py-0.5 rounded-full">{unreadCount} new</span>
                    )}
                    {unreadCount === 0 && (
                        <span className="ml-2 text-[10px] bg-gray-200 px-2 py-0.5 rounded-full">{messages.length}</span>
                    )}
                </button>
            </div>

            <div className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100">
                {activeTab === "bookings" ? (
                    <div className="overflow-x-auto">
                        {bookings.length === 0 ? (
                            <div className="text-center py-20 text-gray-400">No bookings yet.</div>
                        ) : (
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Client</th>
                                        <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Service</th>
                                        <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Time</th>
                                        <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">Manage</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {bookings.map(b => (
                                        <tr key={b._id} className="hover:bg-pink-50/30 transition-colors group cursor-pointer" onClick={() => showBookingDetails(b)}>
                                            <td className="p-6">
                                                <div className="font-bold text-gray-800">{b.userId?.fullName || "Guest"}</div>
                                                <div className="text-xs text-gray-400">{b.userId?.email || "No email"}</div>
                                            </td>
                                            <td className="p-6">
                                                <span className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-bold">{b.serviceName}</span>
                                            </td>
                                            <td className="p-6">
                                                <div className="text-sm font-bold text-gray-700">{b.date}</div>
                                                <div className="text-xs text-gray-400">{b.time}</div>
                                            </td>
                                            <td className="p-6" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex justify-center gap-2">
                                                    <button onClick={() => editBooking(b)} className="p-3 text-gray-300 hover:text-blue-500 hover:bg-white rounded-xl transition-all shadow-sm shadow-transparent hover:shadow-blue-100">
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button onClick={() => deleteBooking(b._id)} className="p-3 text-gray-300 hover:text-red-500 hover:bg-white rounded-xl transition-all shadow-sm shadow-transparent hover:shadow-red-100">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {messages.length === 0 ? (
                            <div className="text-center py-20 text-gray-400">No messages yet.</div>
                        ) : (
                            messages.map(m => (
                                <div
                                    key={m._id}
                                    className={`p-8 transition flex justify-between items-center group cursor-pointer ${m.status === 'read' ? 'hover:bg-gray-50/50' : 'bg-pink-50/30 hover:bg-pink-50/60'}`}
                                    onClick={() => readMessage(m)}
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            {m.status !== 'read' && (
                                                <span className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0" title="Unread" />
                                            )}
                                            <span className="font-black text-gray-900 tracking-tight">{m.fullName}</span>
                                            <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md font-bold uppercase">{m.email}</span>
                                            {m.status === 'read' && <CheckCheck size={14} className="text-gray-300" />}
                                        </div>
                                        <p className="text-gray-500 line-clamp-1 text-sm bg-gray-50 p-3 rounded-2xl border border-gray-100 inline-block max-w-xl italic">
                                            &quot;{m.message}&quot;
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <Mail size={16} className={m.status === 'read' ? 'text-gray-200' : 'text-pink-400'} />
                                        <button onClick={(e) => { e.stopPropagation(); deleteMessage(m._id); }} className="p-4 text-gray-200 hover:text-red-500 transition-colors">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminPanel;
