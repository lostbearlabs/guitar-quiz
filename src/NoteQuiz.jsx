import {useState} from 'react'
import './App.css'
import Fretboard from "./Fretboard.jsx";
import NoteChooser from "./NoteChooser.jsx";

function NoteQuiz() {
    const [chord, setChord] = useState([-1, -1, -1, -1, -1, -1]);

    return (
        <div>
            <div>TODO - THIS IS THE NOTE QUIZ</div>
            <Fretboard played={chord}/>
            <NoteChooser setChord={setChord}/>
        </div>
    )
}

export default NoteQuiz
