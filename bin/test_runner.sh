#!/usr/bin/env bash

set -e

function clean_up() {
  TESTS_EXIT_CODE=$?
  echo ">>> Tests complete"

  echo ">>> Stopping servers..."
  npm run stop-servers
  echo ">>> Servers stopped"

  exit $TESTS_EXIT_CODE
}

echo ">>> Starting servers..."
npm run start-servers
echo ">>> Servers started"

trap clean_up EXIT INT TERM

echo ">>> Running tests..."
SELENIUM_DRIVER=chrome npm run cucumber
SELENIUM_DRIVER=firefox npm run cucumber
