import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {getNote} from "./theory.js";
import {singleNoteChord, noteNames} from "./theory.js";
import FrameBox from "./FrameBox.jsx";

function NoteChooser({setChord}) {

    const [position, setPosition] = useState(null);
    const [string, setString] = useState(null);
    const [note, setNote] = useState(null);
    const [fretRange, setFretRange] = useState('Low');

    const handleChangeChord = (newChord) => {
        setChord(newChord);
    };

    const update = () => {

        // Clear the quiz buttons
        document.querySelectorAll('button.note-button').forEach((btn) => {
            btn.style.backgroundColor = '';
        });

        // Pick new random values.
        let minPosition = 0
        let maxPosition = 11
        if (fretRange === 'Low') {
            maxPosition = 6
        } else if (fretRange === 'High') {
            minPosition = 6
        }
        let newPosition = minPosition + Math.floor(Math.random() * (maxPosition-minPosition))
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
        <div style={{width: '800px', alignSelf: 'center', margin: 'auto'}}>
            <FrameBox label='Generate Note'>
                <div style={{
                    display: 'flex', alignItems: 'left',
                    justifyContent: 'left', marginTop: '10px',
                    padding: '10px', verticalAlign: 'middle'
                }}>

                    <div style={{paddingLeft: '125px', verticalAlign: 'middle'}}>
                        <label htmlFor="fretRange">Fret range: </label>
                        <select id="fretRange" value={fretRange} onChange={(e) => setFretRange(e.target.value)}>
                            <option value="Low" selected={true}>Low</option>
                            <option value="High">High</option>
                            <option value="Full">Full</option>
                        </select>
                    </div>

                    <div style={{paddingLeft: '50px'}}>

                        <button onClick={() => {
                            update();
                        }}>
                            Next Note
                        </button>
                    </div>
                </div>

            </FrameBox>

            <FrameBox label='Identify Note'>
                <div style={{marginTop: '20px'}}>
                    {noteNames.map((label, idx) => (
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
            </FrameBox>
        </div>
    )


}

export default NoteChooser;