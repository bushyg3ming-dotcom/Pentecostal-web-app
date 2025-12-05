import React, { useState } from 'react';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
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

  const downloadNewsletter = () => {
    // Simple PDF download simulation - in a real app, you'd use a PDF library
    const newsletterContent = `
Pentecostal Holiness Church Newsletter
${new Date().toLocaleDateString()}

Church Announcements:
- Sunday Worship: 10 AM
- Wednesday Prayer: 7 PM
- Bible Study: Thursdays 6 PM

Daily Verse: ${dailyVerse}

Contact Information:
Address: 5 Frederick Street, Davidsonville, Roodepoort, 1724
Phone: (123) 456-7890
Email: pentecostalholychurch@gmail.com
    `;

    const blob = new Blob([newsletterContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PHC_Newsletter_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
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
          </>
        );
      case 'announcements':
        return (
          <section className="announcements">
            <h2>Church Announcements</h2>
            <div className="announcements-container">
              <div className="announcement-card">
                <h3>🎵 Special Music Sunday</h3>
                <p className="announcement-date">December 8, 2025</p>
                <p>Join us this Sunday as our choir presents special Christmas music to celebrate the season of Advent.</p>
              </div>
              <div className="announcement-card">
                <h3>🕊️ Community Prayer Meeting</h3>
                <p className="announcement-date">December 10, 2025</p>
                <p>A special prayer meeting for peace and unity in our community. All are welcome to join us in seeking God's guidance.</p>
              </div>
              <div className="announcement-card">
                <h3>🎄 Christmas Eve Service</h3>
                <p className="announcement-date">December 24, 2025</p>
                <p>Celebrate the birth of our Savior with candlelight service, carols, and communion. Service begins at 7 PM.</p>
              </div>
              <div className="announcement-card">
                <h3>📖 New Members Class</h3>
                <p className="announcement-date">Every Sunday</p>
                <p>New to our church? Join our New Members Class after Sunday service to learn more about our community and faith.</p>
              </div>
            </div>

            <div className="newsletter-section">
              <h2>Weekly Newsletter</h2>
              <div className="newsletter-card">
                <h3>Stay Connected with Our Weekly Newsletter</h3>
                <p>Receive the latest updates, announcements, prayer requests, and inspirational content delivered directly to you.</p>
                <div className="newsletter-content">
                  <h4>This Week's Highlights:</h4>
                  <ul>
                    <li>Sunday Worship Schedule</li>
                    <li>Upcoming Events & Activities</li>
                    <li>Daily Scripture Reading</li>
                    <li>Prayer Requests & Praises</li>
                    <li>Community Updates</li>
                  </ul>
                  <p><strong>Daily Verse:</strong> {dailyVerse}</p>
                </div>
                <button className="download-btn" onClick={downloadNewsletter}>
                  📄 Download Newsletter (PDF)
                </button>
              </div>
            </div>
          </section>
        );
      case 'services':
        return (
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
        );
      case 'contact':
        return (
          <section id="contact" className="contact">
            <h2>Contact Us</h2>
            <div className="contact-card">
              <p><strong>Address:</strong> 5 Frederick Street, Davidsonville, Roodepoort, 1724</p>
              <p><strong>Phone:</strong> (123) 456-7890</p>
              <p><strong>Email:</strong> pentecostalholychurch@gmail.com</p>
              <p>We'd love to hear from you! Visit us or reach out to join our faith community.</p>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <img src="/logo.jpg" alt="Pentecostal Holiness Church Logo" className="logo" />
          <h1>Pentecostal Holiness Church</h1>
        </div>
        <nav className={menuOpen ? 'nav-open' : ''}>
          <ul>
            <li><a href="#home" onClick={() => navigateTo('home')}>Home</a></li>
            <li><a href="#announcements" onClick={() => navigateTo('announcements')}>Announcements</a></li>
            <li><a href="#services" onClick={() => navigateTo('services')}>Services</a></li>
            <li><a href="#contact" onClick={() => navigateTo('contact')}>Contact</a></li>
          </ul>
        </nav>
        <button className="burger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </header>
      <main>
        {renderPage()}
      </main>
      <footer>
        <p>&copy; 2025 Pentecostal Holiness Church. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
