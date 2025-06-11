import React, { useState } from 'react';
import { useRef, useEffect } from 'react';

export function CustomeInput({ value, setValue, minimo, maximo }) {

    const [isEditable, setIsEditable] = useState(false);
    const [inputValue, setInputValue] = useState(null);
    const inputRef = useRef(null);


    useEffect(() => {
        setInputValue(value)
    }, [value]);

    function handleIntro() {
        if (inputValue < minimo) {
            setValue(minimo)
        } else if (inputValue > maximo) {
            setValue(maximo)
        } else {
            setValue(inputValue)
        }
    }

    const handleBlur = () => {
        handleIntro(value);
        setIsEditable(false);
    };

    function handleClick() {
        setIsEditable(true)
        inputRef.current.focus();
        inputRef.current.select();
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ display: 'flex' }}>
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    readOnly={!isEditable}
                    onKeyDown={(e) => {
                        const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', '.', 'Enter'];;
                        if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                            e.preventDefault();
                        }
                        // Evitar múltiples puntos
                        if (e.key === '.' && inputValue.includes('.')) {
                            e.preventDefault();
                        }
                        if (e.key === 'Enter') {
                            e.target.blur();
                        }
                    }}
                    onBlur={handleBlur}

                    onChange={(e) => {
                        if (isEditable) {
                            setInputValue(e.target.value);
                        }
                    }}

                    style={{
                        backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'default', width: '55px',
                        height: 'auto',
                        fontSize: '18px',
                        fontWeight: '500',
                        marginTop: '7px',
                        fontFamily: "'Roboto', sans-serif",
                        textAlign: 'left'
                    }}

                />

                <span style={{
                    width: 'auto', height: 'auto', fontSize: '18px', fontWeight: '500', marginTop: '7px', fontFamily: "'Roboto', sans-serif", marginRight: '10px'
                }}> ° </span>

            </span>


            <button onClick={handleClick} style={{ backgroundColor: 'transparent', borderRadius: '100px', marginRight: '20px' }}>
                <Pencil style={{ width: '30px' }} />
            </button>

        </div>


    )


}



export function Pencil(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height="auto"
            {...props}
        >
            <path
                fill="currentColor"
                d="m19.71 8.04l-2.34 2.33l-3.75-3.75l2.34-2.33c.39-.39 1.04-.39 1.41 0l2.34 2.34c.39.37.39 1.02 0 1.41M3 17.25L13.06 7.18l3.75 3.75L6.75 21H3zM16.62 5.04l-1.54 1.54l2.34 2.34l1.54-1.54zM15.36 11L13 8.64l-9 9.02V20h2.34z"
            ></path>
        </svg>
    )
}
