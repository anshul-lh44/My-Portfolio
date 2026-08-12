import React, { useState } from 'react';
import { FaPaperPlane, FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import NetworkCanvas from '../Hero/NetworkCanvas';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setStatusMessage('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Portfolio Contact Form'
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setStatusMessage("Thank you! Your message has been sent successfully. I'll get back to you soon!");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(data.message || 'Something went wrong. Please check your Access Key and try again.');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('Network error. Please check your internet connection and try again.');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <NetworkCanvas />
      
      <div className="container contact-container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="contact-desc">
          I am open to opportunities. If you have a project in mind, or just want to connect, feel free to reach out. I am available!
        </p>
        
        {statusMessage && (
          <div className={`status-message ${status}`}>
            {status === 'success' && <FaCheckCircle className="status-icon" />}
            {status === 'error' && <FaExclamationTriangle className="status-icon" />}
            <span>{statusMessage}</span>
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              name="name"
              placeholder="Name" 
              required 
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              disabled={status === 'sending'}
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              required 
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              disabled={status === 'sending'}
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              name="subject"
              placeholder="Subject" 
              required 
              className="form-input"
              value={formData.subject}
              onChange={handleChange}
              disabled={status === 'sending'}
            />
          </div>
          <div className="form-group">
            <textarea 
              name="message"
              placeholder="Message" 
              rows="5" 
              required 
              className="form-textarea"
              value={formData.message}
              onChange={handleChange}
              disabled={status === 'sending'}
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary submit-btn"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? (
              <>
                <FaSpinner className="btn-icon spin" /> Sending...
              </>
            ) : (
              <>
                <FaPaperPlane className="btn-icon" /> Say Hello
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
