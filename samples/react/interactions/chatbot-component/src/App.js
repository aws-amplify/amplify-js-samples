import React, { useEffect } from 'react';
import './App.css';

import logo from './amplify-logo.svg';
import { AmplifyChatbot } from '@aws-amplify/ui-react';
import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

function App() {
  const handleChatComplete = event => {
    const { data, err } = event.detail;
    if (data) alert('Chat fulfilled!\n' + JSON.stringify(data));
    if (err) alert('Chat failed:\n' + err);
  };

  useEffect(() => {
    const chatbotElement = document.querySelector('amplify-chatbot');
    chatbotElement.addEventListener('chatCompleted', handleChatComplete);
    return function cleanup() {
      chatbotElement.removeEventListener('chatCompleted', handleChatComplete);
    };
  }, []);

  return (
    <div className="content">
      <AmplifyChatbot
        botTitle="Chatbot Lex"
        botName="BookTrip_dev"
        welcomeMessage="Hello, how can I help you?"
        voiceEnabled={true}
      />
    </div>
  );
}

export default App;
