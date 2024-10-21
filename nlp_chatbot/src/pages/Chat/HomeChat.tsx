import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { BackgroundLines } from '@/components/ui/background-lines';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

function HomeChat() {
  const placeholders = [
    "What can I help you with today?",
     "How's your day going?",
    "What would you like to chat",
    "How are you today?", // New placeholder added
    "How can I assist you today?",
  ];

  const [message, setMessage] = useState<string>(''); // Input message
  const [messages, setMessages] = useState<{ text: string, type: string }[]>([]); // Array of messages
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Reference for the end of the messages

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value); // Update the input message
  };

   // Save messages to localStorage whenever they change
   useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

 
  const onSubmit = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    setMessages([...messages, { text: message, type: 'user' }]); // Add user's message to chat

    try {
      const res = await axios.post('http://localhost:5000/chat', { message });
      setMessages(prevMessages => [...prevMessages, { text: res.data.response, type: 'bot' }]); // Add bot's response
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'Error communicating with the server', type: 'bot' } // Handle server error
      ]);
    }

    setMessage(''); // Clear input field
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <BackgroundLines className="flex items-center justify-top w-full flex-col">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        SemaBot, <br /> Your digital friend, 24/7.
      </h2>

      {/* Input Component */}
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />

      {/* Messages Display */}
      <div
        className="p-2 space-y-2"
        style={{
            marginTop: '20px',
            height: '350px', // Hauteur fixe pour le conteneur
            width: '600px',
            overflowY: 'auto', // Permet le défilement vertical
            display: 'flex',
            flexDirection: 'column',
            scrollbarWidth: 'thin', // Pour Firefox
            scrollbarColor: 'transparent transparent', // Pour Firefox
          }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-2xl h-fit flex justify-center items-center max-w-md ${
              msg.type === 'user'
                ? 'bg-zinc-600 text-white self-start text-left'
                : 'bg-zinc-400 text-white self-end text-left ml-auto'
            }`}
          >
            <div className="flex items-center justify-center w-full h-fit">
              {/* Centering text */}
              <TextGenerateEffect words={msg.text} />
            </div>
          </div>
        ))}

        {/* Invisible div to scroll into view */}
        <div ref={messagesEndRef} />
      </div>
    </BackgroundLines>
  );
}

export default HomeChat;
