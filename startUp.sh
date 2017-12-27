#!/usr/bin/env bash

if [ ! -d "node_modules" ]; then
        echo "node_modules not found.. installing them now.."
        npm install
fi

if ! grep -Fxq -q "127.0.0.1 dev.titan.co.uk" "/etc/hosts"; then
    echo "adding dev.titan.co.uk to hosts."
    sudo echo "127.0.0.1 dev.apollo.co.uk" >> "/etc/hosts"
fi
echo "Starting apollo at dev.apollo.co.uk"
xdg-open http://dev.apollo.co.uk:3000
docker-compose -f ./docker/development-compose.yml up