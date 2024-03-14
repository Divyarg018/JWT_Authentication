import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true

let firstRender = true;
function Welcome() {
    const [user, setUser] = useState();

    async function refreshToken() {
        const res = await axios.get("http://localhost:5000/api/refresh", {
            withCredentials: true
        }).catch(err => console.log(err))

        const data = await res.data;
        return data;
    }
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
        if (firstRender) {
            sendRequest().then((data) => setUser(data.user));
        }
        let interval = setInterval(() => {
            refreshToken().then(data => setUser(data.user));
        }, 1000 * 29)

        return () => clearInterval(interval)
    }, [])
    return (
        <div>
            {user && <h1>{user.name}</h1>}
        </div>
    )
}

export default Welcome;