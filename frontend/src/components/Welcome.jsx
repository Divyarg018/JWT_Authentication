import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true

function Welcome() {
    const [user, setUser] = useState();
    async function sendRequest() {
        try {
            const res = await axios.get('http://localhost:5000/api/user', {
                withCredentials: true
            });
            if (res && res.data) { // Add a null check for 'res' and 'res.data'
                return res.data;
            } else {
                console.error("Response or response data is undefined");
                return null;
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            return null;
        }
    }
    
    useEffect(() => {
        sendRequest().then((data) => setUser(data.user))
    }, [])
    return (
        <div>
            {user && <h1>{user.name}</h1>}
        </div>
    )
}

export default Welcome;