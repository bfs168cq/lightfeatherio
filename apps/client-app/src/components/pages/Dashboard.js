import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Supervisor from './Supervisor';

const Dashboard = () => {
    const navigate = useNavigate();
    const [supervisors, setSupervisors] = useState([]);

    useEffect(() => {
        const authenticated = localStorage.getItem("authenticated");
        //console.log('authenticated=', authenticated);
        if (authenticated === 'false') {
            navigate("/login");
        }

        const fetchSupervisors = async () => {
            try {
                const response = await api.get('http://localhost:1082/api/supervisors');
                console.log(response.data);
                setSupervisors(response.data);
            } catch (error) {
                // Handle error or redirect to login
                console.error('Error', error.message);
            }
        };

        fetchSupervisors();
    }, []);

    const supervisorList = supervisors.map(supervisor => <Supervisor key={supervisor.id} supervisor={supervisor} />)
    return (
        <div>
            <div>
            Welcome to Supervisor Management Dashboard
            </div>
            <div>
                {supervisorList}
            </div>
            
        </div>
    );
}

export default Dashboard;