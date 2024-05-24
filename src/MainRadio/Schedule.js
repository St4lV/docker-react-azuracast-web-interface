import React, { useEffect, useState } from 'react';

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [rows, setRows] = useState(5); // State to manage the number of rows to fetch

  const fetchSchedule = async () => {
    try {
      const response = await fetch(`https://radio.tirnatek.fr/api/station/tntr/schedule?now=now&rows=${rows}`);
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

  useEffect(() => {
    fetchSchedule();
    const checkTimeAndFetch = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      if (minutes === 0) {
        fetchSchedule();
      }
    };
    const intervalId = setInterval(checkTimeAndFetch, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [rows]); // Refetch data when the number of rows changes

  const handleToggleRows = () => {
    setRows((prevRows) => (prevRows === 5 ? 48 : 5));
  };

  return (
    <div onClick={handleToggleRows}>
    <table id="scheduleTable">
      <caption>
        <h2>Planning de diffusion</h2>
        <h4>(Effectif jusqu'au lendemain, minuit.)</h4>
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
    <div style={{fontSize: '0.8em', textAlign:'center'}}>
          {rows === 5 ? 'Cliquez sur le tableau pour agrandir' : 'Cliquez à nouveau pour refermer'}
        </div>
    </div>
  );
};

export default Schedule;
