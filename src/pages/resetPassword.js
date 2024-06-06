import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPasswordAsync } from '../reducers/authReducer';
import './resetPassword.css';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errors, setErrors] = useState([]);
    
    const dispatch = useDispatch();
    const authStatus = useSelector((state) => state.auth.status);
    const authError = useSelector((state) => state.auth.error);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const newErrors = [];
        if (newPassword !== confirmNewPassword) {
            newErrors.push('Passwords do not match!');
        }
        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }
        dispatch(resetPasswordAsync({ email, newPassword }));
    };
    
    useEffect(() => {
        if (authStatus === 'succeeded') {
            navigate('/login');
        }
    }, [authStatus, navigate]);

    return (
        <div className="reset-password-container">
            <form className="reset-password-form" onSubmit={handleSubmit}>
                <h2>Reset Password</h2>
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
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="reset-password-button">Reset Password</button>
                {authStatus === 'loading' && <p>Loading...</p>}
                {authStatus === 'failed' && <p>{authError}</p>}
                {errors.map((error, index) => (
                    <p key={index} className="error">{error}</p>
                ))}
                <p className="back-to-login" onClick={() => navigate('/login')}>Back to Login</p>
            </form>
        </div>
    );
};

export default ResetPassword;
