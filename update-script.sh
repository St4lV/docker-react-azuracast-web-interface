!#/bin/bash

#Using another script to unzip and cp to deployement folder.

#stopping actual container, name should correspond to name in "docker run" line
docker stop react-radio
#remove container
docker rm react-radio
#remove image with old files
docker rmi tirnatek-container
#build a new image with new files previoulsy imported
# to setup your first installation manually you should run the 2 nexts commands
docker build -t tirnatek-container
#run docker updated container 
docker run -p 3000:3000 --name react_radio -d tirnatek-container