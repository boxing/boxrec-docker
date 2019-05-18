#!/usr/bin/env bash
docker build -t "boxing/boxrec-docker" .
docker run -p 8080:8080 boxing/boxrec-docker