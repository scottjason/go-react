#!/bin/bash

FILE="server/go.mod"
TARGET='github.com/cosmtrek/air'
DOWNLOAD=1

while read -r line
  do
    if [[ "$line" == *"$TARGET"* ]]; then
      DOWNLOAD=0
      break
    fi
done < $FILE

if [ $DOWNLOAD == 1 ]; then
  echo "Downloading github.com/cosmtrek/air"
  curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s
  else 
    echo "github.com/cosmtrek/air already installed"
fi

air -v
