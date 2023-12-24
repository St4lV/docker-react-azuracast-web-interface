#Using another script to unzip and cp to deployement folder.
echo "Starting Docker image & container update script.."
#stopping actual container, name should correspond to name in "docker run" line
docker stop react_radio
#remove container
docker rm react_radio
#remove image with old files
image_id=$(docker images -q "tirnatek-container")

#grab container id 
if [ -n "$image_id" ]; then
    #log success
    echo "'tirnatek-container' ID found : $image_id"
    # delete docker image using ID
    docker rmi "$image_id"
else
    #log error      
    echo "Error: No Such : tirnatek-container"
fi
#build a new image with new files previoulsy imported
# to setup your first installation manually you should run the 2 nexts commands
docker build -t tirnatek-container .
#run docker updated container 
docker run -p 3000:3000 --name react_radio -d tirnatek-container