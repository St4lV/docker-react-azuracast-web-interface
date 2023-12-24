###Tirnatek Radio Web Interface
---
#This is the 2nd verion and a major upgrade a previous project.
Old version : https://github.com/St4lV/St4lV.github.io
---
##Running

This project is meant to be run with docker using 2 containers :
- Azuracast container
  Check out this page of documentation : https://www.azuracast.com/docs/getting-started/installation/docker/

- Node JS container
  Check out this page of documentation : https://hub.docker.com/_/node/
  React will run with NodeJS inside container no need to install more in order to make this work.
  Refer **update-script.sh** for commands used.
---
## Progression:
 * [x] Display playlist, artist and name of actual playing song.
 * [x] Audio flux quality choice (128kbps (default); 320kbps; 96kbps)
 * [x] Diffusion schedule up to next day, 23h59 UTC+1 Paris.
 * [x] Mobile adapted page for better ergonomy
 * [x] Timer for playing song
 * [x] Images buttons with link to social medias related with project
 * [ ] Custom audio player 
 * [ ] Album/song cover integration
 * [ ] Switch language on main page (French, English)
