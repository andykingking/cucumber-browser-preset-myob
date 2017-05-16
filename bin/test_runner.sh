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

echo ">>> Starting servers..."
yarn run start-servers
echo ">>> Servers started"

trap clean_up EXIT INT TERM

echo ">>> Running tests..."
BROWSER_TYPE=chrome yarn run cucumber
BROWSER_TYPE=firefox yarn run cucumber
