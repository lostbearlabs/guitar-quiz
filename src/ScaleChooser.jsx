import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {showScaleDegrees, noteNames} from "./theory.js";
import FrameBox from "./FrameBox.jsx";

function ScaleChooser({onChordChange}) {

    const [key, setKey] = useState(0); // 0 for 'A'
    const [chordSelection, setChordSelection] = useState(0);

    const handleChangeChord = (newChord) => {
        onChordChange(newChord);
    };

    // Run update when component is initialized.
    useEffect(() => {
//        update();
    }, []);

    // Render component when properties change.
    useEffect(() => {
        if (key !== null && chordSelection !== null) {

            // Find the triad described by those values.
            let chord = showScaleDegrees(key, chordSelection);

            // Update our parent with the new triad.
            handleChangeChord(chord);
        }
    }, [key, chordSelection]);


    return (
        <div style={{width: '800px', alignSelf: 'center', margin: 'auto'}}>

            <FrameBox label='Select Key and Triad'>
                <div style={{
                    display: 'flex', alignItems: 'left',
                    justifyContent: 'left', marginTop: '10px',
                    padding: '10px', verticalAlign: 'middle'
                }}>

                    <div>
                        <div style={{paddingLeft: '125px', verticalAlign: 'middle'}}>
                            <label htmlFor="key">Key: </label>
                            <select id="key" value={key} onChange={(e) => setKey(e.target.selectedIndex)}>
                                {noteNames.map((label, idx) => (
                                    <option value={idx} key={idx}>{label}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{paddingLeft: '125px', verticalAlign: 'middle'}}>
                            <label htmlFor="chord">Triad: </label>
                            <select id="chord" value={chordSelection} onChange={(e) => setChordSelection(e.target.selectedIndex)}>
                                <option value="0">All</option>
                                <option value="1">I</option>
                                <option value="2">ii</option>
                                <option value="3">iii</option>
                                <option value="4">IV</option>
                                <option value="5">V</option>
                                <option value="6">vi</option>
                                <option value="7">vii&#176;</option>
                            </select>
                        </div>
                    </div>

                </div>

            </FrameBox>

        </div>
    )


}

export default ScaleChooser;