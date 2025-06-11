import "./switch_button.css";

export function SwitchButton({ state, setState }) {
    const handleClick = () => {
        setState(!state);
    };

    return (
        <div className="switch-container" onClick={handleClick}>
            <div className={`switch-thumb ${state ? "" : "right"}`} />
            <div className={`switch-option ${state ? "active" : ""}`}> Joint </div>
            <div className={`switch-option ${!state ? "active" : ""}`}>Cartesian</div>
        </div>
    );
};
