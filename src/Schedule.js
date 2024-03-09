import React, { useEffect, useState } from 'react';

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch('https://radio.tirnatek.fr/api/station/tntr/schedule?now=now&rows=48');
        const gp = await response.json();

        const scheduleRows = gp.map((playlist, index) => {
          const startDate = new Date(playlist.start);
          const formattedTime = isNaN(startDate)
            ? new Date(playlist.start.replace(/[\sT+]/g, ' ')).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
            : startDate.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

          return (
            <tr key={index}>
              <td>{playlist.name}</td>
              <td>{formattedTime}</td>
            </tr>
          );
        });

        setScheduleData(scheduleRows);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <table id="scheduleTable">
      <caption>
        <h1>Planning de diffusion</h1>
        <h3>(Effectif jusqu'au lendemain, minuit.)</h3>
      </caption>
      <thead>
        <tr>
          <th>Playlist</th>
          <th>Heure de diffusion</th>
        </tr>
      </thead>
      <tbody id="scheduleBody" className="policePlaylist">
        {scheduleData}
      </tbody>
    </table>
  );
};

export default Schedule;
