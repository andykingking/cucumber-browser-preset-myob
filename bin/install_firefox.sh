#!/usr/bin/env bash

set -e

VERSION="50.0.2"

wget https://ftp.mozilla.org/pub/firefox/releases/${VERSION}/mac/en-US/Firefox%20${VERSION}.dmg
FF_DRIVE=$(hdiutil attach "Firefox ${VERSION}.dmg" | grep "/Volumes/Firefox" | cut -f1)
cp -r /Volumes/Firefox/Firefox.app /Applications
hdiutil detach $FF_DRIVE
rm "Firefox ${VERSION}.dmg"
