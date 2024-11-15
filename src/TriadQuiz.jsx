import {useState} from 'react'
import './App.css'
import Fretboard from "./Fretboard.jsx";
import TriadChooser from "./TriadChooser.jsx";

function TriadQuiz() {
    const [chord, setChord] = useState([-1, -1, -1, -1, -1, -1]);

    return (
        <div>
            <div>Generate a triad, then see if you can identify its inversion and/or key!</div>
            <Fretboard played={chord}/>
            <TriadChooser setChord={setChord}/>
        </div>
    )
}

export default TriadQuiz
