# Azuracast Web interface using Docker, NodeJS & React (Tirnatek Radio)

**This project is a *React* Web Interface running on *NodeJS* meant to use *Azuracast* instance services and API.**

---
## Progression:
 * [x] Display playlist, artist and name of actual playing song.
 * [x] Audio flux quality choice (128kbps (default); 320kbps; 96kbps)
 * [x] Diffusion schedule up to next day, 23h59 UTC+1 Paris.
 * [x] Timer for playing song
 * [x] Icons with link to social medias related with project
 * [x] Custom audio player 
 * [x] Album/song cover integration
 * [x] Mobile page (95% only design tweaks left)
 * [x] Song & last 10 played display when you click on song metadata
 * [ ] EQ Visualiser
 * [ ] Switch language on main page (French, English)
 * [ ] Rate song popularity (upvote or downvote when song is playing)
 
---


## Before running project - Documentations

This project is meant to be run with docker using 2 Docker containers :

- **Azuracast container :**
  - Check out this page of documentation : https://www.azuracast.com/docs/getting-started/installation/docker/

- **Node JS container :**
  - Check out this page of documentation : https://hub.docker.com/_/node/
  - React will run with NodeJS inside container no need to install more in order to make this work.
  - Refer "*update-script.sh*" file for commands used to update files used the in docker container.
- Every command i gave here have to be made with a root user or equivalent permissions.

---

## Re-using project for your own usage
Site is available here : https://www.tirnatek.fr

* Install ***node js*** and ***npm*** command

```bash
apt install nodejs
apt -y install nodejs npm 

```
* **Create a new project**

```bash
mkdir /var/project-name
cd /var/project-name
npx create-react-app project-name
```

* **Import project**

Connect in SFTP to your server and upload the project in */var/project-name*.

Permissions issues can deny your ssh user to upload in */var/project-name* if your user is lacking authorizations.

I personally use a script located in */root/* to unzip the .zip of project from */home/user/upload/NodeJS/* to */var/project-name/*.

 * (**Unzip script**)

If you want to use it, make sure unzip is installed by running

```bash
apt install unzip
```
Make sure to replace path with **your actual project path** !
```bash
#!/bin/bash

# Remove old version files

rm -r /var/project-name/

# Uncompress new update

unzip /home/user/upload/NodeJS/project.zip -d /var/

chmod -R +x /var/project-name

cd /var/project-name || exit

#uncomment this line to start web service right after uploading it
#./update-script.sh 
```

* **Adapt the names for your project**

There is mention to my project name mostly in */src/* but you can already change this 3 files :

* Dockerfile
* package.json
* update-script.sh

Once it's done you can safely run
```bash
./update-script.sh
```

* **Cerbot SSL Certificates**

**BEFORE READING THAT CHECK "*Problems i've encountered you'll probably have too*" SECTION FOR NGINX CONFIGURATION**

Make sure you can access your **Azuracast** Instance and the **React UI** via http:// before running **Certbot**.

I personally use Nginx to differenciate web services, so i'm using**Nginx Certbot Plugin** for SSL certificates, you can install it with
```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d example.com -d www.example.com -d radio.example.com
```
After doing this you will easily adapt the **React UI** to your own webradio, please report any issues on this repository.




---
## Problems i've encountered you'll probably have too

As said before, i'm using **Nginx** to redirect www.tirnatek.fr and tirnatek.fr to my **React UI** and radio.tirnatek.fr to **Azuracast**. If you install it after **Azuracast** you'll probably see **Nginx** unable to start and here is the solution :

When installing **Azuracast** change http port to something else than 80, else it will make conflict with **Nginx**, i've personnaly used 81. If you change the listen port in **Nginx** config files **Certbot** will be unable to create the certificates.

If you already have installed **Azuracast** run this commands and you'll be able to change it while updating your instance !
```bash
cd /var/azuracast/
./docker.sh update
```

Here is my nginx configuration file before certbot :
```nginx
server {
    listen 80;
    server_name tirnatek.fr www.tirnatek.fr;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
    }
}

server {
    listen 80;
    server_name radio.tirnatek.fr;

    location / {
        proxy_pass http://localhost:81;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
        #Allow to upload files up to 500mo, used for uploading musics on Azuracast Instance.
        client_max_body_size 500m; 
    }
}
```
Make sure to adapt to your case and symlink your file from */etc/nginx/sites-available* to */etc/nginx/sites-enabled*. Check if you can access both via http:// before running **Certbot**.

---
### This is the 2nd version and a major upgrade of a previous project.

Old version : https://github.com/St4lV/tirnatek.github.io

---
