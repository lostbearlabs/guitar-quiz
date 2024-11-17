import './App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <div>Welcome to Guitar Quiz!  Pick a page using the menu above.</div>
            <div id="welcome-list">
                <ul>
                    <li><Link to="/note">Identify notes</Link></li>
                    <li><Link to="/triad">Identify triads</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Home
