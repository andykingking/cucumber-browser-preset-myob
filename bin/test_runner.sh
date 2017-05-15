#!/usr/bin/env bash

set -e

function clean_up() {
  TESTS_EXIT_CODE=$?
  echo ">>> Tests complete"

  echo ">>> Stopping servers..."
  yarn run stop-servers
  echo ">>> Servers stopped"

  exit $TESTS_EXIT_CODE
}

function wait_until_responding() {
  for i in $(seq 1 600); do
    if nc -z $1 $2; then
      break
    else
      sleep 0.1
    fi
  done
}

echo ">>> Starting servers..."
yarn run start-servers
wait_until_responding localhost 3000
wait_until_responding localhost 5000
echo ">>> Servers started"

trap clean_up EXIT INT TERM

echo ">>> Running tests..."
SELENIUM_DRIVER=chrome yarn run cucumber
SELENIUM_DRIVER=firefox yarn run cucumber
