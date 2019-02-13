#!/usr/bin/env bash

if [ $# -eq 0 ]
  then
    echo "No arguments supplied, put a number after calling this command ex. 352"
    exit 1
fi

. ./scripts/helpers.sh
export $(cat .env | xargs)

SERVER=$(echo "http://$URL:$PORT" | sed -e 's/\r//g')

# find and replace Windows carriage returns "\r"
PHPSESSID=$(echo $PHPSESSID | sed "s/\r//")
REMEMBERME=$(echo $REMEMBERME | sed "s/\r//")

# Passed in variable is the BoxRec global ID
BOXER=$1

# Makes a request to the server with the username and password and assigns these as env vars
# RESPONSE=$(curl -d "username=$BOXREC_USERNAME&password=$BOXREC_PASSWORD" -X POST ${SERVER}/login)
RESPONSE=$(curl -v --cookie "PHPSESSID=$PHPSESSID; REMEMBERME=$REMEMBERME" ${SERVER}/boxer/${BOXER})

echo ${RESPONSE}

echo $(green_text "If the following after this worked, it was a success.  Above is the whole JSON output")

echo ${RESPONSE} | jq .name
echo ${RESPONSE} | jq .born
echo ${RESPONSE} | jq .nationality