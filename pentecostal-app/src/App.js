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
      case 'events':
        return (
          <section className="events">
            <h2>Church Events</h2>
            <div className="events-container">
              <div className="event-card featured">
                <div className="event-header">
                  <h3>🏔️ Youth Camping Trip to the Drakensberg</h3>
                  <span className="event-badge">Blessed & Memorable</span>
                </div>
                <div className="event-image">
                  <div className="mountain-icon">⛰️</div>
                </div>
                <div className="event-content">
                  <h4>The Ultimate Blessing in the Mountains!</h4>
                  <p>Our recent youth camping trip to the majestic Drakensberg Mountains was nothing short of miraculous! God blessed us with perfect weather, breathtaking views, and an outpouring of His presence that touched every heart.</p>

                  <div className="event-highlights">
                    <h5>🌟 Divine Blessings:</h5>
                    <ul>
                      <li><strong>Perfect Weather:</strong> Not a drop of rain fell during our entire trip, despite the forecast!</li>
                      <li><strong>Spiritual Awakening:</strong> Daily devotionals brought us closer to God amidst His glorious creation</li>
                      <li><strong>Community Building:</strong> Youth formed lifelong friendships and grew in faith together</li>
                      <li><strong>Natural Wonders:</strong> Hiked stunning trails with cascading waterfalls and mountain vistas</li>
                    </ul>
                  </div>

                  <div className="event-stories">
                    <h5>📖 Testimonies of God's Goodness:</h5>
                    <blockquote>"The sunrise over the mountains reminded me of God's faithfulness - new mercies every morning!" - Sarah, 16</blockquote>
                    <blockquote>"Camping under the stars, worshiping our Creator - it was pure joy!" - Michael, 17</blockquote>
                    <blockquote>"God protected us through every hike and blessed us with amazing fellowship!" - Jessica, 15</blockquote>
                  </div>

                  <div className="event-activities">
                    <h5>🎉 Fun & Fellowship:</h5>
                    <p>From campfire worship sessions and group games to stargazing and nature photography, every moment was filled with laughter, learning, and love. Our youth learned to trust God in new ways while creating memories that will last a lifetime!</p>
                  </div>

                  <div className="event-outcome">
                    <h5>✨ Life-Changing Impact:</h5>
                    <p>This blessed trip strengthened our youth's faith, built lasting relationships, and showed them that God's love is as vast as the Drakensberg mountains. Many committed to deeper walks with Christ and are excited about our next adventure!</p>
                  </div>
                </div>
                <div className="event-footer">
          <ul>
            <li><a href="#home" onClick={() => navigateTo('home')}>Home</a></li>
            <li><a href="#announcements" onClick={() => navigateTo('announcements')}>Announcements</a></li>
            <li><a href="#events" onClick={() => navigateTo('events')}>Events</a></li>
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
