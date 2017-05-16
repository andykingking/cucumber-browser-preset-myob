#!/usr/bin/env bash

set -e

function wait_until_responding() {
  echo ">>> Waiting for a response from $1"
  MAX_RETRY_ATTEMPTS=120
  for i in $(seq 1 "$MAX_RETRY_ATTEMPTS"); do
    RESPONSE="$(curl --silent "$1")" || true
    if [ -n "$RESPONSE" ] && ([ -z "$2" ] || [ "$RESPONSE" = "$2" ]); then
      echo "$1 responded"
      break
    else
      if [ "$i" -eq "$MAX_RETRY_ATTEMPTS" ]; then
        echo "No response from $1"
        exit 1
      fi
      printf '.'
      sleep 0.1
    fi
  done
}

docker-compose up --build --force-recreate -d

wait_until_responding http://localhost:3000
wait_until_responding http://localhost:5000/http_stub/status Initialized
