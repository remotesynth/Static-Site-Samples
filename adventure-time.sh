#!/bin/bash

JEKYLL_PORT=14000
HARP_PORT=19000
HARP_EJS_PORT=29000
MIDDLEMAN_PORT=14567
WINTERSMITH_PORT=28080
HEXO_PORT=24000
HUGO_PORT=11313

CONTAINER_PREFIX=""
CONTAINER_SUFFIX="-adventuretime"

# TODO Get Hexo and Hugo working and then add them to the list of available sites

banner(){
RED='\033[0;31m'
GRAY='\033[1;30m'
YELLOW='\033[1;33m'
ORANGE='\033[0;33m'
NC='\033[0m' # No Color
echo -e "${RED}A D V E N T U R E\n   ${YELLOW}o${ORANGE}=|${GRAY}=${RED}T${GRAY}==${RED}I${GRAY}==${RED}M${GRAY}==${RED}E${GRAY}>${NC}\n"
}

usage() {
cat << EOF
This is a utility to run the Adventure Time static site examples
from https://github.com/remotesynth/Static-Site-Samples
without needing to install anything locally (except Docker, of course).

Usage: 

  $0 <site>
 
Available sites:
  jekyll
  harp
  harp-ejs
  middleman
  wintersmith

Or run them all simultaneously

  $0 -a

You can destroy a previously created site with
  $0 <site> destroy
or destroy all with:
  $0 -a destroy

EOF
exit 0
}

banner
if [ "$#" -eq 0 ]; then usage; exit;  fi

# Validate Docker is installed and the user has permissions to run it
command -v docker >/dev/null 2>&1 || { echo "You need to install Docker first." >&2; exit 1; }

# Thanks to Dave Dopson at http://stackoverflow.com/a/246128/5026398
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

# TODO: Run rm if container already exists. If already started do nothing

runJekyll() {
  docker build -t jekyll$CONTAINER_SUFFIX $DIR/jekyllsite
  docker run -d --name jekyll$CONTAINER_SUFFIX \
   -v $DIR/jekyllsite:/srv/jekyll \
   -p $JEKYLL_PORT:4000 \
   jekyll$CONTAINER_SUFFIX
}
runJekyllMsg() {
  echo "Jekyll      : http://localhost:$JEKYLL_PORT"
}

runMiddleman(){
  docker build -t middleman$CONTAINER_SUFFIX $DIR/middlemansite
  docker run -d --name middleman$CONTAINER_SUFFIX \
   -v $DIR/middlemansite:/srv/middleman \
   -p $MIDDLEMAN_PORT:4567 \
   middleman$CONTAINER_SUFFIX
}
runMiddlemanMsg() {
  echo "Middleman   : http://localhost:$MIDDLEMAN_PORT"
}

runHarp() {
  docker build -t harp$CONTAINER_SUFFIX $DIR/harpsite
  docker run -d --name harp$CONTAINER_SUFFIX \
   -v $DIR/harpsite:/srv/harp \
   -p $HARP_PORT:9000 \
   harp$CONTAINER_SUFFIX
}
runHarpMsg() { 
  echo "Harp EJS    : http://localhost:$HARP_PORT"
}

runHarpEjs() {
  docker build -t harp-ejs$CONTAINER_SUFFIX $DIR/harpsite_ejs
  docker run -d --name harp-ejs$CONTAINER_SUFFIX \
   -v $DIR/harpsite_ejs:/srv/harp \
   -p $HARP_EJS_PORT:9000 \
   harp-ejs$CONTAINER_SUFFIX
}
runHarpEjsMsg(){
  echo "Harp EJS    : http://localhost:$HARP_EJS_PORT"
}

runWintersmith() {
  docker build -t wintersmith$CONTAINER_SUFFIX $DIR/wintersmithsite
  docker run -d --name wintersmith$CONTAINER_SUFFIX \
   -v $DIR/wintersmithsite:/srv/wintersmith \
   -p $WINTERSMITH_PORT:8080 \
   wintersmith$CONTAINER_SUFFIX
}
runWintersmithMsg(){
  echo "Wintersmith : http://localhost:$WINTERSMITH_PORT"
}

runHexo() {
  docker build -t hexo$CONTAINER_SUFFIX $DIR/hexosite
  docker run -d --name hexo$CONTAINER_SUFFIX \
   -v $DIR/hexosite:/srv/hexo \
   -p $HEXO_PORT:4000 \
   hexo$CONTAINER_SUFFIX
}
runHexoMsg() {
  echo "Hexo        : http://localhost:$HEXO_PORT"
}

runHugo() {
  docker build -t hugo$CONTAINER_SUFFIX $DIR/hugosite
  docker run -d --name hugo$CONTAINER_SUFFIX \
   -v $DIR/hugosite:/srv/hugo \
   -p $HUGO_PORT:1313 \
   hugo$CONTAINER_SUFFIX
}
runHugoMsg() {
  echo "Hugo        : http://localhost:$HUGO_PORT"
}

# Start or destroy all containers if <command> -a
if [ $1 == "-a" ]; then
  if [ "$#" -eq 2 ]; then 
   if [ $2 == "destroy" ]; then  
    docker stop jekyll$CONTAINER_SUFFIX
    docker rm jekyll$CONTAINER_SUFFIX
    docker stop middleman$CONTAINER_SUFFIX
    docker rm middleman$CONTAINER_SUFFIX
    docker stop harp$CONTAINER_SUFFIX
    docker rm harp$CONTAINER_SUFFIX
    docker stop harp-ejs$CONTAINER_SUFFIX
    docker rm harp-ejs$CONTAINER_SUFFIX
    docker stop wintersmith$CONTAINER_SUFFIX
    docker rm wintersmith$CONTAINER_SUFFIX
    #docker stop hexo$CONTAINER_SUFFIX
    #docker rm hexo$CONTAINER_SUFFIX
    #docker stop hugo$CONTAINER_SUFFIX
    #docker rm hugo$CONTAINER_SUFFIX
    echo "All containers are stopped and removed."
    exit
   else
    echo "Unrecognised command $2"
    exit
   fi
  fi
  set -e
  runJekyll
  runMiddleman
  runHarp
  runHarpEjs
  runWintersmith
  #runHexo
  #runHugo
  echo ""
  runJekyllMsg
  runMiddlemanMsg
  runHarpMsg
  runHarpEjsMsg
  runWintersmithMsg
  echo ""
  #runHexoMsg
  #runHugoMsg
  echo "To stop and remove containers run:"
  echo "   $0 $1 destroy"
  exit
fi

# Destroy containers if <command> <site> destroy
if [ "$#" -eq 2 ]; then
  if [ $2 == "destroy" ]; then  
    docker stop $1$CONTAINER_SUFFIX
    docker rm $1$CONTAINER_SUFFIX
    echo "$1 container stopped and removed."
  else
    echo "Unrecognised command $2"
  fi
  exit
fi

# Start an individual site
set -e
if [ $1 == "jekyll" ]; then
  runJekyll
  runJekyllMsg
elif [ $1 == "middleman" ]; then
  runMiddleman
  runMiddlemanMsg
elif [ $1 == "harp" ]; then
  runHarp
  runHarpMsg
elif [ $1 == "harp-ejs" ]; then
  runHarpEjs
  runHarpEjsMsg
elif [ $1 == "wintersmith" ]; then
  runWintersmith
  runWintersmithMsg
elif [ $1 == "hexo" ]; then
  runHexo
  runHexoMsg
elif [ $1 == "hugo" ]; then
  runHugo
  runHugoMsg
else
  echo "No site matching '$1'"
  exit
fi

echo "TIP: Stop and remove containers run:"
echo "   $0 $1 destroy"
