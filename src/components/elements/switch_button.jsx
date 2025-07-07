import "./switch_button.css";

export function SwitchButton({ state, setState, left_word, right_word, fontSize = '17px', backgroundColor = '#007bff' }) {
    const handleClick = () => {
        setState(!state);
    };

    return (
        <button className="switch-container" onClick={handleClick} style={{ height: '50px', fontSize: fontSize, backgroundColor: backgroundColor }}>
            <div className={`switch-thumb ${state ? "" : "right"}`} />
            <div className={`switch-option ${state ? "active" : ""}`}> {left_word} </div>
            <div className={`switch-option ${!state ? "active" : ""}`}>{right_word}</div>
        </button>
    );
};
