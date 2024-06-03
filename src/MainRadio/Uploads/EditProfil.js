import React, { useState } from 'react';

const EditProfil = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [description, setDescription] = useState(localStorage.getItem('description'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [responseMessage, setResponseMessage] = useState('');
  const precedentEmail = localStorage.getItem('email');
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = {
        username,
        email,
        precedentEmail,
        description,
        token  // Include token in formData for the update request
      };

      console.log('Sending update user data request with data:', formData);
      const updateResponse = await fetch('https://b.tirnatek.fr/update-user-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (updateResponse.status !== 200) {
        const updateResult = await updateResponse.json();
        setResponseMessage(updateResult.message || 'Profile update failed.');
        return;
      }

      console.log('Sending token verification request...');
      const verifyTokenResponse = await fetch('https://b.tirnatek.fr/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: precedentEmail, token })
      });

      if (verifyTokenResponse.status !== 200) {
        const verifyTokenResult = await verifyTokenResponse.json();
        setResponseMessage(verifyTokenResult.message || 'Token verification failed.');
        return;
      }

      setResponseMessage('Profile updated and token verified successfully');
      localStorage.setItem('email', email);
      localStorage.setItem('username', username);
      localStorage.setItem('description', description);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Éditer votre profil</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label>
            Email:
            <br />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <br />
            Nom d'utilisateur :
            <br />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <br />
            Description:
            <br />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default EditProfil;
