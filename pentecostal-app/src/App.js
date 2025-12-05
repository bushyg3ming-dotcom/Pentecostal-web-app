import React, { useState } from 'react';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Registered pastors state
  const [registeredPastors, setRegisteredPastors] = useState([
    {
      id: 'pastor-john',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@pentecostalholiness.org',
      phone: '(123) 456-7890',
      ordinationStatus: 'ordained',
      yearsExperience: '20+',
      specializations: ['Biblical Teaching', 'Marriage Counseling', 'Leadership Development'],
      availability: 'weekdays',
      title: 'Lead Pastor'
    },
    {
      id: 'pastor-mary',
      firstName: 'Mary',
      lastName: 'Johnson',
      email: 'mary.johnson@pentecostalholiness.org',
      phone: '(123) 456-7891',
      ordinationStatus: 'ordained',
      yearsExperience: '11-20',
      specializations: ['Womens Ministry', 'Prayer Ministry', 'Spiritual Direction'],
      availability: 'flexible',
      title: 'Associate Pastor'
    },
    {
      id: 'pastor-david',
      firstName: 'David',
      lastName: 'Williams',
      email: 'david.williams@pentecostalholiness.org',
      phone: '(123) 456-7892',
      ordinationStatus: 'ordained',
      yearsExperience: '6-10',
      specializations: ['Youth Ministry', 'Teen Counseling', 'Discipleship'],
      availability: 'weekends',
      title: 'Youth Pastor'
    },
    {
      id: 'pastor-sarah',
      firstName: 'Sarah',
      lastName: 'Brown',
      email: 'sarah.brown@pentecostalholiness.org',
      phone: '(123) 456-7893',
      ordinationStatus: 'ordained',
      yearsExperience: '6-10',
      specializations: ['Womens Issues', 'Family Ministry', 'Community Outreach'],
      availability: 'weekdays',
      title: 'Women\'s Ministry Pastor'
    }
  ]);

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

  // Registration form state
  const [registrationForm, setRegistrationForm] = useState({
    userType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Pastor specific fields
    ordinationStatus: '',
    yearsExperience: '',
    specializations: [],
    availability: '',
    // Congregation member specific fields
    membershipStatus: '',
    preferredCommunication: '',
    interests: []
  });
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    userType: '',
    email: '',
    password: '',
    rememberMe: false
  });
  const [loginSubmitted, setLoginSubmitted] = useState(false);

  // Dashboard state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(''); // 'pastor' or 'admin'
  const [dashboardTab, setDashboardTab] = useState('messages');

  // Live stream state
  const [youtubeUrl, setYoutubeUrl] = useState('');

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

  const extractVideoId = (url) => {
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^"&?\/\s]{11})/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
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
                <button className="cta-button" onClick={() => navigateTo('register')}>Join Our Community</button>
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
                <button className="register-btn" onClick={() => {
                  alert('Thank you for your interest in the Christmas Youth Retreat! Registration details will be sent to your email when available. God bless you!');
                }}>Register Interest</button>
              </div>

              <div className="event-card upcoming">
                <h3>🌸 Spring Youth Conference</h3>
                <p className="event-date">September 2026</p>
                <p>Mark your calendars for our annual youth conference with guest speakers, workshops, and powerful worship!</p>
                <button className="register-btn" onClick={() => {
                  alert('Thank you for your interest! More details about the Spring Youth Conference will be available soon. Stay tuned for registration information!');
                }}>Learn More</button>
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
                      {registeredPastors.map(pastor => (
                        <option key={pastor.id} value={pastor.id}>
                          Pastor {pastor.firstName} {pastor.lastName} - {pastor.title}
                        </option>
                      ))}
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
                      rows="15"
                      style={{width: '100%', resize: 'none'}}
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
                {registeredPastors.map(pastor => (
                  <div key={pastor.id} className="pastor-card">
                    <div className="pastor-avatar">
                      {pastor.title === 'Lead Pastor' ? '👨‍⚖️' :
                       pastor.title === 'Associate Pastor' ? '👩‍⚖️' :
                       pastor.title === 'Youth Pastor' ? '👨‍🎓' :
                       pastor.title === 'Women\'s Ministry Pastor' ? '👩‍💼' :
                       pastor.title === 'Ordained Pastor' ? '👨‍⚖️' :
                       pastor.title === 'Lay Minister' ? '🙏' :
                       pastor.title === 'Ministry Student' ? '📚' : '👤'}
                    </div>
                    <h4>Pastor {pastor.firstName} {pastor.lastName}</h4>
                    <p className="pastor-title">{pastor.title}</p>
                    <p className="pastor-specialty">Specializes in: {pastor.specializations.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      case 'login':
        return (
          <section className="login">
            <div className="login-intro">
              <h2>Login to Your Account</h2>
              <p>Access your personalized church dashboard to manage your spiritual journey, connect with your pastor, and stay updated with church activities.</p>
            </div>

            <div className="login-container">
              {loginSubmitted ? (
                <div className="success-message">
                  <div className="success-icon">✅</div>
                  <h3>Login Successful!</h3>
                  <p>Welcome back! You are now logged in as a {loginForm.userType === 'pastor' ? 'Pastor' : 'Church Member'}.</p>
                  <p>You can now access all member features and connect with our church community.</p>
                </div>
              ) : (
                <form className="login-form" onSubmit={(e) => {
                  e.preventDefault();
                  console.log('Login submitted:', loginForm);

                  // Simulate login logic - in real app, this would authenticate with backend
                  if (loginForm.userType === 'pastor') {
                    // Special case: if email is admin@pastor.com, make them admin
                    if (loginForm.email === 'admin@pastor.com') {
                      setUserRole('admin');
                    } else {
                      setUserRole('pastor');
                    }
                    setIsLoggedIn(true);
                    setCurrentPage('dashboard');
                  } else if (loginForm.userType === 'member') {
                    setUserRole('member');
                    setIsLoggedIn(true);
                    setCurrentPage('user-dashboard');
                  } else {
                    setLoginSubmitted(true);
                    setTimeout(() => {
                      setLoginSubmitted(false);
                      setLoginForm({
                        userType: '',
                        email: '',
                        password: '',
                        rememberMe: false
                      });
                    }, 3000);
                  }
                }}>

                  {/* User Type Selection */}
                  <div className="form-section">
                    <h3>I am logging in as:</h3>
                    <div className="login-type-options">
                      <label className="login-type-option">
                        <input
                          type="radio"
                          name="loginUserType"
                          value="pastor"
                          checked={loginForm.userType === 'pastor'}
                          onChange={(e) => setLoginForm(prev => ({ ...prev, userType: e.target.value }))}
                          required
                        />
                        <span className="option-label">👨‍⚖️ Pastor - Access counseling dashboard</span>
                      </label>
                      <label className="login-type-option">
                        <input
                          type="radio"
                          name="loginUserType"
                          value="member"
                          checked={loginForm.userType === 'member'}
                          onChange={(e) => setLoginForm(prev => ({ ...prev, userType: e.target.value }))}
                        />
                        <span className="option-label">🙏 Church Member - Access spiritual resources</span>
                      </label>
                    </div>
                  </div>

                  {/* Login Credentials */}
                  <div className="form-section">
                    <h3>Account Credentials</h3>
                    <div className="form-group">
                      <label htmlFor="loginEmail">Email Address *</label>
                      <input
                        type="email"
                        id="loginEmail"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="loginPassword">Password *</label>
                      <input
                        type="password"
                        id="loginPassword"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* Remember Me and Links */}
                  <div className="form-section login-options">
                    <label className="remember-option">
                      <input
                        type="checkbox"
                        checked={loginForm.rememberMe}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, rememberMe: e.target.checked }))}
                      />
                      <span className="remember-text">Remember me for 30 days</span>
                    </label>

                    <div className="login-links">
                      <a href="#forgot-password" className="forgot-link">Forgot Password?</a>
                      <a href="#register" onClick={() => navigateTo('register')} className="register-link">Need an Account?</a>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="login-submit-btn">
                      🔐 Login to Account
                    </button>
                  </div>

                  {/* Security Notice */}
                  <div className="security-notice">
                    <p>🔒 <strong>Secure Login:</strong> Your login credentials are encrypted and protected. All church communications follow strict privacy guidelines.</p>
                  </div>
                </form>
              )}
            </div>

            <div className="login-features">
              <h3>Member Dashboard Features</h3>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">📖</div>
                  <h4>Spiritual Resources</h4>
                  <p>Access daily devotionals, Bible study materials, and spiritual growth resources.</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">🙏</div>
                  <h4>Pastoral Care</h4>
                  <p>Direct communication with your assigned pastor for guidance and prayer support.</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">📅</div>
                  <h4>Event Management</h4>
                  <p>Register for church events, track attendance, and receive personalized event notifications.</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">👥</div>
                  <h4>Community Hub</h4>
                  <p>Connect with fellow church members, join small groups, and participate in ministry activities.</p>
                </div>
                {loginForm.userType === 'pastor' && (
                  <>
                    <div className="feature-card pastor-feature">
                      <div className="feature-icon">🎓</div>
                      <h4>Counseling Dashboard</h4>
                      <p>Manage counseling sessions, view prayer requests, and access member care resources.</p>
                    </div>
                    <div className="feature-card pastor-feature">
                      <div className="feature-icon">📊</div>
                      <h4>Ministry Reports</h4>
                      <p>Track ministry activities, generate reports, and monitor church growth metrics.</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="login-support">
              <h3>Need Help?</h3>
              <div className="support-options">
                <div className="support-card">
                  <h4>🔑 Forgot Your Password?</h4>
                  <p>Click the "Forgot Password" link above or contact our IT support team.</p>
                  <p><strong>Email:</strong> support@pentecostalholiness.org</p>
                </div>
                <div className="support-card">
                  <h4>📞 Technical Support</h4>
                  <p>Having trouble logging in? Our support team is here to help.</p>
                  <p><strong>Phone:</strong> (123) 456-7890 ext. 100</p>
                </div>
                <div className="support-card">
                  <h4>🛡️ Account Security</h4>
                  <p>Your account security is our top priority. Learn about our security measures.</p>
                  <a href="#security" className="security-link">Read Security Guidelines</a>
                </div>
              </div>
            </div>
          </section>
        );
      case 'register':
        return (
          <section className="register">
            <div className="register-intro">
              <h2>Join Our Community</h2>
              <p>Register to connect with our church family. Whether you're a pastor looking to serve or a member seeking spiritual guidance, we're here to support your faith journey.</p>
            </div>

            <div className="register-container">
              {registrationSubmitted ? (
                <div className="success-message">
                  <div className="success-icon">🙏</div>
                  <h3>Welcome to Our Church Family!</h3>
                  <p>Thank you for registering with Pentecostal Holiness Church. {registrationForm.userType === 'pastor' ?
                    'Your pastor registration has been submitted for review. We will contact you soon about serving opportunities.' :
                    'Your registration is complete! You can now access the "Ask a Pastor" feature to seek spiritual guidance and prayer support.'
                  }</p>
                  <p>God bless you on your faith journey!</p>
                </div>
              ) : (
                <form className="register-form" onSubmit={(e) => {
                  e.preventDefault();
                  console.log('Registration submitted:', registrationForm);

                  // If registering as pastor, add to registered pastors
                  if (registrationForm.userType === 'pastor') {
                    const newPastor = {
                      id: `pastor-${registrationForm.firstName.toLowerCase()}-${registrationForm.lastName.toLowerCase()}`,
                      firstName: registrationForm.firstName,
                      lastName: registrationForm.lastName,
                      email: registrationForm.email,
                      phone: registrationForm.phone,
                      ordinationStatus: registrationForm.ordinationStatus,
                      yearsExperience: registrationForm.yearsExperience,
                      specializations: registrationForm.specializations,
                      availability: registrationForm.availability,
                      title: registrationForm.ordinationStatus === 'ordained' ? 'Ordained Pastor' :
                           registrationForm.ordinationStatus === 'lay' ? 'Lay Minister' :
                           registrationForm.ordinationStatus === 'student' ? 'Ministry Student' : 'Ministry Worker'
                    };
                    setRegisteredPastors(prev => [...prev, newPastor]);
                  }

                  setRegistrationSubmitted(true);
                  setTimeout(() => {
                    setRegistrationSubmitted(false);
                    setRegistrationForm({
                      userType: '',
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      ordinationStatus: '',
                      yearsExperience: '',
                      specializations: [],
                      availability: '',
                      membershipStatus: '',
                      preferredCommunication: '',
                      interests: []
                    });
                  }, 3000);
                }}>

                  {/* User Type Selection */}
                  <div className="form-section">
                    <h3>I am registering as:</h3>
                    <div className="user-type-options">
                      <label className="user-type-option">
                        <input
                          type="radio"
                          name="userType"
                          value="pastor"
                          checked={registrationForm.userType === 'pastor'}
                          onChange={(e) => setRegistrationForm(prev => ({ ...prev, userType: e.target.value }))}
                          required
                        />
                        <span className="option-label">👨‍⚖️ Pastor - Register to serve and provide spiritual guidance</span>
                      </label>
                      <label className="user-type-option">
                        <input
                          type="radio"
                          name="userType"
                          value="member"
                          checked={registrationForm.userType === 'member'}
                          onChange={(e) => setRegistrationForm(prev => ({ ...prev, userType: e.target.value }))}
                        />
                        <span className="option-label">🙏 Congregation Member - Register to seek advice and prayer support</span>
                      </label>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="form-section">
                    <h3>Basic Information</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name *</label>
                        <input
                          type="text"
                          id="firstName"
                          value={registrationForm.firstName}
                          onChange={(e) => setRegistrationForm(prev => ({ ...prev, firstName: e.target.value }))}
                          required
                          placeholder="Your first name"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name *</label>
                        <input
                          type="text"
                          id="lastName"
                          value={registrationForm.lastName}
                          onChange={(e) => setRegistrationForm(prev => ({ ...prev, lastName: e.target.value }))}
                          required
                          placeholder="Your last name"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="regEmail">Email *</label>
                        <input
                          type="email"
                          id="regEmail"
                          value={registrationForm.email}
                          onChange={(e) => setRegistrationForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="regPhone">Phone *</label>
                        <input
                          type="tel"
                          id="regPhone"
                          value={registrationForm.phone}
                          onChange={(e) => setRegistrationForm(prev => ({ ...prev, phone: e.target.value }))}
                          required
                          placeholder="(123) 456-7890"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="password">Password *</label>
                        <input
                          type="password"
                          id="password"
                          value={registrationForm.password}
                          onChange={(e) => setRegistrationForm(prev => ({ ...prev, password: e.target.value }))}
                          required
                          placeholder="Create a secure password"
                          minLength="8"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password *</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          value={registrationForm.confirmPassword}
                          onChange={(e) => setRegistrationForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          required
                          placeholder="Confirm your password"
                          minLength="8"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pastor-Specific Fields */}
                  {registrationForm.userType === 'pastor' && (
                    <div className="form-section pastor-fields">
                      <h3>Pastoral Information</h3>
                      <div className="form-group">
                        <label htmlFor="ordinationStatus">Ordination Status *</label>
                        <select
                          id="ordinationStatus"
                          value={registrationForm.ordinationStatus}
                          onChange={(e) => setRegistrationForm(prev => ({ ...prev, ordinationStatus: e.target.value }))}
                          required
                        >
                          <option value="">Select ordination status</option>
                          <option value="ordained">Licensed/Ordained Pastor</option>
                          <option value="lay">Lay Minister/Elder</option>
                          <option value="student">Ministry Student</option>
                          <option value="other">Other Ministry Worker</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="yearsExperience">Years of Ministry Experience *</label>
                        <select
                          id="yearsExperience"
                          value={registrationForm.yearsExperience}
                          onChange={(e) => setRegistrationForm(prev => ({ ...prev, yearsExperience: e.target.value }))}
                          required
                        >
                          <option value="">Select experience level</option>
                          <option value="0-2">0-2 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="6-10">6-10 years</option>
                          <option value="11-20">11-20 years</option>
                          <option value="20+">20+ years</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Areas of Ministry Specialization</label>
                        <div className="specialization-options">
                          {[
                            'Biblical Teaching', 'Youth Ministry', 'Marriage Counseling',
                            'Prayer Ministry', 'Womens Ministry', 'Spiritual Direction',
                            'Community Outreach', 'Music/Worship', 'Leadership Development'
                          ].map(spec => (
                            <label key={spec} className="checkbox-option">
                              <input
                                type="checkbox"
                                checked={registrationForm.specializations.includes(spec)}
                                onChange={(e) => {
                                  const specs = [...registrationForm.specializations];
                                  if (e.target.checked) {
                                    specs.push(spec);
                                  } else {
                                    const index = specs.indexOf(spec);
                                    if (index > -1) specs.splice(index, 1);
                                  }
                                  setRegistrationForm(prev => ({ ...prev, specializations: specs }));
                                }}
                              />
                              <span className="checkbox-label">{spec}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="availability">Availability for Counseling *</label>
                        <select
                          id="availability"
                          value={registrationForm.availability}
                          onChange={(e) => setRegistrationForm(prev => ({ ...prev, availability: e.target.value }))}
                          required
                        >
                          <option value="">Select availability</option>
                          <option value="weekdays">Weekdays (9 AM - 5 PM)</option>
                          <option value="evenings">Evenings (5 PM - 9 PM)</option>
                          <option value="weekends">Weekends</option>
                          <option value="flexible">Flexible Schedule</option>
                          <option value="limited">Limited Availability</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Member-Specific Fields */}
                  {registrationForm.userType === 'member' && (
                    <div className="form-section member-fields">
                      <h3>Church Membership</h3>
                      <div className="form-group">
                        <label htmlFor="membershipStatus">Church Membership Status</label>
                        <select
                          id="membershipStatus"
                          value={registrationForm.membershipStatus}
                          onChange={(e) => setRegistrationForm(prev => ({ ...prev, membershipStatus: e.target.value }))}
                        >
                          <option value="">Select membership status</option>
                          <option value="member">Church Member</option>
                          <option value="regular">Regular Attendee</option>
                          <option value="visitor">First-time Visitor</option>
                          <option value="online">Online Community Member</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Preferred Method of Communication</label>
                        <div className="communication-options">
                          {['Email', 'Phone', 'Text Message', 'Church App', 'In-person'].map(comm => (
                            <label key={comm} className="radio-option">
                              <input
                                type="radio"
                                name="preferredCommunication"
                                value={comm}
                                checked={registrationForm.preferredCommunication === comm}
                                onChange={(e) => setRegistrationForm(prev => ({ ...prev, preferredCommunication: e.target.value }))}
                              />
                              <span className="radio-label">{comm}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Areas of Interest (Optional)</label>
                        <div className="interest-options">
                          {[
                            'Bible Study', 'Prayer Groups', 'Youth Ministry', 'Womens Ministry',
                            'Community Service', 'Music Ministry', 'Counseling Support', 'Spiritual Growth'
                          ].map(interest => (
                            <label key={interest} className="checkbox-option">
                              <input
                                type="checkbox"
                                checked={registrationForm.interests.includes(interest)}
                                onChange={(e) => {
                                  const interests = [...registrationForm.interests];
                                  if (e.target.checked) {
                                    interests.push(interest);
                                  } else {
                                    const index = interests.indexOf(interest);
                                    if (index > -1) interests.splice(index, 1);
                                  }
                                  setRegistrationForm(prev => ({ ...prev, interests: interests }));
                                }}
                              />
                              <span className="checkbox-label">{interest}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Terms and Privacy */}
                  <div className="form-section terms-section">
                    <label className="terms-option">
                      <input
                        type="checkbox"
                        required
                      />
                      <span className="terms-text" style={{whiteSpace: 'nowrap', fontSize: '0.85em'}}>
                        I agree to the church's <a href="#privacy" style={{color: '#667eea'}}>privacy policy</a> and <a href="#terms" style={{color: '#667eea'}}>terms of service</a>.
                        {registrationForm.userType === 'pastor' &&
                          ' I understand that my information will be used to connect me with church members seeking spiritual guidance.'
                        }
                        {registrationForm.userType === 'member' &&
                          ' I understand that this registration allows me to access spiritual guidance and prayer support services.'
                        }
                      </span>
                    </label>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="register-submit-btn">
                      {registrationForm.userType === 'pastor' ? '📝 Register as Pastor' : '🙏 Register as Member'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="registration-benefits">
              <h3>Benefits of Registration</h3>
              <div className="benefits-grid">
                <div className="benefit-card">
                  <div className="benefit-icon">🙏</div>
                  <h4>Spiritual Support</h4>
                  <p>Access to pastoral care, prayer support, and biblical guidance whenever you need it.</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">👥</div>
                  <h4>Community Connection</h4>
                  <p>Connect with fellow believers and become part of our church family.</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">📚</div>
                  <h4>Resources & Events</h4>
                  <p>Receive updates about church events, resources, and ministry opportunities.</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">🔒</div>
                  <h4>Privacy Protected</h4>
                  <p>Your personal information is secure and will only be used for church ministry purposes.</p>
                </div>
              </div>
            </div>
          </section>
        );
      case 'dashboard':
        return (
          <section className="dashboard">
            <div className="dashboard-header">
              <div className="dashboard-welcome">
                <h2>🖥️ Church Management Dashboard</h2>
                <p>Welcome back, {userRole === 'admin' ? 'Senior Pastor (Admin)' : 'Pastor'}! Manage your ministry and serve your congregation.</p>
              </div>
              <div className="dashboard-actions">
                <button
                  className="logout-btn"
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUserRole('');
                    setCurrentPage('home');
                    setDashboardTab('messages');
                  }}
                >
                  🚪 Logout
                </button>
              </div>
            </div>

            <div className="dashboard-tabs">
              <button
                className={`tab-btn ${dashboardTab === 'messages' ? 'active' : ''}`}
                onClick={() => setDashboardTab('messages')}
              >
                📬 Messages ({userRole === 'admin' ? '25' : '12'})
              </button>
              <button
                className={`tab-btn ${dashboardTab === 'announcements' ? 'active' : ''}`}
                onClick={() => setDashboardTab('announcements')}
              >
                📢 Announcements
              </button>
              <button
                className={`tab-btn ${dashboardTab === 'newsletters' ? 'active' : ''}`}
                onClick={() => setDashboardTab('newsletters')}
              >
                📄 Newsletters
              </button>
              <button
                className={`tab-btn ${dashboardTab === 'events' ? 'active' : ''}`}
                onClick={() => setDashboardTab('events')}
              >
                🎪 Events
              </button>
              <button
                className={`tab-btn ${dashboardTab === 'livestream' ? 'active' : ''}`}
                onClick={() => setDashboardTab('livestream')}
              >
                📺 Live Stream
              </button>
              {userRole === 'admin' && (
                <button
                  className={`tab-btn ${dashboardTab === 'admin' ? 'active' : ''}`}
                  onClick={() => setDashboardTab('admin')}
                >
                  ⚙️ Admin Panel
                </button>
              )}
            </div>

            <div className="dashboard-content">
              {dashboardTab === 'messages' && (
                <div className="messages-section">
                  <h3>Incoming Messages & Prayer Requests</h3>
                  <div className="messages-list">
                    <div className="message-card">
                      <div className="message-header">
                        <h4>🙏 Prayer Request - Anonymous</h4>
                        <span className="message-date">Today, 2:30 PM</span>
                      </div>
                      <p className="message-content">Please pray for my mother who is in the hospital. She's having surgery tomorrow and we're all worried.</p>
                      <div className="message-actions">
                        <button className="respond-btn">📝 Respond</button>
                        <button className="mark-read-btn">✅ Mark as Read</button>
                      </div>
                    </div>

                    <div className="message-card">
                      <div className="message-header">
                        <h4>📖 Biblical Guidance - Sarah Johnson</h4>
                        <span className="message-date">Yesterday, 4:15 PM</span>
                      </div>
                      <p className="message-content">I'm struggling with forgiveness in my marriage. Can you recommend some Bible verses and advice?</p>
                      <div className="message-actions">
                        <button className="respond-btn">📝 Respond</button>
                        <button className="mark-read-btn">✅ Mark as Read</button>
                      </div>
                    </div>

                    <div className="message-card">
                      <div className="message-header">
                        <h4>🙏 Prayer Request - Michael Davis</h4>
                        <span className="message-date">Dec 3, 9:45 AM</span>
                      </div>
                      <p className="message-content">Please pray for guidance as I make a big career decision. I need wisdom and peace.</p>
                      <div className="message-actions">
                        <button className="respond-btn">📝 Respond</button>
                        <button className="mark-read-btn">✅ Mark as Read</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {dashboardTab === 'announcements' && (
                <div className="announcements-section">
                  <h3>Manage Church Announcements</h3>
                  <div className="announcement-editor">
                    <form className="editor-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label>Title</label>
                          <input type="text" placeholder="Announcement title" />
                        </div>
                        <div className="form-group">
                          <label>Date</label>
                          <input type="date" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Content</label>
                        <textarea
                          rows="4"
                          placeholder="Write your announcement here..."
                          style={{width: '100%', resize: 'none'}}
                        ></textarea>
                      </div>
                      <div className="form-actions">
                        <button type="submit" className="save-btn">💾 Save Announcement</button>
                        <button type="button" className="preview-btn">👁️ Preview</button>
                      </div>
                    </form>
                  </div>

                  <div className="current-announcements">
                    <h4>Current Announcements</h4>
                    <div className="announcements-preview">
                      <div className="preview-card">
                        <h5>🎵 Special Music Sunday</h5>
                        <p>December 8, 2025</p>
                        <div className="preview-actions">
                          <button className="edit-btn">✏️ Edit</button>
                          <button className="delete-btn">🗑️ Delete</button>
                        </div>
                      </div>
                      <div className="preview-card">
                        <h5>🕊️ Community Prayer Meeting</h5>
                        <p>December 10, 2025</p>
                        <div className="preview-actions">
                          <button className="edit-btn">✏️ Edit</button>
                          <button className="delete-btn">🗑️ Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {dashboardTab === 'newsletters' && (
                <div className="newsletters-section">
                  <h3>Weekly Newsletter Editor</h3>
                  <div className="newsletter-editor">
                    <form className="editor-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label>Newsletter Title</label>
                          <input type="text" placeholder="Weekly Update - December 2025" />
                        </div>
                        <div className="form-group">
                          <label>Week Of</label>
                          <input type="date" />
                        </div>
                      </div>

                      <div className="newsletter-sections">
                        <div className="newsletter-section-editor">
                          <h5>Sunday Worship Schedule</h5>
                          <textarea
                            rows="3"
                            placeholder="List upcoming services and special events..."
                            style={{width: '100%', resize: 'none'}}
                          ></textarea>
                        </div>
                        <div className="newsletter-section-editor">
                          <h5>Upcoming Events</h5>
                          <textarea
                            rows="3"
                            placeholder="Highlight important upcoming events..."
                            style={{width: '100%', resize: 'none'}}
                          ></textarea>
                        </div>
                        <div className="newsletter-section-editor">
                          <h5>Scripture Reading</h5>
                          <textarea
                            rows="3"
                            placeholder="Weekly scripture focus and daily verse..."
                            style={{width: '100%', resize: 'none'}}
                          ></textarea>
                        </div>
                        <div className="newsletter-section-editor">
                          <h5>Prayer Requests</h5>
                          <textarea
                            rows="3"
                            placeholder="General prayer concerns and praises..."
                            style={{width: '100%', resize: 'none'}}
                          ></textarea>
                        </div>
                      </div>

                      <div className="form-actions">
                        <button type="submit" className="save-btn">💾 Save Newsletter</button>
                        <button type="button" className="download-btn">📄 Download PDF</button>
                        <button type="button" className="preview-btn">👁️ Preview</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {dashboardTab === 'events' && (
                <div className="events-section">
                  <h3>Manage Church Events</h3>
                  <div className="event-editor">
                    <form className="editor-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label>Event Title</label>
                          <input type="text" placeholder="Youth Camping Trip" />
                        </div>
                        <div className="form-group">
                          <label>Event Date</label>
                          <input type="date" />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Event Type</label>
                          <select>
                            <option>Youth Event</option>
                            <option>Family Event</option>
                            <option>Prayer Meeting</option>
                            <option>Community Service</option>
                            <option>Special Service</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Status</label>
                          <select>
                            <option>Upcoming</option>
                            <option>Ongoing</option>
                            <option>Completed</option>
                            <option>Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Event Description</label>
                        <textarea
                          rows="4"
                          placeholder="Detailed description of the event..."
                          style={{width: '100%', resize: 'none'}}
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label>Event Image</label>
                        <div className="image-upload">
                          <input type="file" accept="image/*" id="event-image" />
                          <label htmlFor="event-image" className="upload-btn">
                            📷 Choose Image
                          </label>
                          <span className="upload-note">Max file size: 5MB. Formats: JPG, PNG, GIF</span>
                        </div>
                      </div>

                      <div className="form-actions">
                        <button type="submit" className="save-btn">💾 Save Event</button>
                        <button type="button" className="preview-btn">👁️ Preview</button>
                      </div>
                    </form>
                  </div>

                  <div className="current-events">
                    <h4>Current Events</h4>
                    <div className="events-preview">
                      <div className="event-preview-card">
                        <div className="event-image-preview">🏔️</div>
                        <div className="event-details">
                          <h5>Youth Camping Trip to Drakensberg</h5>
                          <p>December 2025</p>
                          <p className="event-status">Completed</p>
                        </div>
                        <div className="event-actions">
                          <button className="edit-btn">✏️ Edit</button>
                          <button className="delete-btn">🗑️ Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {dashboardTab === 'livestream' && (
                <div className="livestream-section">
                  <h3>📺 Live Stream Management</h3>
                  <div className="livestream-container">
                    <div className="stream-preview">
                      <h4>Current Live Stream</h4>
                      <div className="youtube-embed-container">
                        {youtubeUrl && extractVideoId(youtubeUrl) ? (
                          <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${extractVideoId(youtubeUrl)}`}
                            title="Pentecostal Holiness Church Live Stream"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <div className="youtube-placeholder-admin">
                            <div className="stream-status-admin">
                              <div className="status-indicator-admin offline"></div>
                              <span>No Live Stream Active</span>
                            </div>
                            <div className="embed-instructions">
                              <h5>📺 Set Up Live Stream</h5>
                              <p>Paste your YouTube live stream URL below to embed it in the church website:</p>
                              <div className="form-group">
                                <label htmlFor="youtube-url">YouTube Live Stream URL</label>
                                <input
                                  type="url"
                                  id="youtube-url"
                                  value={youtubeUrl}
                                  onChange={(e) => setYoutubeUrl(e.target.value)}
                                  placeholder="https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID"
                                  className="youtube-url-input"
                                />
                              </div>
                              <p className="url-help">
                                <small>💡 Get this URL from your YouTube Live Dashboard when your stream is active</small>
                              </p>
                              {youtubeUrl && !extractVideoId(youtubeUrl) && (
                                <p className="error-message">
                                  <small>❌ Invalid YouTube URL. Please check and try again.</small>
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="stream-controls">
                      <h4>Stream Settings</h4>
                      <div className="control-section">
                        <h5>Stream Status</h5>
                        <div className="status-controls">
                          <button className="status-btn offline">🔴 Go Offline</button>
                          <button className="status-btn live">🟢 Go Live</button>
                          <button className="status-btn test">🟡 Test Stream</button>
                        </div>
                      </div>

                      <div className="control-section">
                        <h5>Service Information</h5>
                        <form className="service-info-form">
                          <div className="form-group">
                            <label>Service Title</label>
                            <input type="text" placeholder="Sunday Worship Service" />
                          </div>
                          <div className="form-group">
                            <label>Speaker</label>
                            <select>
                              <option>Guest Speaker</option>
                              {registeredPastors.map(pastor => (
                                <option key={pastor.id}>
                                  Pastor {pastor.firstName} {pastor.lastName}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Scripture Focus</label>
                            <input type="text" placeholder="Hebrews 11:1" />
                          </div>
                          <div className="form-group">
                            <label>Service Notes</label>
                            <textarea
                              rows="3"
                              placeholder="Brief description of today's service..."
                              style={{width: '100%', resize: 'none'}}
                            ></textarea>
                          </div>
                          <button type="submit" className="update-btn">💾 Update Service Info</button>
                        </form>
                      </div>

                      <div className="control-section">
                        <h5>Technical Settings</h5>
                        <div className="tech-controls">
                          <div className="control-item">
                            <label>
                              <input type="checkbox" defaultChecked />
                              Enable Chat
                            </label>
                          </div>
                          <div className="control-item">
                            <label>
                              <input type="checkbox" />
                              Record Service
                            </label>
                          </div>
                          <div className="control-item">
                            <label>
                              <input type="checkbox" defaultChecked />
                              Auto-save to YouTube
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="control-section">
                        <h5>Quick Actions</h5>
                        <div className="quick-actions-grid">
                          <button className="quick-action-btn">📊 View Analytics</button>
                          <button className="quick-action-btn">💬 Moderate Chat</button>
                          <button className="quick-action-btn">📝 Edit Service Notes</button>
                          <button className="quick-action-btn">🔔 Send Notifications</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="stream-history">
                    <h4>Recent Streams</h4>
                    <div className="stream-history-list">
                      <div className="history-item">
                        <div className="history-info">
                          <h5>Sunday Worship Service - "Walking in Faith"</h5>
                          <p>December 1, 2025 | 1,247 views | 45 minutes</p>
                        </div>
                        <div className="history-actions">
                          <button className="view-btn">👁️ View</button>
                          <button className="download-btn">📥 Download</button>
                        </div>
                      </div>
                      <div className="history-item">
                        <div className="history-info">
                          <h5>Wednesday Prayer Meeting</h5>
                          <p>November 27, 2025 | 523 views | 30 minutes</p>
                        </div>
                        <div className="history-actions">
                          <button className="view-btn">👁️ View</button>
                          <button className="download-btn">📥 Download</button>
                        </div>
                      </div>
                      <div className="history-item">
                        <div className="history-info">
                          <h5>Youth Bible Study</h5>
                          <p>November 21, 2025 | 387 views | 25 minutes</p>
                        </div>
                        <div className="history-actions">
                          <button className="view-btn">👁️ View</button>
                          <button className="download-btn">📥 Download</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {dashboardTab === 'admin' && userRole === 'admin' && (
                <div className="admin-section">
                  <h3>⚙️ Administration Panel</h3>
                  <div className="admin-stats">
                    <div className="stat-card">
                      <h4>👥 Total Members</h4>
                      <div className="stat-number">247</div>
                    </div>
                    <div className="stat-card">
                      <h4>👨‍⚖️ Active Pastors</h4>
                      <div className="stat-number">4</div>
                    </div>
                    <div className="stat-card">
                      <h4>📬 Messages This Week</h4>
                      <div className="stat-number">25</div>
                    </div>
                    <div className="stat-card">
                      <h4>🎪 Upcoming Events</h4>
                      <div className="stat-number">3</div>
                    </div>
                  </div>

                  <div className="admin-tools">
                    <h4>User Management</h4>
                    <div className="user-management">
                      <div className="user-list">
                        <h5>Congregation Members</h5>
                        <div className="user-item">
                          <span>Sarah Johnson</span>
                          <span className="user-status">Active</span>
                          <button className="delete-user-btn">🗑️ Remove</button>
                        </div>
                        <div className="user-item">
                          <span>Michael Davis</span>
                          <span className="user-status">Active</span>
                          <button className="delete-user-btn">🗑️ Remove</button>
                        </div>
                        <div className="user-item">
                          <span>Jessica Brown</span>
                          <span className="user-status">Inactive</span>
                          <button className="delete-user-btn">🗑️ Remove</button>
                        </div>
                      </div>

                      <div className="user-list">
                        <h5>Pastor Accounts</h5>
                        <div className="user-item">
                          <span>Pastor Mary Johnson</span>
                          <span className="user-status">Active</span>
                          <button className="delete-user-btn">🗑️ Remove</button>
                        </div>
                        <div className="user-item">
                          <span>Pastor David Williams</span>
                          <span className="user-status">Active</span>
                          <button className="delete-user-btn">🗑️ Remove</button>
                        </div>
                        <div className="user-item">
                          <span>Pastor Sarah Brown</span>
                          <span className="user-status">Active</span>
                          <button className="delete-user-btn">🗑️ Remove</button>
                        </div>
                      </div>
                    </div>

                    <div className="admin-actions">
                      <h5>System Administration</h5>
                      <div className="admin-buttons">
                        <button className="admin-btn">📊 Generate Reports</button>
                        <button className="admin-btn">📧 Send Bulk Email</button>
                        <button className="admin-btn">💾 Backup Data</button>
                        <button className="admin-btn">⚙️ System Settings</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      case 'streaming':
        return (
          <section className="streaming">
            <div className="streaming-header">
              <h2>📺 Live Streaming</h2>
              <p>Join us for worship and fellowship from anywhere in the world. Experience God's presence through our live services.</p>
            </div>

            <div className="live-stream-container">
              <div className="stream-main">
                <div className="stream-player">
                  <div className="youtube-placeholder">
                    <div className="stream-status">
                      {youtubeUrl && extractVideoId(youtubeUrl) ? (
                        <>
                          <div className="status-indicator live"></div>
                          <span>LIVE</span>
                        </>
                      ) : (
                        <>
                          <div className="status-indicator offline"></div>
                          <span>OFFLINE</span>
                        </>
                      )}
                    </div>
                    <div className="stream-placeholder">
                      <div className="placeholder-icon">📺</div>
                      <h3>Live Service Stream</h3>
                      <p>Next Service: Sunday Worship - 10:00 AM</p>
                      <div className="service-countdown">
                        <div className="countdown-item">
                          <span className="countdown-number">2</span>
                          <span className="countdown-label">Days</span>
                        </div>
                        <div className="countdown-item">
                          <span className="countdown-number">14</span>
                          <span className="countdown-label">Hours</span>
                        </div>
                        <div className="countdown-item">
                          <span className="countdown-number">32</span>
                          <span className="countdown-label">Minutes</span>
                        </div>
                      </div>
                      <button className="reminder-btn">🔔 Set Reminder</button>
                    </div>
                  </div>
                  {/* Replace this placeholder with actual YouTube embed when live:
                  <iframe
                    width="100%"
                    height="400"
                    src="https://www.youtube.com/embed/YOUR_LIVE_STREAM_ID"
                    title="Pentecostal Holiness Church Live Stream"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  */}
                </div>

                <div className="stream-info">
                  <div className="current-service">
                    <h3>📅 Upcoming Services</h3>
                    <div className="service-schedule">
                      <div className="service-item live-service">
                        <div className="service-details">
                          <h4>Sunday Worship Service</h4>
                          <p>Every Sunday at 10:00 AM</p>
                          <p>Live stream begins at 9:45 AM</p>
                        </div>
                        <div className="service-actions">
                          <button className="join-service-btn">🙏 Join Live</button>
                        </div>
                      </div>

                      <div className="service-item">
                        <div className="service-details">
                          <h4>Wednesday Prayer Meeting</h4>
                          <p>Every Wednesday at 7:00 PM</p>
                          <p>Live stream available</p>
                        </div>
                        <div className="service-actions">
                          <button className="join-service-btn">🙏 Join Live</button>
                        </div>
                      </div>

                      <div className="service-item">
                        <div className="service-details">
                          <h4>Bible Study</h4>
                          <p>Every Thursday at 6:00 PM</p>
                          <p>Interactive online sessions</p>
                        </div>
                        <div className="service-actions">
                          <button className="join-service-btn">🙏 Join Live</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="stream-sidebar">
                <div className="service-notes">
                  <h3>📝 Today's Service Notes</h3>
                  <div className="notes-content">
                    <h4>Sermon: "Walking in Faith"</h4>
                    <p><strong>Scripture:</strong> Hebrews 11:1 - "Now faith is confidence in what we hope for and assurance about what we do not see."</p>
                    <p><strong>Speaker:</strong> Pastor John Smith</p>
                    <p><strong>Special Music:</strong> Choir performance of "Amazing Grace"</p>

                    <div className="service-outline">
                      <h5>Service Outline:</h5>
                      <ul>
                        <li>Opening Worship - 10:00 AM</li>
                        <li>Welcome & Announcements - 10:15 AM</li>
                        <li>Children's Message - 10:20 AM</li>
                        <li>Special Music - 10:30 AM</li>
                        <li>Sermon - 10:45 AM</li>
                        <li>Closing Worship & Benediction - 11:30 AM</li>
                      </ul>
                    </div>
                  </div>
                </div>



                <div className="stream-resources">
                  <h3>📚 Service Resources</h3>
                  <div className="resource-links">
                    <a href="#bulletin" className="resource-link">📄 Service Bulletin</a>
                    <a href="#lyrics" className="resource-link">🎵 Song Lyrics</a>
                    <a href="#giving" className="resource-link">💝 Online Giving</a>
                    <a href="#connect" className="resource-link">🤝 Connect Card</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="past-services">
              <h3>🎥 Recent Services</h3>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-thumbnail">⛪</div>
                  <div className="service-info">
                    <h4>"The Power of Prayer" - Pastor Mary Johnson</h4>
                    <p>December 1, 2025</p>
                    <button className="watch-btn">▶️ Watch Now</button>
                  </div>
                </div>

                <div className="service-card">
                  <div className="service-thumbnail">🙏</div>
                  <div className="service-info">
                    <h4>"God's Grace in Our Lives" - Pastor John Smith</h4>
                    <p>November 24, 2025</p>
                    <button className="watch-btn">▶️ Watch Now</button>
                  </div>
                </div>

                <div className="service-card">
                  <div className="service-thumbnail">📖</div>
                  <div className="service-info">
                    <h4>"Walking by Faith" - Pastor David Williams</h4>
                    <p>November 17, 2025</p>
                    <button className="watch-btn">▶️ Watch Now</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="streaming-info">
              <div className="info-section">
                <h3>🌐 Streaming Information</h3>
                <div className="info-grid">
                  <div className="info-card">
                    <h4>📱 How to Watch</h4>
                    <p>Services are streamed live on YouTube. Click the "Join Live" button when service begins, or visit our YouTube channel directly.</p>
                  </div>
                  <div className="info-card">
                    <h4>🎚️ Audio/Video Quality</h4>
                    <p>We strive for the best streaming quality possible. If you experience issues, try refreshing the page or switching devices.</p>
                  </div>
                  <div className="info-card">
                    <h4>🙏 Participation</h4>
                    <p>Join us in worship from home! Participate in prayer requests, give online, and connect with our community.</p>
                  </div>
                  <div className="info-card">
                    <h4>💝 Support the Ministry</h4>
                    <p>Your online giving helps us continue streaming services and supporting our church community.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case 'user-dashboard':
        return (
          <section className="user-dashboard">
            <div className="dashboard-header">
              <div className="dashboard-welcome">
                <h2>🙏 My Spiritual Journey</h2>
                <p>Welcome back, Church Member! Connect with your pastors and grow in faith.</p>
              </div>
              <div className="dashboard-actions">
                <button
                  className="logout-btn"
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUserRole('');
                    setCurrentPage('home');
                  }}
                >
                  🚪 Logout
                </button>
              </div>
            </div>

            <div className="dashboard-tabs">
              <button
                className={`tab-btn ${dashboardTab === 'messages' ? 'active' : ''}`}
                onClick={() => setDashboardTab('messages')}
              >
                📬 My Messages (3)
              </button>
              <button
                className={`tab-btn ${dashboardTab === 'send' ? 'active' : ''}`}
                onClick={() => setDashboardTab('send')}
              >
                ✉️ Send Message
              </button>
            </div>

            <div className="dashboard-content">
              {dashboardTab === 'messages' && (
                <div className="user-messages-section">
                  <h3>My Messages & Responses</h3>
                  <div className="messages-list">
                    <div className="message-card response">
                      <div className="message-header">
                        <h4>🙏 Response from Pastor Mary Johnson</h4>
                        <span className="message-date">Today, 10:30 AM</span>
                      </div>
                      <p className="message-content">Dear Sarah, Thank you for sharing your prayer request. I have lifted your mother up in prayer and asked our prayer team to join me. Please know that God is with you during this time. If you need someone to talk to or visit, please don't hesitate to reach out. May God's peace surround you. - Pastor Mary</p>
                      <div className="message-actions">
                        <button className="respond-btn">📝 Reply</button>
                        <button className="thank-btn">🙏 Thank You</button>
                      </div>
                    </div>

                    <div className="message-card sent">
                      <div className="message-header">
                        <h4>📖 Biblical Guidance Request - Sent</h4>
                        <span className="message-date">Yesterday, 2:15 PM</span>
                      </div>
                      <p className="message-content">I'm struggling with forgiveness in my marriage. Can you recommend some Bible verses and advice?</p>
                      <div className="message-status">
                        <span className="status-badge">✅ Read by Pastor</span>
                        <span className="response-time">Response expected within 24-48 hours</span>
                      </div>
                    </div>

                    <div className="message-card sent">
                      <div className="message-header">
                        <h4>🙏 Prayer Request - Sent</h4>
                        <span className="message-date">Dec 2, 9:00 AM</span>
                      </div>
                      <p className="message-content">Please pray for guidance as I make a big career decision. I need wisdom and peace.</p>
                      <div className="message-status">
                        <span className="status-badge">✅ Read by Pastor</span>
                        <span className="response-time">Response expected within 24-48 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {dashboardTab === 'send' && (
                <div className="send-message-section">
                  <h3>Send a Message to Your Pastor</h3>
                  <div className="message-form-container">
                    <form className="message-form" onSubmit={(e) => {
                      e.preventDefault();
                      // Simulate sending message
                      alert('Your message has been sent to your pastor! You will receive a response within 24-48 hours.');
                      setDashboardTab('messages');
                    }}>

                      <div className="form-section">
                        <h4>Choose Your Pastor</h4>
                        <select required className="pastor-select">
                          <option value="">Select a Pastor</option>
                          {registeredPastors.map(pastor => (
                            <option key={pastor.id} value={pastor.id}>
                              Pastor {pastor.firstName} {pastor.lastName} - {pastor.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-section">
                        <h4>Type of Message</h4>
                        <div className="message-type-options">
                          <label className="message-type-option">
                            <input
                              type="radio"
                              name="messageType"
                              value="advice"
                              defaultChecked
                              required
                            />
                            <span className="option-label">📖 Biblical Advice & Guidance</span>
                          </label>
                          <label className="message-type-option">
                            <input
                              type="radio"
                              name="messageType"
                              value="prayer"
                              required
                            />
                            <span className="option-label">🙏 Prayer Request</span>
                          </label>
                          <label className="message-type-option">
                            <input
                              type="radio"
                              name="messageType"
                              value="general"
                              required
                            />
                            <span className="option-label">💬 General Message</span>
                          </label>
                        </div>
                      </div>

                      <div className="form-section">
                        <label className="privacy-option">
                          <input type="checkbox" />
                          <span className="privacy-text">
                            🔒 Send Anonymously
                            <small>Your pastor will not see your name or contact information</small>
                          </span>
                        </label>
                      </div>

                      <div className="form-section">
                        <label htmlFor="userMessage">Your Message *</label>
                        <textarea
                          id="userMessage"
                          required
                          placeholder="Share what's on your heart. Your pastor will respond with care and confidentiality."
                          rows="6"
                          style={{width: '100%', resize: 'none'}}
                        />
                      </div>

                      <div className="form-actions">
                        <button type="submit" className="send-message-btn">
                          📤 Send to Pastor
                        </button>
                        <p className="response-note">
                          <small>✨ Your pastor typically responds within 24-48 hours. For urgent matters, please call the church office.</small>
                        </p>
                      </div>
                    </form>
                  </div>

                  <div className="quick-actions">
                    <h4>Quick Actions</h4>
                    <div className="action-buttons">
                      <button className="quick-btn" onClick={() => navigateTo('ask-pastor')}>
                        🙏 Ask a Pastor (Public)
                      </button>
                      <button className="quick-btn" onClick={() => navigateTo('announcements')}>
                        📢 View Announcements
                      </button>
                      <button className="quick-btn" onClick={() => navigateTo('events')}>
                        🎪 Upcoming Events
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="spiritual-resources">
              <h3>Your Spiritual Resources</h3>
              <div className="resources-grid">
                <div className="resource-card">
                  <div className="resource-icon">📖</div>
                  <h4>Daily Scripture</h4>
                  <p>{dailyVerse}</p>
                </div>
                <div className="resource-card">
                  <div className="resource-icon">🙏</div>
                  <h4>Prayer Support</h4>
                  <p>24/7 prayer support available. Your pastors are here for you.</p>
                </div>
                <div className="resource-card">
                  <div className="resource-icon">👥</div>
                  <h4>Church Community</h4>
                  <p>Connect with fellow believers and grow together in faith.</p>
                </div>
                <div className="resource-card">
                  <div className="resource-icon">🎵</div>
                  <h4>Worship Services</h4>
                  <p>Sunday Worship: 10 AM | Wednesday Prayer: 7 PM</p>
                </div>
              </div>
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
            <li><a href="#streaming" onClick={() => navigateTo('streaming')}>Stream</a></li>
            <li><a href="#ask-pastor" onClick={() => navigateTo('ask-pastor')}>Ask a Pastor</a></li>
            <li><a href="#register" onClick={() => navigateTo('register')}>Register</a></li>
            <li><a href="#login" onClick={() => navigateTo('login')}>Login</a></li>
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
