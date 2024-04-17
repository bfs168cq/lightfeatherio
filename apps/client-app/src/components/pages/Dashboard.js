import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import api from '../../api';
import axios from "axios";
import Supervisor from './Supervisor';
import './Dashboard.css'

const Dashboard = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [byEmail, setByEmail] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [byPhone, setByPhone] = useState(false);
    const [selectedSupervisorId, setSelectedSupervisorId] = useState('');
    const [supervisors, setSupervisors] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const authenticated = localStorage.getItem("authenticated");
        //console.log('authenticated=', authenticated);
        if (authenticated === 'false') {
            navigate("/login");
        }

        const fetchSupervisors = async () => {
            await api.get('http://localhost:8080/api/supervisors').then((response) => {
                console.log(response);
                setSupervisors(response.data);
                setLoaded(true);
            }, (error) => {
                setLoaded(true);
                console.log(error);
            });
        };

        if (!loaded) fetchSupervisors();
    }, [firstName, lastName, email, byEmail, phoneNumber, byPhone, selectedSupervisorId]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!firstName || !lastName) {
            alert('Please fill in both fields.');
            return;
        }

        const submitRequest = async () => {
            console.log('byEmail=', byEmail)
            await api.post('http://localhost:8080/api/submit', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                byEmail: byEmail,
                byPhone: byPhone
            }).then((response) => {
                console.log(response);
                setSuccessMessage('The supervisor is notified');
            }, (error) => {
                console.log(error);
            })
        };

        submitRequest();
    };

    //const supervisorList = supervisors.map(supervisor => <Supervisor key={supervisor.id} supervisor={supervisor} />)
    console.log('rending ', supervisors.length);
    return (
        <Container className="col-md-6">
            <Row>
                <Col>
                    Notification Form
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Text className="text-muted">
                            How would you prefer to be notified?
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Check type="checkbox" label="Email"
                            id="byEmail"
                            checked={byEmail}
                            onChange={(e) => {
                                //console.log('e.target.value', e.target.checked);
                                setByEmail(e.target.checked);
                            }}
                        />
                        <Form.Control
                            type="text"
                            placeholder=""
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Check type="checkbox" label="Phone Number"
                            id="byPhone"
                            checked={byPhone}
                            onChange={(e) => {
                                setByPhone(e.target.checked);
                            }}
                        />
                        <Form.Control
                            type="text"
                            placeholder=""
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>SuperVisor</Form.Label>
                        <Form.Select
                            id="supervisor"
                            value={selectedSupervisorId}
                            onChange={(e) => {
                                setSelectedSupervisorId(e.target.value);
                            }}
                        >
                            {
                                supervisors.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>
                                            {item.jurisdiction} - {item.lastName}, {item.firstName}
                                        </option>
                                    );
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" type="submit" onClick={handleFormSubmit}>
                        Submit
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Text muted>
                        {successMessage}
                    </Form.Text>
                </Col>
            </Row>
        </Container >
    );
}

export default Dashboard;