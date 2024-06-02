import React from 'react';
import ChatSessionList from './ChatSessionList';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import './chat-main.css';

const ChatApp = () => {
    return (
        <div className="chat-app">
            <div className="main-content">
                <ChatSessionList />
                <div className="chat-area">
                    <ChatMessages />
                    <ChatInput />
                </div>
            </div>
        </div>
    );
};

export default ChatApp;