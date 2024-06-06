import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChatSession, fetchChatSessions, setCurrentSession } from '../reducers/chatSlice';
import './ChatSessionList.css';

const ChatSessionList = () => {
    const dispatch = useDispatch();
    const sessions = useSelector((state) => state.chat.sessions);
    const currentSession = useSelector((state) => state.chat.currentSession);

    useEffect(() => {
        dispatch(fetchChatSessions());
    }, [dispatch]);

    const handleNewChat = () => {
        dispatch(createChatSession());
    };

    const handleChatSelect = (session) => {
        dispatch(setCurrentSession(session));
    };

    return (
        <aside className="sidebar">
            <button className="new-chat-button" onClick={handleNewChat}>+ New Chat</button>
            <div className="chat-list">
                {sessions.map((session) => (
                    <div
                        key={session._id}
                        className={`chat-item ${currentSession && currentSession._id === session._id ? 'active-chat' : ''}`}
                        onClick={() => handleChatSelect(session)}
                    >
                        {session.initialQuery || "New Chat"}
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default ChatSessionList;

// -----google new code:

