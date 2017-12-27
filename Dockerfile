FROM ubuntu:14.04

MAINTAINER nialloc9@gmail.com

RUN apt-get update
RUN apt-get install curl ssh -y
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && apt-get install nodejs -y
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -

# Install Node.js dependencies
RUN npm install

WORKDIR app

ADD . /app