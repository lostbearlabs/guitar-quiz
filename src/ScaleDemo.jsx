import {useState} from 'react'
import './App.css'
import Fretboard from "./Fretboard.jsx";
import ScaleChooser from "./ScaleChooser.jsx";

function ScaleDemo() {
    const [chord, setChord] = useState([]);

    return (
        <div>
            <div>Explore scale degrees!</div>
            <Fretboard played={chord}/>
            <ScaleChooser onChordChange={setChord}/>
        </div>
    )
}

export default ScaleDemo
