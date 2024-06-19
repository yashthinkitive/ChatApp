// ChatFeed.tsx
import React from 'react';
import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import LogoutButton from './LogoutButton'; // Import the LogoutButton component

interface Person {
  last_read: string;
  person: {
    username: string;
    avatar: string;
  };
}

interface Message {
  id: string;
  sender: {
    username: string;
    avatar: string;
  };
  attachments?: { file: string }[];
  text?: string;
}

interface Chat {
  title: string;
  people: Person[];
}

export interface ChatFeedProps {
  chats: { [key: string]: Chat };
  activeChat: string;
  userName: string;
  messages: { [key: string]: Message };
  creds: any; 
}

const ChatFeed: React.FC<ChatFeedProps> = (props) => {
  const { chats, activeChat, userName, messages } = props;
  const chat = chats && chats[activeChat];


  const handleLogout = () => {
    localStorage.setItem('chatengineusername', '');
    localStorage.setItem('chatenginepassword', '');
    window.location.reload(); 
  };

  const renderReadReceipts = (message: Message, isMyMessage: boolean) => {
    return chat.people.map((person, index) =>
      person.last_read === message.id && (
        <div
          key={`read${index}`}
          className='read-receipt'
          style={{
            float: isMyMessage ? 'right' : 'left',
            backgroundImage: `url(${person.person.avatar})`
          }}
        />
      )
    );
  };

  const renderMessages = () => {
    const keys = Object.keys(messages);
    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? '' : keys[index - 1]; 
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`mesg_${index}`} style={{ width: '100%' }}>
          <div className='message-block'>
            {
              isMyMessage
                ? <MyMessage message={message} />
                : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />
            }
          </div>
          <div className='read-receipts' style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '67px' }}>
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  if (!chat) return <div>Loading..</div>;

  return (
    <div className='chat-feed'>
      <div className="chat-title-container">
        <div className="chat-title">
          {chat.title}
          <div className='chat-subtitle'>
            {chat.people.map((person) => `${person.person.username}`).join(', ')}
          </div>
        </div>
      </div>
      {renderMessages()}
      <div style={{ height: '100px' }} />
      <div className="message-form-container">
        <MessageForm chatId={parseInt(activeChat)} {...props} />
      </div>
      <LogoutButton onLogout={handleLogout} /> 
    </div>
  );
};

export default ChatFeed;



// import React from 'react';
// import MessageForm from './MessageForm';
// import MyMessage from './MyMessage';
// import TheirMessage from './TheirMessage';

// interface Person {
//   last_read: string;
//   person: {
//     username: string;
//     avatar: string;
//   };
// }

// interface Message {
//   id: string;
//   sender: {
//     username: string;
//     avatar: string;
//   };
//   attachments?: { file: string }[];
//   text?: string;
// }

// interface Chat {
//   title: string;
//   people: Person[];
// }

// export interface ChatFeedProps {
//   chats: { [key: string]: Chat };
//   activeChat: string;
//   userName: string;
//   messages: { [key: string]: Message };
//   creds: any; 
// }


// const ChatFeed: React.FC<ChatFeedProps> = (props) => {
//   const { chats, activeChat, userName, messages } = props;
//   const chat = chats && chats[activeChat];

//   const renderReadReceipts = (message: Message, isMyMessage: boolean) => {
//     return chat.people.map((person, index) =>
//       person.last_read === message.id && (
//         <div
//           key={`read${index}`}
//           className='read-receipt'
//           style={{
//             float: isMyMessage ? 'right' : 'left',
//             backgroundImage: `url(${person.person.avatar})`
//           }}
//         />
//       )
//     );
//   };

//   const renderMessages = () => {
//     const keys = Object.keys(messages);
//     return keys.map((key, index) => {
//       const message = messages[key];
//       const lastMessageKey = index === 0 ? '' : keys[index - 1]; 
//       const isMyMessage = userName === message.sender.username;

//       return (
//         <div key={`mesg_${index}`} style={{ width: '100%' }}>
//           <div className='message-block'>
//             {
//               isMyMessage
//                 ? <MyMessage message={message} />
//                 : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />
//             }
//           </div>
//           <div className='read-receipts' style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '67px' }}>
//             {renderReadReceipts(message, isMyMessage)}
//           </div>
//         </div>
//       );
//     });
//   };

//   if (!chat) return <div>Loading..</div>;

//   return (
//     <div className='chat-feed'>
//       <div className="chat-title-container">
//         <div className="chat-title">
//           {chat.title}
//           <div className='chat-subtitle'>
//             {chat.people.map((person) => `${person.person.username}`).join(', ')}
//           </div>
//         </div>
//       </div>
//       {renderMessages()}
//       <div style={{ height: '100px' }} />
//       <div className="message-form-container">
//         <MessageForm chatId={parseInt(activeChat)} {...props} />
//       </div>
//     </div>
//   );
// };

// export default ChatFeed;
