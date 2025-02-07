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

4- add .env file and copy variables from .env.example

5- set database user name and password

6- run database migration to create tables

```bash
$ npm run m:run
```

7- start app

```bash
$ npm run start
```

## Example CURL requests

1- create user

```
curl --location 'localhost:8080/api/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"test",
    "email":"test@gmail.com",
    "birthDate":"1994-11-25"
}'
```

2- Top Up

```
curl --location 'localhost:8080/api/users/{id}/top-up' \
--header 'Content-Type: application/json' \
--data '{
    "reference":"1234",
    "amount":2.33
}'

```

2- Charge

```
curl --location 'localhost:8080/api/users/{id}/charge' \
--header 'Content-Type: application/json' \
--data '{
    "reference":"12345",
    "amount":2.33
}'

```
