if [ -z "$1" ]; then
  echo "Please provide a port number as the first arg";
  echo "example: kill-port 4200"
  exit 1;
fi
lsof -nti:"$1" | xargs kill -9
