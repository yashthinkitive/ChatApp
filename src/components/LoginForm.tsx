import React, { useState, FormEvent } from 'react';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const authObject = {
      'Project-ID': 'c5b0d7f7-4eeb-42d6-87e0-0b6d5380d422',
      'User-Name': username,
      'User-Secret': password
    };

    try {
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });
      localStorage.setItem('chatengineusername', username);
      localStorage.setItem('chatenginepassword', password);

      window.location.reload();
    } catch (error) {
      setError('Oops, incorrect Details');
    }
  };

  return (
    <div className='wrapper'>
      <div className="form">
        <h1 className="title" style={{ fontSize: 'large' }}>Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='input'
            placeholder='Username'
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input'
            placeholder='Password'
            required
          />
          <div style={{ textAlign: 'center' }}>
            <button type='submit' className='button'>
              <span>Start Chatting</span>
            </button>
          </div>
          <h2 className='error'>{error}</h2>
        </form>
      </div>
    </div>
  );
  
};

export default LoginForm;
