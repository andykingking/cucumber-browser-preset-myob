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
SELENIUM_DRIVER=chrome yarn run cucumber
SELENIUM_DRIVER=firefox yarn run cucumber
