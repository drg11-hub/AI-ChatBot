import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, setIsTyping } from '../reducers/chatSlice';
import './ChatInput.css';

const ChatInput = () => {
    const [input, setInput] = useState('');
    const textareaRef = useRef(null);
    const dispatch = useDispatch();
    const currentSession = useSelector((state) => state.chat.currentSession);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSend = () => {
        if (input.trim() && currentSession) {
            dispatch(setIsTyping(true));  // Set typing state to true
            dispatch(sendMessage({ chatSessionId: currentSession.sessionId, sender: 'You', text: input }));
            setInput('');
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [input]);

    return (
        <div className="chat-input-area">
            <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                placeholder="Type a message..."
                className="chat-input"
                rows="1"
            />
            <button onClick={handleSend} className="send-button">Send</button>
        </div>
    );
};

export default ChatInput;
