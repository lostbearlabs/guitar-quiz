import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {triad, getKey, noteNames} from "./theory.js";
import FrameBox from "./FrameBox.jsx";

function TriadChooser({setChord}) {

    const [position, setPosition] = useState(null);
    const [inversion, setInversion] = useState(null);
    const [key, setKey] = useState(null);
    const [stringSet, setStringSet] = useState(null);
    const [fretRange, setFretRange] = useState('Low');
    const [triadType, setTriadType] = useState('Major');

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
        let minPosition = 0
        let maxPosition = 11
        if (fretRange === 'Low') {
            maxPosition = 5
        } else if (fretRange === 'High') {
            minPosition = 5
        }
        let newPosition = minPosition + Math.floor(Math.random() * (maxPosition - minPosition))
        setPosition(newPosition);

        setPosition(newPosition);

        // Inversions are maj-Root maj-1 maj-2 min-Root min-1 min-2
        let minInversion = 0
        let maxInversion = 5
        if (triadType === 'Major') {
            maxInversion = 3
        } else if (triadType === 'Minor') {
            minInversion = 3
        }
        let newInversion = minInversion + Math.floor(Math.random() * (maxInversion - minInversion))

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
        backgroundColor: buttonIndex === (inversion % 3) ? 'green' : 'red'
    });

    const getKeyButtonStyle = (buttonIndex, inversion) => ({
        backgroundColor: buttonIndex === key ? 'green' : 'red'
    });


    return (
        <div style={{width: '800px', alignSelf: 'center', margin: 'auto'}}>

            <FrameBox label='Generate Triad'>
                <div style={{
                    display: 'flex', alignItems: 'left',
                    justifyContent: 'left', marginTop: '10px',
                    padding: '10px', verticalAlign: 'middle'
                }}>

                    <div>
                        <div style={{paddingLeft: '125px', verticalAlign: 'middle'}}>
                            <label htmlFor="fretRange">Fret range: </label>
                            <select id="fretRange" value={fretRange} onChange={(e) => setFretRange(e.target.value)}>
                                <option value="Low" selected={true}>Low</option>
                                <option value="High">High</option>
                                <option value="Full">Full</option>
                            </select>
                        </div>

                        <div style={{paddingLeft: '125px', verticalAlign: 'middle'}}>
                            <label htmlFor="triadType">Triad type: </label>
                            <select id="triadType" value={triadType} onChange={(e) => setTriadType(e.target.value)}>
                                <option value="Major" selected={true}>Major</option>
                                <option value="Minor">Minor</option>
                                <option value="Both">Both</option>
                            </select>
                        </div>
                    </div>

                    <div style={{paddingLeft: '50px'}}>

                        <button onClick={() => {
                            update();
                        }}>
                            Next Triad
                        </button>

                    </div>
                </div>

            </FrameBox>

            <FrameBox label='Identify Triad'>

                <div style={{marginTop: '20px'}}>
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
                    {noteNames.map((label, idx) => (
                        <button
                            key={label}
                            className="key-button"
                            onClick={() => {
                                // console.log(label, idx, key);
                                const newStyle = getKeyButtonStyle(idx, inversion);
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

export default TriadChooser;