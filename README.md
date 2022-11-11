# be_sipendi

## Requirement
- Install yarn
- Install mariadb 10.6.8 or mysql
- [Optional] if you not install mariadb or mysql you can use docker-compose yaml in this project

```bash
  cd docker-compose
  docker-compose -f mariadb.yaml up -d
```

## Installation

Install project with yarn

```bash
  cd sipendi_be
  yarn install
```

## Setup ENV

Copy file .env.example and rename it to .env

## Setup DB


- Run migration to setup tables (directory: src/utils/database/knex/migrations)

```bash
  yarn knex:migrate:latest
```

- Run migration to setup data (directory: src/utils/database/knex/seeds)

```bash
  yarn knex:seed:run
```

## Run project
- Run for development/local

```bash
  yarn dev
```

- Run for deployment

```bash
  yarn build && yarn start
```
    