import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {triad} from "./triad.js";
import {getKey} from "./triad.js";

function TriadChooser({setChord}) {

    const [position, setPosition] = useState(null);
    const [inversion, setInversion] = useState(null);
    const [key, setKey] = useState(null);
    const [stringSet, setStringSet] = useState(null);

    const handleChangeChord = (newChord) => {
        setChord(newChord);
    };

    const update = () => {

        // Clear the quiz buttons
        document.querySelectorAll('button.triad-button').forEach((btn) => {
            btn.style.backgroundColor = '';
        });
        document.querySelectorAll('button.key-button').forEach((btn) => {
            btn.style.backgroundColor = '';
        });

        // Pick new random values.
        let newPosition = Math.floor(Math.random() * 11)
        setPosition(newPosition);
        let newInversion = Math.floor(Math.random() * 3)
        setInversion(newInversion);
        let newStringSet = Math.floor(Math.random() * 4)
        setStringSet(newStringSet);

        setKey(getKey(newPosition, newInversion, newStringSet));
    };

    // Run update when component is initialized.
    useEffect(() => {
        update();
    }, []);

    // Render component when properties change.
    useEffect(() => {
        if (position !== null && inversion !== null && stringSet !== null) {

            // Find the triad described by those values.
            let chord = triad(position, inversion, stringSet);

            // Update our parent with the new triad.
            handleChangeChord(chord);
        }
    }, [position, inversion, stringSet]);


    const getTriadButtonStyle = (buttonIndex, inversion) => ({
        backgroundColor: buttonIndex === inversion ? 'green' : 'red'
    });

    const getKeyButtonStyle = (buttonIndex, inversion) => ({
        backgroundColor: buttonIndex === key ? 'green' : 'red'
    });


    return (
        <div>
            <button onClick={() => {
                update();
            }}>
                Next Triad
            </button>
            <div style={{marginTop: '10px'}}>
                {['1-3-5', '3-5-1', '5-1-3'].map((label, idx) => (
                    <button
                        key={label}
                        className="triad-button"
                        onClick={() => {
                            const newStyle = getTriadButtonStyle(idx, inversion);
                            Object.assign(event.target.style, newStyle);
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div style={{marginTop: '10px'}}>
                {['A', 'A\u266F/B\u266D', 'B', 'C', 'C\u266F/D\u266D', 'D', 'D\u266F/E\u266D', 'E', 'F', 'F\u266F/G\u266D', 'G', 'G\u266F/A\u266D'].map((label, idx) => (
                    <button
                        key={label}
                        className="key-button"
                        onClick={() => {
                            const newStyle = getKeyButtonStyle(idx, inversion);
                            Object.assign(event.target.style, newStyle);
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div>
            </div>
        </div>
    )


}

export default TriadChooser;