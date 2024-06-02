// import React, { useState } from 'react';
// import "./signup.css"

// const SignUp = () => {
//     const [name, setname] = useState('');
//     const [email, setEmail] = useState('');
//     const [confirmEmail, setConfirmEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Handle signup logic here
//         if (email !== confirmEmail) {
//             alert('Emails do not match!');
//             return;
//         }
//         if (password !== confirmPassword) {
//             alert('Passwords do not match!');
//             return;
//         }
//         console.log('name:', name);
//         console.log('Email:', email);
//         console.log('Password:', password);
//     };

//     return (
//         <>
//             <div className="signup-container">
//                 <form className="signup-form" onSubmit={handleSubmit}>
//                     <h2>Sign Up</h2>
//                     <div className="form-group">
//                         <label htmlFor="name">name</label>
//                         <input
//                             type="text"
//                             id="name"
//                             value={name}
//                             onChange={(e) => setname(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="confirmEmail">Confirm Email</label>
//                         <input
//                             type="email"
//                             id="confirmEmail"
//                             value={confirmEmail}
//                             onChange={(e) => setConfirmEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="confirmPassword">Confirm Password</label>
//                         <input
//                             type="password"
//                             id="confirmPassword"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="signup-button">Sign Up</button>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default SignUp;

// --------new v-0-------

// signup.js
// import React, { useState } from 'react';
// import "./signup.css";
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { signupAsync } from '../reducers/authReducer';

// const SignUp = () => {
//     const [name, setname] = useState('');
//     const [email, setEmail] = useState('');
//     const [confirmEmail, setConfirmEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const authStatus = useSelector((state) => state.auth.status);
//     const authError = useSelector((state) => state.auth.error);
//     const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (email !== confirmEmail) {
//             alert('Emails do not match!');
//             return;
//         }
//         if (password !== confirmPassword) {
//             alert('Passwords do not match!');
//             return;
//         }
//         dispatch(signupAsync({ name, email, password }));
//     };

//     React.useEffect(() => {
//         if (isLoggedIn) {
//             navigate('/chatmain');
//         }
//     }, [isLoggedIn, navigate]);

//     return (
//         <div className="signup-container">
//             <form className="signup-form" onSubmit={handleSubmit}>
//                 <h2>Sign Up</h2>
//                 <div className="form-group">
//                     <label htmlFor="name">name</label>
//                     <input
//                         type="text"
//                         id="name"
//                         value={name}
//                         onChange={(e) => setname(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="email">Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="confirmEmail">Confirm Email</label>
//                     <input
//                         type="email"
//                         id="confirmEmail"
//                         value={confirmEmail}
//                         onChange={(e) => setConfirmEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="password">Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="confirmPassword">Confirm Password</label>
//                     <input
//                         type="password"
//                         id="confirmPassword"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="signup-button">Sign Up</button>
//                 {authStatus === 'loading' && <p>Loading...</p>}
//                 {authStatus === 'failed' && <p>{authError}</p>}
//             </form>
//         </div>
//     );
// };

// export default SignUp;


// new v-1 //
import React, { useState, useEffect } from 'react';
import "./signup.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupAsync, resetSignupSuccess } from '../reducers/authReducer';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const authError = useSelector((state) => state.auth.error);
    const signupSuccess = useSelector((state) => state.auth.signupSuccess);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const newErrors = [];
        if (email !== confirmEmail) {
            newErrors.push('Emails do not match!');
        }
        if (password !== confirmPassword) {
            newErrors.push('Passwords do not match!');
        }
        if (!/^[a-zA-Z0-9]{5,15}$/.test(name)) {
            newErrors.push('Username must be alphanumeric and 5-15 characters long.');
        }
        if (!/^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,15}$/.test(password)) {
            newErrors.push('Password must be 6-15 characters long, include at least one numeric digit and one special character.');
        }
        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }
        dispatch(signupAsync({ name, email, password }));
    };

    useEffect(() => {
        if (signupSuccess) {
            navigate('/login');
            dispatch(resetSignupSuccess());
        }
    }, [signupSuccess, navigate, dispatch]);

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <small>5-15 characters, alphanumeric</small>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <small>Valid email format</small>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmEmail">Confirm Email</label>
                    <input
                        type="email"
                        id="confirmEmail"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
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
                    <small>6-15 characters, at least 1 numeric and 1 symbol</small>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
                {authStatus === 'loading' && <p>Loading...</p>}
                {authStatus === 'failed' && authError && Array.isArray(authError) && authError.map((error, index) => (
                    <p key={index} className="error">{error}</p>
                ))}
                {errors.map((error, index) => (
                    <p key={index} className="error">{error}</p>
                ))}
            </form>
        </div>
    );
};

export default SignUp;

