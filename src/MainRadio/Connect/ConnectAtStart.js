import { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const connectAtStart = async (setIsAuthenticated) => {
  let email = localStorage.getItem('email');
  let token = localStorage.getItem('token');

  const handleLocalStorageUpdate = () => {
    email = localStorage.getItem('email');
    token = localStorage.getItem('token');
  };

  window.addEventListener('localStorageUpdated', handleLocalStorageUpdate);

  const checkTokenValidity = async () => {
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
          }
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
              }
            }
          );

          if (userDataResponse.status === 200) {
            const userData = userDataResponse.data;
            localStorage.setItem('username', userData.username);
            localStorage.setItem('description', userData.description);
            localStorage.setItem('podcast_id', userData.podcast_id);
            const event = new Event('localStorageUpdated');
            window.dispatchEvent(event);
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

  await checkTokenValidity();
};

function ConnectAtStart() {
  const { setIsAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    connectAtStart(setIsAuthenticated);
  }, [setIsAuthenticated]);

  return null;
}

export default ConnectAtStart;
