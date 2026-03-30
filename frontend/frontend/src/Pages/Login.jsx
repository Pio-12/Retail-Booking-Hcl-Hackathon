import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Fields must not be empty');
      return;
    }
    setError('');
    
    try {
      // Use URLSearchParams as the backend expects @RequestParam
      const params = new URLSearchParams();
      params.append('email', email);
      params.append('password', password);

      const response = await fetch(`http://localhost:8080/user-service/auth/login?${params.toString()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });

      const data = await response.text();

      if (response.ok && !data.toLowerCase().includes("fail") && !data.toLowerCase().includes("error")) {
        // Login success
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', data); // assuming data is userId
        // Extract a display name from email
        localStorage.setItem('loggedInUser', JSON.stringify({ name: email.split('@')[0], email }));
        alert(data || 'Login Successful!');
        navigate('/menu');
        window.location.reload(); 
      } else {
        // Login failed
        setError(data || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Could not connect to the server. Please ensure backend is running.');
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-center">Login to QuickBite</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
      </form>
      <div className="text-center mt-2">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}

export default Login;
