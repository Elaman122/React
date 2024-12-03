import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './css/LoginRegister.css';

const LoginRegister = () => {
    const { login, register, error } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formError, setFormError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null); // Clear any previous errors

        if (isRegistering) {
            // Validate passwords match
            if (password !== confirmPassword) {
                setFormError('Passwords do not match!');
                return;
            }

            const success = await register(name, username, password);
            if (success) {
                alert('Registration successful! You can now log in.');
                setIsRegistering(false);
                setName('');
                setUsername('');
                setPassword('');
                setConfirmPassword('');
            } else {
                setFormError(error);
            }
        } else {
            login(username, password);
            alert("You have successfully logged into your account")
        }
    };

    return (
        <div className="login-register-container">
            <div className="tabs">
                <button
                    className={!isRegistering ? 'active' : ''}
                    onClick={() => setIsRegistering(false)}
                >
                    Login
                </button>
                <button
                    className={isRegistering ? 'active' : ''}
                    onClick={() => setIsRegistering(true)}
                >
                    Register
                </button>
            </div>
            <div className="form-container">
                <h2>{isRegistering ? 'Register' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>
                    {isRegistering && (
                        <div>
                            <label>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {isRegistering && (
                        <div>
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                    )}
                    <button type="submit" className="submit">
                        {isRegistering ? 'Register' : 'Login'}
                    </button>
                </form>
                {formError && <p>{formError}</p>}
                {error && !isRegistering && <p>{error}</p>}
            </div>
        </div>
    );
};

export default LoginRegister;
