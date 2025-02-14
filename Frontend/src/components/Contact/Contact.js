import React from 'react';

function submitForm(e) {
  e.preventDefault();
  // Fake success message
  const responseMessage = document.getElementById('response-message');
  responseMessage.textContent = 'Response Sent Successfully!';
  responseMessage.classList.remove('d-none');
  setTimeout(() => {
    responseMessage.textContent = '';
    responseMessage.classList.add('d-none');
  }, 3000);
}

const Contact = () => {
  return (
    <div className="container" id="contact">
      <h1 className="text-center mb-2">Contact Us</h1>
      <form onSubmit={submitForm}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" placeholder="Enter your name" />
        
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="Enter your email" />
        
        <label htmlFor="message">Message:</label>
        <textarea id="message" rows="4" placeholder="Your message here..."></textarea>

        <input type="submit" value="Submit" style={{marginTop:'0.5rem'}} />
      </form>
      <div
        id="response-message"
        className="alert alert-success d-none mt-2"
        style={{ marginTop: '1rem' }}
      />
    </div>
  );
};

export default Contact;
