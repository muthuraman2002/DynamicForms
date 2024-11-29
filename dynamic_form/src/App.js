import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
 import './App.css'
import Home from './home/home';
import Login from './login/login';
import Signup from './login/signUp';
import About from './home/about';
import Form from './form/form';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Links */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/add/from" element={<Form />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
