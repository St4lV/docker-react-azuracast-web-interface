# Azuracast Web interface using Docker, NodeJS & React (Tirnatek Radio)

This project is a React Web Interface running on NodeJS meant to use Azuracast service and API.

## Running
This project is meant to be run with docker using 2 containers :
- **Azuracast container :**
  - Check out this page of documentation : https://www.azuracast.com/docs/getting-started/installation/docker/

- **Node JS container :**
  - Check out this page of documentation : https://hub.docker.com/_/node/
  - React will run with NodeJS inside container no need to install more in order to make this work.
  - Refer "*update-script.sh*" file for commands used to update files used the in docker container.
---
## Progression:
 * [x] Display playlist, artist and name of actual playing song.
 * [x] Audio flux quality choice (128kbps (default); 320kbps; 96kbps)
 * [x] Diffusion schedule up to next day, 23h59 UTC+1 Paris.
 * [x] Timer for playing song
 * [x] Images buttons with link to social medias related with project
 * [x] Custom audio player 
 * [x] Album/song cover integration
 * [x] Mobile page (95% only design tweaks left)
 * [x] Song & last 5 played display when you clck on song metadata
 * [ ] EQ Visualiser
 * [ ] Switch language on main page (French, English)
 * [ ] Rate song popularity (upvote or downvote when song is playing)
---
### This is the 2nd version and a major upgrade of a previous project.

Old version : https://github.com/St4lV/St4lV.github.io

---
