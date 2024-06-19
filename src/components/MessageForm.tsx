import React, { useState, FormEvent, ChangeEvent } from 'react';
import { sendMessage, isTyping } from 'react-chat-engine';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import '../App.css';

interface MessageFormProps {
  chatId: number; 
  creds: any;
}

const MessageForm: React.FC<MessageFormProps> = (props) => {
  const [value, setValue] = useState<string>('');
  const { chatId, creds } = props;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const text = value.trim();
    if (text.length > 0) sendMessage(creds, chatId, { text });
    setValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    isTyping(props, chatId);
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      sendMessage(creds, chatId, { files: event.target.files, text: '' });
    }
  };

  const div = document.createElement('div');
  div.className = 'divsignout';
  const buttonsignout = document.createElement('button');
  buttonsignout.className = 'logoutbuttin';
  buttonsignout.innerText = 'Log Out';
  div.append(buttonsignout);
  div.addEventListener('click', function () {
    localStorage.setItem('chatengineusername', "");
    localStorage.setItem('chatenginepassword', "");
    window.location.reload();
  });

  document.addEventListener('load', function () {
    const chatTitleContainer = document.querySelector(".chat-title-container");
    if (chatTitleContainer) {
      chatTitleContainer.append(div);
      alert("It's loaded!");
    }
  });

  return (
    <>
      <form onSubmit={handleSubmit} className='message-form'>
        <input
          type="text"
          className='message-input'
          placeholder='Send a message...'
          value={value}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

        <label htmlFor="upload-button">
          <span className='image-button'>
            <PictureOutlined className='picture-icon' />
          </span>
        </label>

        <input
          type="file"
          multiple={false}
          id='upload-button'
          style={{ display: 'none' }}
          onChange={handleUpload}
        />
        <button type='submit' className='send-button'>
          <SendOutlined className='send-icon' />
        </button>
      </form>
    </>
  );
};

export default MessageForm;
