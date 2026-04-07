import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import api from "../api/axios";

function Services() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/services")
            .then(res => {
                setServices(res.data);
                setLoading(false);
            })
            .catch(err => console.error("Error:", err));
    }, []);


    const filteredServices = services.filter((service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (service.keywords && service.keywords.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return <div className="text-center py-20 text-pink-600 font-bold">Loading beauty...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Search bar */}
                <div className="relative max-w-2xl mx-auto mb-16">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search for haircut, nails, massage..."
                        className="w-full pl-14 pr-6 py-5 bg-white rounded-3xl shadow-xl focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Services List */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredServices.map((service) => (
                        <div key={service._id} className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 group">
                            <div className="h-56 overflow-hidden relative">
                                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-duration-700" />
                                <div className="absolute top-4 left-4 bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                                    {service.category}
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                <div className="flex justify-between items-center border-t pt-6">
                                    <span className="text-2xl font-black">€{service.price}</span>
                                    <button
                                        onClick={() => navigate(`/booking?service=${service.title}`)}
                                        className="px-8 py-3 bg-black text-white rounded-2xl font-bold hover:bg-pink-600 transition shadow-lg"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Services;