!#/bin/bash

docker stop react-radio
docker rm react-radio
docker rmi tirnatek-container
docker build -t tirnatek-container
docker run -p 3000:3000 --name react_radio -d tirnatek-container