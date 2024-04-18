import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //const apiPort = process.env.REACT_APP_API_PORT;
    const apiPort = 8080;

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert('Please fill in both fields.');
            return;
        }

        axios.post(
            'http://localhost:' + apiPort + '/api/login', {
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
            <Container className="col-md-3 border border-1">
                <Form>
                    <div className="text-center">
                        <h1>Welcome to LightFeather</h1>
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder=""
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="text-center">
                        <Button variant="primary" type="submit" onClick={handleFormSubmit}>
                            Log In
                        </Button>
                        <p>
                            Hint: login with lightfeatherio / lightfeatherio
                        </p>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    );
}

export default LoginPage;