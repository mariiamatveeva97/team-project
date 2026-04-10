import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { Send, User, Mail, MessageSquare, Heart, Sparkles } from "lucide-react";
import Swal from "sweetalert2";

function Contact() {
    const { user } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        message: ""
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                fullName: user.fullName || "",
                email: user.email || ""
            }));
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await api.post("/messages", {
                ...formData,
                userId: user?.id || null
            });

            Swal.fire({
                title: 'Sent!',
                text: 'We love hearing from you. We’ll reply soon!',
                icon: 'success',
                confirmButtonColor: '#db2777',
                borderRadius: '24px'
            });

            setFormData(prev => ({ ...prev, message: "" }));
        } catch (err) {
            console.error("Error sending message:", err);
            Swal.fire('Error', 'Something went wrong. Try again!', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fff5f8] flex items-center justify-center px-6 py-12">
            <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white rounded-[40px] shadow-[0_30px_100px_-20px_rgba(219,39,119,0.15)] overflow-hidden border border-pink-50">

                {/* Left Panel - Pink Gradient */}
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="inline-flex p-3 bg-white/20 backdrop-blur-md rounded-2xl mb-6">
                            <Sparkles className="text-white" size={24} />
                        </div>
                        <h1 className="text-4xl font-black mb-6 leading-tight">Get in touch <br />with us</h1>
                        <p className="text-pink-100 leading-relaxed mb-8 font-medium">
                            Have questions about our services? Our pink-squad is here to help you shine!
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl group-hover:bg-white/30 transition-all">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-pink-200 uppercase font-black tracking-widest">Email Us</p>
                                    <p className="text-sm font-bold">hello@smartbooking.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl group-hover:bg-white/30 transition-all">
                                    <Heart size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-pink-200 uppercase font-black tracking-widest">Follow Us</p>
                                    <p className="text-sm font-bold">@smart.booking.style</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                        <p className="text-xs text-pink-100 font-medium">Typical response time: <span className="font-black text-white ml-1">2 Hours</span></p>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className="p-12 bg-white">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="group">
                            <label className="text-[10px] font-black text-pink-500 uppercase tracking-widest mb-3 block ml-2">Your Name</label>
                            <div className="relative">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-300 group-focus-within:text-pink-500 transition-colors" size={18} />
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="w-full pl-14 pr-6 py-5 bg-pink-50/30 border-2 border-transparent rounded-[22px] focus:bg-white focus:border-pink-200 shadow-sm focus:shadow-pink-100 transition-all outline-none font-bold text-gray-700 placeholder:text-gray-300 placeholder:font-normal"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="text-[10px] font-black text-pink-500 uppercase tracking-widest mb-3 block ml-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-300 group-focus-within:text-pink-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-14 pr-6 py-5 bg-pink-50/30 border-2 border-transparent rounded-[22px] focus:bg-white focus:border-pink-200 shadow-sm focus:shadow-pink-100 transition-all outline-none font-bold text-gray-700 placeholder:text-gray-300 placeholder:font-normal"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="text-[10px] font-black text-pink-500 uppercase tracking-widest mb-3 block ml-2">Your Message</label>
                            <div className="relative">
                                <MessageSquare className="absolute left-5 top-6 text-pink-300 group-focus-within:text-pink-500 transition-colors" size={18} />
                                <textarea
                                    required
                                    rows="4"
                                    placeholder="How can we make you happy today?"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full pl-14 pr-6 py-5 bg-pink-50/30 border-2 border-transparent rounded-[22px] focus:bg-white focus:border-pink-200 shadow-sm focus:shadow-pink-100 transition-all outline-none font-bold text-gray-700 resize-none placeholder:text-gray-300 placeholder:font-normal"
                                ></textarea>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-5 rounded-[22px] font-black text-lg flex items-center justify-center gap-3 hover:shadow-[0_15px_30px_-10px_rgba(219,39,119,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
                        >
                            {isSubmitting ? "Sending magic..." : "Send Message"}
                            {!isSubmitting && <Send size={20} />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;