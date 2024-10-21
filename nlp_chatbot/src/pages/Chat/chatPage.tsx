import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from '../../components/ui/button';

function ChatPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string, type: string }[]>([]);

  const handleSend = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    setMessages([...messages, { text: message, type: 'user' }]);

    try {
      const res = await axios.post('http://localhost:5000/chat', { message });
      setMessages(prevMessages => [...prevMessages, { text: res.data.response, type: 'bot' }]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally show an error message in chat
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'Error communicating with the server', type: 'bot' }
      ]);
    }

    setMessage(''); // Clear the input field
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-background border-gray-700">
      <CardHeader className='border-b border-gray-700'>
        <CardTitle className='text-l font-bold' style={{ color: 'var(--title-color)' }}>Chat Box</CardTitle>
      </CardHeader>

      <CardContent className="p-5 space-y-4"
       style={{ height: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md w-fit max-w-xs ${
              msg.type === 'user'
                ? 'bg-pink-400 text-white self-start text-left'
                : 'bg-gray-200 text-black self-end text-left ml-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </CardContent>

      <CardFooter className='flex justify-between items-center border-t border-gray-700 p-4'>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow text-pink-400 p-2 border text-sm bg-transparent border-gray-500 rounded-md mr-2"
          onKeyPress={(e) => { if (e.key === 'Enter') handleSend(); }}  // Send on Enter
        />
        <Button onClick={handleSend} variant="outline" size="sm" style={{ color: 'var(--text-color)' }}>Send</Button>
      </CardFooter>
    </Card>
  );
}

export default ChatPage;
