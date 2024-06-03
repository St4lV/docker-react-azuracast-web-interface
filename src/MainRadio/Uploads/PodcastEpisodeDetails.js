import React, { useState } from 'react';
import axios from 'axios';
//import { parseBlob } from 'music-metadata-browser';

const PodcastEpisodeDetails = () => {
  const podcastId = localStorage.getItem('podcast_id');
  const [optionsResponse, setOptionsResponse] = useState(null);
  const [postResponse, setPostResponse] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [explicit, setExplicit] = useState(false);
  const [seasonNumber, setSeasonNumber] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [mediaFile, setMediaFile] = useState(null);
  const [artFile, setArtFile] = useState(null);
  const [mediaMetadata, setMediaMetadata] = useState({
    originalName: '',
    length: 0,
    lengthText: '',
    path: '',
  });

  const handleMediaUpload = async (event) => {
    const file = event.target.files[0];
    setMediaFile(file);

    try {
      const metadata = await /*parseBlob*/(file);

      const durationSeconds = Math.floor(metadata.format.duration);
      const lengthText = new Date(durationSeconds * 1000).toISOString().substr(11, 8);

      setMediaMetadata({
        originalName: file.name,
        length: durationSeconds,
        lengthText,
        path: '', // You can set the path if available or needed
      });
    } catch (error) {
      console.error('Error reading media file metadata:', error);
    }
  };

  const handleArtUpload = (event) => {
    setArtFile(event.target.files[0]);
  };

  const getTimestamp = () => {
    const date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
    return Math.floor(date.getTime() / 1000);
  };

  const handleButtonClick = async () => {
    try {
      const optionsRes = await axios({
        method: 'options',
        url: `https://radio.tirnatek.fr/api/station/1/podcast/${podcastId}/episodes`,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0',
          'Accept': '*/*',
          'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'content-type,x-api-key',
          'Referer': 'http://localhost/',
          'Origin': 'http://localhost',
          'Connection': 'keep-alive',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'cross-site',
          'Priority': 'u=4',
        },
      });

      setOptionsResponse(optionsRes.headers);

      const formData = new FormData();
      formData.append('links', 'https://radio.tirnatek.fr/api/stations/1/queue/1');
      formData.append('id', '');
      formData.append('title', title);
      formData.append('link', '');
      formData.append('description', description);
      formData.append('description_short', '');
      formData.append('explicit', explicit ? 1 : 0);
      formData.append('season_number', parseInt(seasonNumber, 10));
      formData.append('episode_number', parseInt(episodeNumber, 10));
      formData.append('created_at', Math.floor(Date.now() / 1000));
      formData.append('publish_at', getTimestamp());
      formData.append('is_published', isPublished ? 1 : 0);
      formData.append('has_media', true);
      formData.append('playlist_media_id', null);
      formData.append('playlist_media', null);
      formData.append('media[id]', ''); // Assuming media id is to be set
      formData.append('media[original_name]', mediaMetadata.originalName);
      formData.append('media[length]', mediaMetadata.length);
      formData.append('media[length_text]', mediaMetadata.lengthText);
      formData.append('media[path]', mediaMetadata.path);
      formData.append('media_file', mediaFile); // Append the media file as media_file
      formData.append('has_custom_art', true);
      formData.append('art', artFile);
      formData.append('art_updated_at', Math.floor(Date.now() / 1000));

      const postRes = await axios({
        method: 'post',
        url: `https://radio.tirnatek.fr/api/station/1/podcast/${podcastId}/episodes`,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0',
          'Accept': 'application/json',
          'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Referer': 'http://localhost/',
          'X-API-Key': process.env.REACT_APP_API_KEY,
          'Origin': 'http://localhost',
          'Connection': 'keep-alive',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'cross-site',
          'Priority': 'u=1',
        },
        data: formData
      });

      // Store POST response
      setPostResponse(postRes.data);
    } catch (error) {
      console.error('Error in requests:', error);
    }
  };

  return (
    <div>
      <h1>Podcast Episode Details</h1>
      <div>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Explicit:
          <input type="checkbox" checked={explicit} onChange={(e) => setExplicit(e.target.checked)} />
        </label>
      </div>
      <div>
        <label>
          Season Number:
          <input type="number" value={seasonNumber} onChange={(e) => setSeasonNumber(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Episode Number:
          <input type="number" value={episodeNumber} onChange={(e) => setEpisodeNumber(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Publish Date (DD/MM/YYYY):
          <input type="text" placeholder="Day" value={day} onChange={(e) => setDay(e.target.value)} />/
          <input type="text" placeholder="Month" value={month} onChange={(e) => setMonth(e.target.value)} />/
          <input type="text" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Publish Time (HH:MM:SS):
          <input type="text" placeholder="Hours" value={hours} onChange={(e) => setHours(e.target.value)} />h
          <input type="text" placeholder="Minutes" value={minutes} onChange={(e) => setMinutes(e.target.value)} />m
          <input type="text" placeholder="Seconds" value={seconds} onChange={(e) => setSeconds(e.target.value)} />s
        </label>
      </div>
      <div>
        <label>
          Is Published:
          <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
        </label>
      </div>
      <div>
        <label>
          Media Upload:
          <input type="file" accept="audio/mp3" onChange={handleMediaUpload} />
        </label>
      </div>
      <div>
        <label>
          Art Upload:
          <input type="file" accept="image/*" onChange={handleArtUpload} />
        </label>
      </div>
      <button onClick={handleButtonClick}>Send Requests</button>
      <div>
        <h2>OPTIONS Response Headers:</h2>
        <pre>{optionsResponse ? JSON.stringify(optionsResponse, null, 2) : 'No response yet'}</pre>
      </div>
      <div>
        <h2>POST Response Data:</h2>
        <pre>{postResponse ? JSON.stringify(postResponse, null, 2) : 'No response yet'}</pre>
      </div>
    </div>
  );
};

export default PodcastEpisodeDetails;
