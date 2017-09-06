# DynaClub

This is a gamification project where employees reward each other. Wins the employee with more rewards (Dyna money) at the end of a period.

The app is used at [Dynamix Software](http://www.dynamix.com.br)

## Prerequisites

* [NodeJS](https://nodejs.org/en/download/) and [NPM](https://www.npmjs.com/package/download)
* [Redis](https://redis.io/download/)
* [MongoDB](https://www.mongodb.com/download-center)
* [Angular-CLI](https://cli.angular.io/)

## Run Server

With Redis and MongoDB running, check connections configurations in `/server/server.js`

If it's the first time running, you must install the dependencies:
```bash
cd server
npm install
```

To start the Server API:
```bash
cd server
npm start
```

If you want to start with clusters
```bash
cd server
node cluster.js
```

For more info about client build, please check server [README.md](https://github.com/yuribett/DynaClub/blob/master/server/README.md)

## Run Client

If it's the first time running, you must install the dependencies:
```bash
cd client
npm install
```

To start the Server API:
```bash
cd client
ng serve
```

For more info about client build, please check client [README.md](https://github.com/yuribett/DynaClub/blob/master/client/README.md)
