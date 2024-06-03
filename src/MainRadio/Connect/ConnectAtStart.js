import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

function ConnectAtStart() {
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');

      if (!email || !token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await axios.post(
          'https://b.tirnatek.fr/verify-token',
          { email, token },
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          setIsAuthenticated(true);

          try {
            const userDataResponse = await axios.post(
              'https://b.tirnatek.fr/get-user-data',
              { email, token },
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                },
              }
            );
            if (userDataResponse.status === 200) {
              const userData = userDataResponse.data;
              localStorage.setItem('username', userData.username);
              localStorage.setItem('description', userData.description);
              localStorage.setItem('podcast_id', userData.podcast_id);
            } else {
              console.error('Failed to fetch user data:', userDataResponse.statusText);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }

        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.error('Error verifying token:', error);
      }
    };

    checkTokenValidity();
  }, [setIsAuthenticated]);

  return null;
}

export default ConnectAtStart;
