import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo.jpg" alt="Pentecostal Holiness Church Logo" className="logo" />
        <h1>Pentecostal Holiness Church</h1>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="home" className="home">
          <h2>Welcome to Our Church</h2>
          <p>Join us in worship and fellowship as we grow in faith together.</p>
        </section>
        <section id="about" className="about">
          <h2>About Us</h2>
          <p>The Pentecostal Holiness Church is dedicated to spreading the Gospel and serving our community.</p>
        </section>
        <section id="services" className="services">
          <h2>Services</h2>
          <p>Sunday Worship: 10 AM<br />Wednesday Prayer: 7 PM<br />Bible Study: Thursdays 6 PM</p>
        </section>
        <section id="contact" className="contact">
          <h2>Contact Us</h2>
          <p>Address: 123 Church Street, City, State<br />Phone: (123) 456-7890<br />Email: info@pentecostalholiness.org</p>
        </section>
      </main>
      <footer>
        <p>&copy; 2025 Pentecostal Holiness Church. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
