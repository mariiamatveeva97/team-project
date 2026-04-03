import { useState } from "react";
import { Send, User, Mail, MessageSquare, Info } from "lucide-react";

function Contact() {
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);


        setTimeout(() => {
            setIsSubmitting(false);
            setShowModal(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
            <div className="max-w-4xl w-full grid md:grid-cols-2 bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100">

                {/* Left panel: INFO */}
                <div className="bg-black p-12 text-white flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold mb-6">How can we help?</h1>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            Our team usually responds within 2 hours. Ask us anything about our services or your booking.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/10 rounded-xl"><Mail size={20} /></div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold">Email us</p>
                                    <p className="text-sm">support@smartbooking.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/10 rounded-xl"><Info size={20} /></div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold">FAQ</p>
                                    <p className="text-sm">Visit our help docs</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-xs text-gray-500 italic">
                        "The best customer service I've ever experienced!" — Sarah J.
                    </div>
                </div>

                {/* Right panel: FORM */}
                <div className="p-12">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative">
                            <label className="text-xs font-bold text-gray-400 uppercase mb-2 block ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-xs font-bold text-gray-400 uppercase mb-2 block ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-xs font-bold text-gray-400 uppercase mb-2 block ml-1">Message</label>
                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-4 text-gray-400" size={18} />
                                <textarea
                                    placeholder="Tell us what's on your mind..."
                                    rows="4"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 transition-all outline-none resize-none"
                                ></textarea>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl active:scale-[0.98] disabled:bg-gray-400"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                            {!isSubmitting && <Send size={18} />}
                        </button>
                    </form>
                </div>
            </div>

            {/* SUCCESS MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[32px] p-10 max-w-sm w-full text-center shadow-2xl scale-in-center">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Send size={40} />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Success!</h2>
                        <p className="text-gray-500 mb-8">Your message has been sent. We'll get back to you soon.</p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full py-4 bg-gray-100 text-black font-bold rounded-2xl hover:bg-gray-200 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Contact;