#!/bin/bash

clear
echo "MERN-SEED Build"
echo ""
echo "1/3 - Initializing..."
rm -rf backend/build
rm -rf frontend/build
rm -rf build
mkdir -p build
mkdir -p build/log
echo "Done"
echo ""
echo "2/3 - Building frontend..."
(cd "frontend/" && yarn build >../build/log/frontend 2>&1)
echo "Done"
echo ""
echo "3/3 - Building backend..."
(cd "backend/" && yarn build >../build/log/backend 2>&1)
echo "Done"
echo ""
echo "Run 'yarn docker:prod'"
echo "Or 'docker-compose -f docker-compose.production.yml up'"
echo "To start the application!"
echo ""
