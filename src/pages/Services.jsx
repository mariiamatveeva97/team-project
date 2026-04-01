import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock, Star } from "lucide-react";
import { servicesData } from "../data/servicesData";

function Services() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const services = servicesData;

    const filteredServices = services.filter((service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Find Your Perfect Service</h1>
                    <p className="text-gray-500">Book highly-rated professionals in seconds</p>
                </div>

                {/* Search bar */}
                <div className="relative max-w-2xl mx-auto mb-16">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                        <Search className="text-gray-400" size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for haircut, nails, massage..."
                        className="w-full pl-14 pr-6 py-5 bg-white border-none rounded-3xl shadow-xl focus:ring-2 focus:ring-black transition-all outline-none text-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 hover:text-black"
                        >
                            Clear
                        </button>
                    )}
                </div>

                {/* Service List */}
                {filteredServices.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredServices.map((service) => (
                            <div key={service.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
                                <div className="h-56 overflow-hidden relative">
                                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                        {service.category}
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                                        <div className="flex items-center gap-1 text-sm font-bold">
                                            <Star size={14} className="fill-black" /> {service.rating}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                                        <Clock size={14} /> <span>{service.duration}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-t border-gray-50 pt-6">
                                        <span className="text-2xl font-black">{service.price}</span>
                                        <button
                                            onClick={() => navigate(`/booking?service=${service.title}`)}
                                            className="px-8 py-3 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition active:scale-95 shadow-lg shadow-black/10"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* If nothing was founded */
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">💔</div>
                        <h3 className="text-xl font-bold text-gray-900">No services found</h3>
                        <p className="text-gray-500">Try searching for something else, like "Haircut".</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Services;