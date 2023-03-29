#!/bin/bash

cd /var/www

npm install
npm run build
npm start

tail -f /dev/null