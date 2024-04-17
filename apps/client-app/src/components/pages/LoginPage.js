import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert('Please fill in both fields.');
            return;
        }

        axios.post(
            "http://localhost:8080/api/login", {
            username: username,
            password: password
        }
        )
            .then((response) => {
                console.log(response);
                const { token } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('authenticated', true);
                navigate("/dashboard");
            })
            .catch((error) => {
                console.error('Error', error.message);
                localStorage.setItem('authenticated', false);
            });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
            <p>
                Hint: login with lightfeatherio / lightfeatherio
            </p>
        </div>
    );
}

export default LoginPage;