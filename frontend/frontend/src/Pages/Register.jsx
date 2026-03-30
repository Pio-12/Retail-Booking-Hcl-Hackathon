import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const response = await API.post('user-service/auth/register', {
        name,
        email,
        password,
        role: 'USER'
      });

      if (response.status === 201 || response.status === 200) {
        setError('');
        setSuccess('Registration successful! Redirecting to login...');

        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setError(`Registration failed: ${response.data?.message || 'Unknown error'}`);
      }
    } catch (err) {
      const message = err?.response?.data?.message || err.message;
      if (err?.response?.status === 409) {
        setError('Registration failed: email is already registered.');
      } else {
        setError(`Registration failed: ${message || 'Could not connect to server'}`);
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-center">Create an Account</h2>
      {error && <div className="error-message" style={{color: 'red'}}>{error}</div>}
      {success && <div className="success-message" style={{color: 'green', marginBottom: '1rem'}}>{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </div>
        <button type="submit" className="btn" style={{ width: '100%' }}>Register</button>
      </form>
      <div className="text-center mt-2">
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
}

export default Register;
