#!/usr/bin/env bash

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && cd .. && pwd)"

if [ "$(basename "$ROOT_DIR")" = "node_modules" ]; then
  ROOT_DIR="$ROOT_DIR/cucumber-browser-preset-myob"
fi

PATH="$ROOT_DIR/node_modules/.bin:$PATH" cucumber-js -f pretty --compiler=js:babel-register --require=${ROOT_DIR}/lib/cucumber --require=${ROOT_DIR}/lib/stepDefinitions "$@"
