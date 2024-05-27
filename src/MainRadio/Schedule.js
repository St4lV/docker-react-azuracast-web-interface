import React, { useEffect, useState, useCallback } from 'react';

const Schedule = ({ isMobile }) => {
  const [scheduleData, setScheduleData] = useState([]);
  const [rows, setRows] = useState(8);

  const fetchSchedule = useCallback(async () => {
    try {
      const response = await fetch(`https://radio.tirnatek.fr/api/station/tntr/schedule?now=now&rows=${rows}`);
      const gp = await response.json();

      setScheduleData(gp);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  }, [rows]);

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
  }, [fetchSchedule]);

  const handleToggleRows = () => {
    setRows((prevRows) => (prevRows === 8 ? 48 : 8));
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    if (isNaN(date)) {
      const adjustedTimeString = timeString.replace(/[\sT+]/g, ' ');
      return new Date(adjustedTimeString).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  };

  const formatScheduleData = (data) => {
    return data.map((playlist, index) => (
      <tr key={index}>
        <td>{playlist.name}</td>
        <td>{formatTime(playlist.start)}</td>
      </tr>
    ));
  };

  const formattedScheduleData = formatScheduleData(scheduleData);

  return (
    <div onClick={handleToggleRows} className={'table-bbg'}>
      <table className={'scheduleTable'}>
        <caption className='table-bbg-1'>
          <h2>Planning de diffusion</h2>
          <h4>(Effectif jusqu'au lendemain, minuit.)</h4>
        </caption>
        <thead className={'header-table'}>
          <tr>
            <th>Playlist</th>
            <th>Heure de diffusion</th>
          </tr>
        </thead>
        <tbody className="body-table">
          {formattedScheduleData}
        </tbody>
      </table>
      <div style={{ fontSize: '0.8em', textAlign: 'center', padding: '25px' }}>
        {rows === 8 ? 'Cliquez sur le tableau pour agrandir' : 'Cliquez à nouveau pour refermer'}
      </div>
    </div>
  );
};

export default Schedule;
