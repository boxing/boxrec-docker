# BoxRec Docker

The point of this project is to extend the [boxrec](https://github.com/boxing/boxrec) project written in Javascript (NodeJS) to 
all languages.  This projects takes the [boxrec](https://github.com/boxing/boxrec) NPM package and dockerizes it by 
running a [NestJS](https://nestjs.com/) web server

## Installation

-   Install [Docker](https://www.docker.com/)

## Quick Start

Fill out the `.env` file before proceeding.  `.env.example` is a template that can be copied over

The following builds the docker image and runs it inside a container.  Substitute the `8080` with the `PORT` in `.env`

-   `docker build -t "boxing/boxrec-docker" .`
-   `docker run -p 8080:8080 boxing/boxrec-docker`

## Testing that it is working

### Install

-   bash
-   curl
-   [jq](https://stedolan.github.io/jq/download/)

### Run

-   `cp .env.example .env`
-   `source ./scripts/login.sh`

This logs into BoxRec and sets the `PHPSESSID` and `REMEMBERME` token for that terminal/window.
You should see a message that says "Successfully logged in!"

-   `./scripts/boxer.sh 352`

This calls the server to retrieve the boxer profile.  You can substitute the `352` with any boxer on BoxRec

You should receive a JSON object with the boxer data.  If you have, everything is working!

## Note
Not affiliated with the website [BoxRec](http://www.boxrec.com)
