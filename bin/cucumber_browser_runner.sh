#!/usr/bin/env bash

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && cd .. && pwd)"

if [ "$(basename "$ROOT_DIR")" = "node_modules" ]; then
  ROOT_DIR="$ROOT_DIR/cucumber-browser-preset-myob"
fi

BASE_DIRECTORY="$ROOT_DIR/lib"
LOCAL_PATH="$ROOT_DIR/build/install_libraries/bin:$ROOT_DIR/node_modules/.bin"

PATH="$LOCAL_PATH:$PATH" cucumber-js -f pretty --compiler=js:babel-register --require=${BASE_DIRECTORY}/cucumber --require=${BASE_DIRECTORY}/stepDefinitions "$@"