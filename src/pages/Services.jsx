import ServiceCard from "../components/ServiceCard";
import "./Services.css";

function Services() {
    const services = [
        { title: "Haircut", description: "Professional haircut service.", price: "€25" },
        { title: "Beard Trim", description: "Clean and sharp beard trim.", price: "€15" },
        { title: "Hair Coloring", description: "Premium hair coloring service.", price: "€40" },
    ];

    return (
        <div className="services-container">
            <h1>Our Services</h1>

            <div className="services-grid">
                {services.map((service, index) => (
                <ServiceCard
                    key={index}
                    title={service.title}
                    description={service.description}
                    price={service.price}
                />
                ))}
            </div>
        </div>
    );
}

export default Services;
