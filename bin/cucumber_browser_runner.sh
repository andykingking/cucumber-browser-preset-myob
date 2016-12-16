#!/usr/bin/env bash

set -e

if [ -d "node_modules/cucumber-browser-preset-myob" ]; then
  AUTOLOAD_DIRECTORY="node_modules/cucumber-browser-preset-myob/lib/cucumber"
else
  AUTOLOAD_DIRECTORY="lib/cucumber"
fi

PATH=$PATH:build/install_libraries/bin cucumber-js -f pretty --compiler=js:babel-register --require=${AUTOLOAD_DIRECTORY} "$@"
