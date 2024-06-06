import React, { useState, useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../reducers/authReducer';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const authStatus = useSelector((state) => state.auth.status);
    const authError = useSelector((state) => state.auth.error);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/chatmain');
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(loginAsync({ email, password }));
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
                {authStatus === 'loading' && <p>Loading...</p>}
                {authStatus === 'failed' && <p>{authError}</p>}
                <p className="forgot-password" onClick={() => navigate('/reset-password')}>Forgot Password?</p>
            </form>
        </div>
    );
};

export default LogIn;

// ---google signup code: