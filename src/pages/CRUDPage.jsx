import React, { useState, useEffect } from 'react';
import './css/CRUDPage.css';

const API_URL = 'https://fakestoreapi.com/users';

const CRUDPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        firstname: '', 
        lastname: '',
        city: '',
        street: '',
        number: '',
        zipcode: '',
        phone: '',
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Failed to fetch users');
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!formData.email || !formData.username || !formData.firstname || !formData.lastname) {
            setError('Please fill in all required fields.');
            return;
        }
    
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    
        const body = {
            email: formData.email,
            username: formData.username,
            password: 'm38rmF$', 
            name: {
                firstname: formData.firstname,
                lastname: formData.lastname,
            },
            address: {
                city: formData.city,
                street: formData.street,
                number: formData.number,
                zipcode: formData.zipcode,
            },
            phone: formData.phone,
        };
    
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
    
            if (!response.ok) throw new Error('Failed to save user');
            const newUser = await response.json();
    
            const enrichedUser = {
                ...newUser,
                name: newUser.name || { firstname: '', lastname: '' },
                address: newUser.address || { city: '', street: '', number: '', zipcode: '' },
            };
    
            if (editingId) {
                setUsers(users.map(user => (user.id === editingId ? enrichedUser : user)));
            } else {
                setUsers([...users, enrichedUser]);
            }
    
            setFormData({
                email: '',
                username: '',
                firstname: '',
                lastname: '',
                city: '',
                street: '',
                number: '',
                zipcode: '',
                phone: '',
            });
            setEditingId(null);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    // Delete user
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete user');
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    // Edit user
    const handleEdit = (user) => {
        setFormData({
            email: user.email || '',
            username: user.username || '',
            firstname: user.name?.firstname || '',
            lastname: user.name?.lastname || '',
            city: user.address?.city || '',
            street: user.address?.street || '',
            number: user.address?.number || '',
            zipcode: user.address?.zipcode || '',
            phone: user.phone || '',
        });
        setEditingId(user.id);
    };

    // Cancel editing
    const handleCancel = () => {
        setFormData({
            email: '',
            username: '',
            firstname: '',
            lastname: '',
            city: '',
            street: '',
            number: '',
            zipcode: '',
            phone: '',
        });
        setEditingId(null);
        setError(null);
    };

    return (
        <div className="crud-container">
            <h2>CRUD Page</h2>

            <form onSubmit={handleSubmit} className="crud-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstname}
                    onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastname}
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Street"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="House Number"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Zipcode"
                    value={formData.zipcode}
                    onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <div className="form-buttons">
                    <button type="submit">{editingId ? 'Update' : 'Create'}</button>
                    {editingId && (
                        <button type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {users.length === 0 && !loading && <p>No users available. Add a new one!</p>}

            <ul className="item-list">
                {users.map(user => (
                    <li key={user.id} className="item-card">
                        <h3>{user.username}</h3>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Full Name:</strong> {user.name.firstname} {user.name.lastname}</p>
                        <p><strong>Address:</strong> {user.address.city}, {user.address.street}, {user.address.number}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <div className="action-buttons">
                            <button onClick={() => handleEdit(user)}>Edit</button>
                            <button onClick={() => handleDelete(user.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CRUDPage;
