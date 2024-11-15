import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {getNote} from "./triad.js";
import {singleNoteChord} from "./triad.js";

function NoteChooser({setChord}) {

    const [position, setPosition] = useState(null);
    const [string, setString] = useState(null);
    const [note, setNote] = useState(null);

    const handleChangeChord = (newChord) => {
        setChord(newChord);
    };

    const update = () => {

        // Clear the quiz buttons
        document.querySelectorAll('button.note-button').forEach((btn) => {
            btn.style.backgroundColor = '';
        });

        // Pick new random values.
        let newPosition = Math.floor(Math.random() * 11)
        setPosition(newPosition);
        let newString = Math.floor(Math.random() * 6)
        setString(newString);

        setNote(getNote(newPosition, newString));
    };

    // Run update when component is initialized.
    useEffect(() => {
        update();
    }, []);

    // Render component when properties change.
    useEffect(() => {
        if (string !== null) {

            // Find the triad described by those values.
            let chord = singleNoteChord(position, string);

            // Update our parent with the new triad.
            handleChangeChord(chord);
        }
    }, [position, string, note]);

    
    const getNoteButtonStyle = (buttonIndex, note) => ({
        backgroundColor: buttonIndex === note ? 'green' : 'red'
    });


    return (
        <div>
            <button onClick={() => {
                update();
            }}>
                Next Note
            </button>
            <div style={{marginTop: '10px'}}>
                {['A', 'A\u266F/B\u266D', 'B', 'C', 'C\u266F/D\u266D', 'D', 'D\u266F/E\u266D', 'E', 'F', 'F\u266F/G\u266D', 'G', 'G\u266F/A\u266D'].map((label, idx) => (
                    <button
                        key={label}
                        className="note-button"
                        onClick={() => {
                            const newStyle = getNoteButtonStyle(idx, note);
                            Object.assign(event.target.style, newStyle);
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    )


}

export default NoteChooser;