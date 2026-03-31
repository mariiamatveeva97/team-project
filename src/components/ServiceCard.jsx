function ServiceCard({ title, description, price }) {
    return (
        <div className="service-card">
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="price">{price}</span>
        <button className="book-btn">Book Now</button>
        </div>
    );
}

export default ServiceCard;
