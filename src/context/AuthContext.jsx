import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);
const API_URL = 'https://67415a25e4647499008d72f6.mockapi.io/api/v1/users';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const users = await response.json();

            const foundUser = users.find(
                (u) => u.username === username && u.password === password
            );

            if (foundUser) {
                setUser(foundUser);
                setError(null);
                navigate('/');
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            setError('An error occurred while logging in');
        }
    };

    const register = async (name, username, password) => {
        if (!name || !username || !password) {
            setError('All fields are required');
            return false;
        }

        const newUser = {
            name,
            username,
            password,
            cocktails: [],
            avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/default.jpg',
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                setError(null);
                return true;
            } else {
                throw new Error('Failed to register user');
            }
        } catch (err) {
            setError('An error occurred while registering');
            return false;
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
