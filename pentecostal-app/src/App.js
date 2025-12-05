import React, { useState } from 'react';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Ask Pastor form state
  const [pastorForm, setPastorForm] = useState({
    selectedPastor: '',
    requestType: '',
    isAnonymous: false,
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  const handleFormChange = (field, value) => {
    setPastorForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the data to a backend
    console.log('Form submitted:', pastorForm);
    setFormSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setPastorForm({
        selectedPastor: '',
        requestType: '',
        isAnonymous: false,
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 3000);
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
                  <span className="event-date">Recently Completed</span>
                  <span className="blessing-note">🙏 Blessed by God's Grace</span>
                </div>
              </div>

              <div className="event-card upcoming">
                <h3>🎄 Christmas Youth Retreat</h3>
                <p className="event-date">December 26-28, 2025</p>
                <p>Join us for a special Christmas retreat filled with worship, fellowship, and celebrating Jesus' birth!</p>
                <button className="register-btn">Register Interest</button>
              </div>

              <div className="event-card upcoming">
                <h3>🌸 Spring Youth Conference</h3>
                <p className="event-date">September 2026</p>
                <p>Mark your calendars for our annual youth conference with guest speakers, workshops, and powerful worship!</p>
                <button className="register-btn">Learn More</button>
              </div>
            </div>
          </section>
        );
      case 'ask-pastor':
        return (
          <section className="ask-pastor">
            <div className="pastor-intro">
              <h2>Ask a Pastor</h2>
              <p>Need spiritual guidance, biblical advice, or prayer support? Our pastors are here to help you on your faith journey. You can choose to remain completely anonymous if you prefer.</p>
            </div>

            <div className="pastor-form-container">
              {formSubmitted ? (
                <div className="success-message">
                  <div className="success-icon">🙏</div>
                  <h3>Thank You for Reaching Out!</h3>
                  <p>Your message has been sent to our pastor. {pastorForm.isAnonymous ? 'Your identity will remain anonymous.' : 'Our pastor will respond to you soon.'}</p>
                  <p>We appreciate your trust in us and look forward to supporting you spiritually.</p>
                </div>
              ) : (
                <form className="pastor-form" onSubmit={handleFormSubmit}>
                  <div className="form-section">
                    <h3>Choose Your Pastor</h3>
                    <select
                      value={pastorForm.selectedPastor}
                      onChange={(e) => handleFormChange('selectedPastor', e.target.value)}
                      required
                      className="pastor-select"
                    >
                      <option value="">Select a Pastor</option>
                      <option value="pastor-john">Pastor John Smith - Lead Pastor</option>
                      <option value="pastor-mary">Pastor Mary Johnson - Associate Pastor</option>
                      <option value="pastor-david">Pastor David Williams - Youth Pastor</option>
                      <option value="pastor-sarah">Pastor Sarah Brown - Women's Ministry</option>
                    </select>
                  </div>

                  <div className="form-section">
                    <h3>Type of Request</h3>
                    <div className="request-type-options">
                      <label className="request-option">
                        <input
                          type="radio"
                          name="requestType"
                          value="advice"
                          checked={pastorForm.requestType === 'advice'}
                          onChange={(e) => handleFormChange('requestType', e.target.value)}
                          required
                        />
                        <span className="option-label">📖 Biblical Advice & Guidance</span>
                      </label>
                      <label className="request-option">
                        <input
                          type="radio"
                          name="requestType"
                          value="prayer"
                          checked={pastorForm.requestType === 'prayer'}
                          onChange={(e) => handleFormChange('requestType', e.target.value)}
                        />
                        <span className="option-label">🙏 Prayer Request</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-section">
                    <label className="privacy-option">
                      <input
                        type="checkbox"
                        checked={pastorForm.isAnonymous}
                        onChange={(e) => handleFormChange('isAnonymous', e.target.checked)}
                      />
                      <span className="privacy-text">
                        🔒 Remain Anonymous
                        <small>Check this box if you prefer to submit your request anonymously. Our pastor will not have access to your contact information.</small>
                      </span>
                    </label>
                  </div>

                  {!pastorForm.isAnonymous && (
                    <div className="form-section contact-fields">
                      <h3>Your Contact Information</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="name">Name *</label>
                          <input
                            type="text"
                            id="name"
                            value={pastorForm.name}
                            onChange={(e) => handleFormChange('name', e.target.value)}
                            required={!pastorForm.isAnonymous}
                            placeholder="Your full name"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email *</label>
                          <input
                            type="email"
                            id="email"
                            value={pastorForm.email}
                            onChange={(e) => handleFormChange('email', e.target.value)}
                            required={!pastorForm.isAnonymous}
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone (Optional)</label>
                        <input
                          type="tel"
                          id="phone"
                          value={pastorForm.phone}
                          onChange={(e) => handleFormChange('phone', e.target.value)}
                          placeholder="(123) 456-7890"
                        />
                      </div>
                    </div>
                  )}

                  <div className="form-section">
                    <label htmlFor="message">Your Message *</label>
                    <textarea
                      id="message"
                      value={pastorForm.message}
                      onChange={(e) => handleFormChange('message', e.target.value)}
                      required
                      placeholder={pastorForm.requestType === 'prayer' ?
                        "Please share your prayer request. What would you like us to pray for?" :
                        "Share your question or situation. Our pastor will provide biblical guidance and support."
                      }
                      rows="6"
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="submit-btn">
                      📤 Send to Pastor
                    </button>
                    <p className="privacy-note">
                      <small>Your privacy is important to us. {pastorForm.isAnonymous ?
                        'Anonymous submissions are completely confidential.' :
                        'Your contact information will only be used to respond to your inquiry.'
                      }</small>
                    </p>
                  </div>
                </form>
              )}
            </div>

            <div className="pastor-info">
              <h3>Meet Our Pastors</h3>
              <div className="pastors-grid">
                <div className="pastor-card">
                  <div className="pastor-avatar">👨‍⚖️</div>
                  <h4>Pastor John Smith</h4>
                  <p className="pastor-title">Lead Pastor</p>
                  <p className="pastor-specialty">Specializes in: Biblical Teaching, Marriage Counseling, Leadership Development</p>
                </div>
                <div className="pastor-card">
                  <div className="pastor-avatar">👩‍⚖️</div>
                  <h4>Pastor Mary Johnson</h4>
                  <p className="pastor-title">Associate Pastor</p>
                  <p className="pastor-specialty">Specializes in: Women's Ministry, Prayer Ministry, Spiritual Direction</p>
                </div>
                <div className="pastor-card">
                  <div className="pastor-avatar">👨‍🎓</div>
                  <h4>Pastor David Williams</h4>
                  <p className="pastor-title">Youth Pastor</p>
                  <p className="pastor-specialty">Specializes in: Youth Ministry, Teen Counseling, Discipleship</p>
                </div>
                <div className="pastor-card">
                  <div className="pastor-avatar">👩‍💼</div>
                  <h4>Pastor Sarah Brown</h4>
                  <p className="pastor-title">Women's Ministry Pastor</p>
                  <p className="pastor-specialty">Specializes in: Women's Issues, Family Ministry, Community Outreach</p>
                </div>
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
            <li><a href="#events" onClick={() => navigateTo('events')}>Events</a></li>
            <li><a href="#ask-pastor" onClick={() => navigateTo('ask-pastor')}>Ask a Pastor</a></li>
            <li><a href="#register" onClick={() => navigateTo('register')}>Register</a></li>
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
