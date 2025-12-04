import React, { useState } from 'react';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const verses = [
    "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. - John 3:16",
    "Trust in the Lord with all your heart and lean not on your own understanding. - Proverbs 3:5",
    "The Lord is my shepherd; I shall not want. - Psalm 23:1",
    "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go. - Joshua 1:9",
    "Love the Lord your God with all your heart and with all your soul and with all your mind. - Matthew 22:37",
    "I can do all things through Christ who strengthens me. - Philippians 4:13",
    "The peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus. - Philippians 4:7",
    "And we know that in all things God works for the good of those who love him, who have been called according to his purpose. - Romans 8:28"
  ];

  const today = new Date().toDateString();
  const seed = today.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const verseIndex = seed % verses.length;
  const dailyVerse = verses[verseIndex];
  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo.jpg" alt="Pentecostal Holiness Church Logo" className="logo" />
        <h1>Pentecostal Holiness Church</h1>
        <button className="burger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <nav className={menuOpen ? 'nav-open' : ''}>
          <ul>
            <li><a href="#home" onClick={toggleMenu}>Home</a></li>
            <li><a href="#services" onClick={toggleMenu}>Services</a></li>
            <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="home" className="home">
          <h2>Welcome to Our Church</h2>
          <p>Join us in worship and fellowship as we grow in faith together.</p>
          <blockquote className="verse">{dailyVerse}</blockquote>
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
