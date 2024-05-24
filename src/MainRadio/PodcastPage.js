import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Episode from './Podcasts/Episode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faFacebook, faInstagram, faSoundcloud, faSpotify, faDeezer, faApple, faTiktok, faXTwitter, faYoutube, faBandcamp } from '@fortawesome/free-brands-svg-icons';
import { faShareFromSquare, faLink } from '@fortawesome/free-solid-svg-icons';
import TNTRQRCODE from './TNTRQRCODE.png';

const PodcastPage = ({ isMobile }) => {
  const { urlEncodedTitle } = useParams();
  const navigate = useNavigate();
  const [podcastData, setPodcastData] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [error, setError] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch(`https://radio.tirnatek.fr/api/station/1/podcasts`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        const decodedTitle = decodeURIComponent(urlEncodedTitle.replace(/_/g, ' ')); // Decode and replace underscores with spaces
        const podcast = data.find(p => p.title === decodedTitle);
        if (!podcast) {
          navigate('/sets'); // Redirect if podcast not found
          return;
        }
        setPodcastData(podcast);
        fetchEpisodes(podcast.id);
        if (podcast.art) {
          fetchImageData(podcast.art);
        }
      } catch (error) {
        setError(error);
        navigate('/sets'); // Redirect on error
      } finally {
        setLoading(false);
      }
    };

    const fetchEpisodes = async (podcastId) => {
      try {
        const response = await fetch(`https://radio.tirnatek.fr/api/station/1/podcast/${podcastId}/episodes`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setEpisodes(data);
      } catch (error) {
        setError(error);
        navigate('/sets'); // Redirect on error
      }
    };

    const fetchImageData = async (imageUrl) => {
      try {
        const response = await fetch(imageUrl, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        });
        if (response.ok) {
          const blob = await response.blob();
          const dataUrl = URL.createObjectURL(blob);
          setImageDataUrl(dataUrl);
        } else {
          throw new Error('Failed to fetch image');
        }
      } catch (error) {
        setError(error);
        navigate('/sets'); // Redirect on error
      }
    };

    if (urlEncodedTitle) {
      fetchPodcasts();
    }
  }, [urlEncodedTitle, navigate]);

  const copyToClipboard = (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => console.error('Failed to copy text: ', err));
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
  
      try {
        const successful = document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
  
      document.body.removeChild(textarea);
    }
  };

  const renderLinks = (linksString) => {
    const urlPattern = /https?:\/\/[^\s]+/g;
    const links = linksString.match(urlPattern) || [];
    return links.map((link) => {
      let icon;
      if (link.includes('discord.com') || link.includes('discord.gg')) {
        icon = faDiscord;
      } else if (link.includes('facebook.com')) {
        icon = faFacebook;
      } else if (link.includes('instagram.com')) {
        icon = faInstagram;
      } else if (link.includes('soundcloud.com')) {
        icon = faSoundcloud;
      } else if (link.includes('tiktok.com')) {
        icon = faTiktok;
      } else if (link.includes('twitter.com') || link.includes('x.com')) {
        icon = faXTwitter;
      } else if (link.includes('youtube.com')) {
        icon = faYoutube;
      } else if (link.includes('spotify.com')) {
        icon = faSpotify;
      } else if (link.includes('deezer.com')) {
        icon = faDeezer;
      } else if (link.includes('music.apple.com')) {
        icon = faApple;
      } else if (link.includes('bandcamp.com')) {
        icon = faBandcamp;
      } else {
        icon = faLink;
      }
      return (
        <a href={link} target="_blank" rel="noopener noreferrer" className='link' key={link}>
          <FontAwesomeIcon icon={icon} className={isMobile ? 'm-artist-page-icons' : 'artist-page-icons'} />
        </a>
      );
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!podcastData || !episodes) {
    return <div>Podcast not found</div>;
  }

  return (
    <>
      <h1 className={isMobile ? 'm-artist-comp-page' : 'artist-comp-page'}>
        {podcastData.author || 'Artist not found'}
      </h1>
      <div className={isMobile ? 'm-artist-comp-content-page' : 'artist-comp-content-page'}>
        <img
          src={imageDataUrl}
          alt={TNTRQRCODE}
          id={isMobile ? 'm-artist-art-page' : 'artist-art-page'}
        />
        <div className={isMobile ? 'm-artist-desc-page' : 'artist-desc-page'}>
          <h2>Description:</h2>
          <p>{podcastData.description || 'Non spécifié'}</p>
          <div>
            <p>
              <FontAwesomeIcon
                icon={faShareFromSquare}
                className={isMobile ? 'm-artist-page-icons' : 'artist-page-icons'}
                onClick={() => copyToClipboard(podcastData.link)}
                style={{ cursor: 'pointer' }}
              />
              {renderLinks(podcastData.branding_config.public_custom_html)}
            </p>
          </div>
        </div>
      </div>
      {copied && <div style={isMobile ? { display: 'none' } : { position: 'fixed', bottom: '160px', fontSize: '0.8em', color: 'green', textAlign: 'center'}}>
        Link copied to clipboard!
      </div>}
      <div className="episodes-list">
        {episodes.map((episode) => (
          <Episode key={episode.id} episodeId={episode.id} podcastId={podcastData.id} isMobile={isMobile} />
        ))}
      </div>
    </>
  );
};

export default PodcastPage;
