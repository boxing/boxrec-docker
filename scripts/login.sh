#!/usr/bin/env bash

. ./scripts/helpers.sh
export $(cat .env | xargs)

SERVER=$(echo "http://$URL:$PORT" | sed -e 's/\r//g')

if [ -z $BOXREC_USERNAME ]; then
    echo "BOXREC_USERNAME not set in .env"
    return
fi

if [ -z $BOXREC_PASSWORD ]; then
    echo "BOXREC_PASSWORD not set in .env"
    return
fi

# find and replace Windows carriage returns "\r"
BOXREC_USERNAME=$(echo $BOXREC_USERNAME | sed "s/\r//")
BOXREC_PASSWORD=$(echo $BOXREC_PASSWORD | sed "s/\r//")

# Makes a request to the server with the username and password and assigns these as env vars
RESPONSE=$(curl -d "username=$BOXREC_USERNAME&password=$BOXREC_PASSWORD" -X POST ${SERVER}/login)

if [ -z RESPONSE ]; then
    echo "RESPONSE was empty.  Is the server running?"
    return
fi

export PHPSESSID=$(echo ${RESPONSE} | jq .[0].value)
export REMEMBERME=$(echo ${RESPONSE} | jq .[1].value)

green_text "Successfully logged in!  The following have been assigned to env vars in this window"
echo "PHPSESSID=${PHPSESSID}"
echo "REMEMBERME=${REMEMBERME}" \ &&

echo "Now run $(green_text './scripts/boxer.sh 352')"