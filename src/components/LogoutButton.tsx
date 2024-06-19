
import React from 'react';

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.setItem('chatengineusername', '');
    localStorage.setItem('chatenginepassword', '');
    onLogout(); 
  };

  return (
    <div className='divsignout'>
      <button className='logoutbutton' onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default LogoutButton;
