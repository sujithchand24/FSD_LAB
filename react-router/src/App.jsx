
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
    return (
        <div className="content">
            <h1>Welcome to Home Page</h1>
            <p>This is the home page of our React website.</p>
        </div>
    );
}

function About() {
    return (
        <div className="content">
            <h1>About Us</h1>
            <p>We are a learning community focused on technology,
               programming and innovation.</p>
        </div>
    );
}

function Contact() {
    return (
        <div className="content">
            <h1>Contact Us</h1>
            <p>Email: blog@gmail.com</p>
            <p>Phone: 9876543210</p>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <nav>
                <h2>My Website</h2>
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>

            <footer>
                <p>© 2026 My Website. All Rights Reserved.</p>
            </footer>
        </BrowserRouter>
    );
}

export default App;
