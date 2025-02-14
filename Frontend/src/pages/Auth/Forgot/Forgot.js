import React from 'react';

const Forget = () => {
  const submitForm = (e) => {
    e.preventDefault();
    const message = document.getElementById('message');
    if (message) {
      message.textContent = 'Recovery email sent!';
      message.classList.remove('d-none');
      setTimeout(() => {
        message.textContent = '';
        message.classList.add('d-none');
      }, 2000);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '2rem' }}>
      <h1>Forget Password</h1>
      <form onSubmit={submitForm}>
        <label htmlFor="email">Email</label>
        <input type="email" className="form-control" id="email" placeholder="Enter your email" />
        
        <button className="btn" style={{ marginTop: '1rem' }}>Submit</button>
      </form>
      <div id="message" className="d-none alert alert-success" style={{marginTop:'1rem'}} />
    </div>
  );
};

export default Forget;
