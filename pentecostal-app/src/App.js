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
        <div className="header-content">
          <img src="/logo.jpg" alt="Pentecostal Holiness Church Logo" className="logo" />
          <h1>Pentecostal Holiness Church</h1>
        </div>
        <nav className={menuOpen ? 'nav-open' : ''}>
          <ul>
            <li><a href="#home" onClick={toggleMenu}>Home</a></li>
            <li><a href="#services" onClick={toggleMenu}>Services</a></li>
            <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
          </ul>
        </nav>
        <button className="burger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </header>
      <main>
        <section id="home" className="hero">
          <div className="hero-content">
            <div className="cross-icon">✝</div>
            <h2>Welcome to Our Church</h2>
            <p>Join us in worship and fellowship as we grow in faith together.</p>
            <button className="cta-button">Join Our Community</button>
          </div>
        </section>
        <div className="verse-card">
          <blockquote className="verse">{dailyVerse}</blockquote>
        </div>
        <section id="services" className="services">
          <h2>Our Services</h2>
          <div className="service-cards">
            <div className="service-card">
              <h3>Sunday Worship</h3>
              <p>Join us every Sunday at 10 AM for an inspiring worship service filled with praise, prayer, and the Word of God.</p>
            </div>
            <div className="service-card">
              <h3>Wednesday Prayer</h3>
              <p>Come together in prayer every Wednesday at 7 PM to seek God's guidance and intercede for our community.</p>
            </div>
            <div className="service-card">
              <h3>Bible Study</h3>
              <p>Deepen your understanding of Scripture during our Thursday Bible Study sessions at 6 PM.</p>
            </div>
          </div>
        </section>
        <section id="contact" className="contact">
          <h2>Contact Us</h2>
          <div className="contact-card">
            <p><strong>Address:</strong> 5 Frederick Street, Davidsonville, Roodepoort, 1724</p>
            <p><strong>Phone:</strong> (123) 456-7890</p>
            <p><strong>Email:</strong> pentecostalholychurch@gmail.com</p>
            <p>We'd love to hear from you! Visit us or reach out to join our faith community.</p>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2025 Pentecostal Holiness Church. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
