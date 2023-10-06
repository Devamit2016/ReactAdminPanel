import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function AuthGuard() {
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        // Check if token is present and user data is available
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('auth_user');

        if (token && userData) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, []);

    if (!authenticated) {
        navigate('/');
    }

};

export default AuthGuard;
