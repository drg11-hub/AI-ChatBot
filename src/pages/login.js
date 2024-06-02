import React, { useState, useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../reducers/authReducer';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');

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

    const handleResetSubmit = (e) => {
        e.preventDefault();
        console.log('Reset Email:', resetEmail);
    };

    return (
        <div className="login-container">
            {!isForgotPassword ? (
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
                    <p className="forgot-password" onClick={() => setIsForgotPassword(true)}>Forgot Password?</p>
                </form>
            ) : (
                <form className="login-form" onSubmit={handleResetSubmit}>
                    <h2>Reset Password</h2>
                    <div className="form-group">
                        <label htmlFor="resetEmail">Email</label>
                        <input
                            type="email"
                            id="resetEmail"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Reset Password</button>
                    <p className="forgot-password" onClick={() => setIsForgotPassword(false)}>Back to Login</p>
                </form>
            )}
        </div>
    );
};

export default LogIn;
