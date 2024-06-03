import React, { useState, useContext } from 'react';
import { AuthContext } from '../Connect/AuthContext';
import ConnectAtStart from '../Connect/ConnectAtStart';
import axios from 'axios';

function Connect({ isMobile }) {
    const { setIsAuthenticated } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [uuid, setUuid] = useState("");
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [step, setStep] = useState(0);

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleSendCode = async () => {
        if (!validateEmail(email)) {
            setError("Invalid email format. Please enter a valid email address.");
            return;
        }

        setStep(1);
        try {
            const payload = { email };

            console.log('Sending code with payload:', payload);

            const response = await axios.post(
                'https://b.tirnatek.fr/send-code',
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                setUuid(response.data.uuid);
                setError("");
                console.log('UUID received:', response.data.uuid);
            }
        } catch (error) {
            console.error('Error during send code:', error);
            if (error.response) {
                if (error.response.status === 400) {
                    setError(error.response.data);
                } else {
                    setError("An error occurred during login.");
                }
            } else {
                setError("An error occurred during login.");
            }
        }
    };

    const handleLogin = async () => {
        try {
            const payload = { uuid, code };

            console.log('Logging in with payload:', payload);

            const response = await axios.post(
                'https://b.tirnatek.fr/login',
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                const responseData = response.data;
                const token = responseData.split('token: ')[1];

                if (token) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('email', email);

                    // Dispatch custom event after setting localStorage
                    const event = new Event('localStorageUpdated');
                    window.dispatchEvent(event);

                    setIsAuthenticated(true);
                    setError("");
                    console.log('Login successful, token saved.');
                    ConnectAtStart();
                } else {
                    setError("Token not found in the response.");
                    console.error('Token not found in the response.');
                }
            }
        } catch (error) {
            setIsAuthenticated(false);
            console.error('Error during login:', error);
            if (error.response) {
                if (error.response.status === 400) {
                    setError(error.response.data);
                } else {
                    setError("An error occurred during login.");
                }
            } else {
                setError("An error occurred during login.");
            }
        }
    };

    return (
        <div>
            {step === 0 ? (
                <div>
                    <h2>Se connecter:</h2>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    /><br/>
                    <button onClick={handleSendCode}>Envoyer le code</button>
                    <p>{error}</p>
                </div>
            ) : (
                <div>
                    <h2>Vérifiez votre code:</h2>
                    <input
                        type="text"
                        value={uuid}
                        onChange={(e) => setUuid(e.target.value)}
                        placeholder="UUID"
                    /><br/>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Code"
                    /><br/>
                    <button onClick={handleLogin}>Se connecter</button>
                    <div onClick={handleSendCode}>
                        <p>Renvoyer le code</p>
                    </div>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}

export default Connect;
