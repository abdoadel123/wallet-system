## Description

Wallet System APIs

## Project setup

1- install Nestjs

```bash
$ npm i -g @nestjs/cli
```

2- install node modules

```bash
$ npm install
```

3- install postgres database locally using docker compose

update docker compose file to set user name and password

```
- POSTGRES_USER=
- POSTGRES_PASSWORD=
```

then run

```bash
$ docker compose up -d
```

and create database "wallet-system"

4- run database migration to create tables

```bash
$ npm run m:run
```

5- start app

```bash
$ npm run start
```
