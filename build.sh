#!/bin/sh
set -x

rm -rf build
mkdir -p build
cp -r ./server/. ./build/
cp -r dist build 
rm -rf build/.env
rm -rf build/.air.toml
rm -rf build/tmp
