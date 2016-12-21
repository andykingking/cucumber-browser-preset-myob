#!/usr/bin/env bash

set -e

if [ -d "node_modules/cucumber-browser-preset-myob" ]; then
  BASE_DIRECTORY="node_modules/cucumber-browser-preset-myob/lib"
else
  BASE_DIRECTORY="lib"
fi

PATH=$PATH:build/install_libraries/bin cucumber-js -f pretty --compiler=js:babel-register --require=${BASE_DIRECTORY}/cucumber --require=${BASE_DIRECTORY}/stepDefinitions "$@"
