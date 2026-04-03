
function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12 mt-20 text-sm">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">

                {/* LOGO */}
                <div>
                    <h2 className="text-xl font-bold text-slate-900">
                        Smart<span className="text-pink-600">Booking</span>
                    </h2>
                    <p className="text-slate-400 mt-1 font-medium">© 2026 All rights reserved.</p>
                </div>

                {/* SOCIAL ICONS */}
                <div className="flex gap-4">
                    {[
                        {
                            href: "https://instagram.com", svg: (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                </svg>
                            )
                        },
                        {
                            href: "https://facebook.com", svg: (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            )
                        }
                    ].map((social, idx) => (
                        <a
                            key={idx}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 bg-pink-50 rounded-full text-pink-600 hover:text-white hover:bg-pink-600 transition-all duration-300 shadow-sm"
                        >
                            {social.svg}
                        </a>
                    ))}
                </div>

                {/* LINKS */}
                <div className="flex gap-8 font-semibold text-slate-500">
                    <a href="/contact" className="hover:text-pink-600 transition">Questions?</a>
                    <a href="/services" className="hover:text-pink-600 transition">Our Services</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;