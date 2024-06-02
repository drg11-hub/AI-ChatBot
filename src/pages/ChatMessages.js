import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatHistory } from '../reducers/chatSlice';
import chatBotImg from "../assets/chatbot.avif";
import userImg from "../assets/user.webp";
import './ChatMessages.css';

const ChatMessages = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);
    const currentSession = useSelector((state) => state.chat.currentSession);
    const isTyping = useSelector((state) => state.chat.isTyping);
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (currentSession) {
            dispatch(fetchChatHistory(currentSession.sessionId));
        }
    }, [currentSession, dispatch]);

    const scrollToBottom = () => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    return (
        <div className="chat-messages">
            {messages && messages.length > 0 ? (
                messages.map((message, index) => (
                    <div key={index} className={`chat-message ${message.sender === 'You' ? 'user-message' : 'chatbot-message'}`}>
                        <div className="message-header">
                            <img
                                src={message.sender === 'You' ? userImg : chatBotImg}
                                alt="User Logo"
                                className="message-logo"
                            />
                            <div className="message-bubble">
                                <strong>{message.sender}</strong>
                                <div className="message-text">{message.text}</div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No messages yet. Start the conversation!</p>
            )}
            {isTyping && (
                <div className="typing-indicator">
                    <p>AI Bot is typing...</p>
                </div>
            )}
            <div ref={chatEndRef} />
        </div>
    );
};

export default ChatMessages;
