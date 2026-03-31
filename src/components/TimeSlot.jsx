function TimeSlot({ time, selected, onSelect }) {
    return (
        <button
        className={`time-slot ${selected ? "active" : ""}`}
        onClick={onSelect}
        >
        {time}
        </button>
    );
}

export default TimeSlot;
