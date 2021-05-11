# NESTJS API TEMPLATE
API template base on `nestjs`.
## Prerequitsite
- nodejs version >= 13.3.0
## Install
1. Set `MYSQL` on local machine using docker. These commands will create `volume-data` and `mysql-server` containers which user for login to database is `root`.
```
mkdir <your-path-volume>
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -v <your-path-volume>:/var/lib/mysql mysql:latest
```
2. Login to database (with default database) and create database with this command
```
CREATE DATABASE nestjs_db_template DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
```
3. Change detail in `local.env`
4. Install dependencies
```
npm install
```
5. Migration database
```
npm run seed:refresh
```
## Run
1. Type command.
```
npm run start:dev
```
Note: Swagger is already setup in this project. You can access it after server be started via `http://localhost:<port>/api`
## Build
1. Declare `NODE_ENV` as environment variable which you want (Default is `local`).
2. Type command.
```
npm run build
npm run start:prod
```
## Configuration
This project has many configuration which be setted through `env` command line (`process.env`) and `dotenv` (can set variable in `.env` file).
**App**
|Configuration|Required|type|Default value|Description|
|-------------|--------|----|-------------|-----------|
|APP_NAME|Yes|string|nestjs-api-template|Application name which be displayed when call route url (`/`)|
|PORT|Yes|3000|number|Port which application be run|
**Database**
|Configuration|Required|type|Default value|Description|
|-------------|--------|----|-------------|-----------|
|DB_TYPE|Yes|string||Dialect of database which use in the system like `mssql`, `mysql`, etc.|
|DB_HOST|Yes|string||URL of database which use in the system|
|DB_PORT|Yes|number||Port of database which use in the system|
|DB_USERNAME|Yes|string||Username of database which use in the system|
|DB_PASSWORD|Yes|string||Password of database which use in the system|
|DB_DATABASE|Yes|string||Name of database which use in the system|
|DB_LOGGING|No|boolean|false|If true, log is shown on console|
**Cache**
|Configuration|Required|type|Default value|Description|
|-------------|--------|----|-------------|-----------|
|ENABLE_CACHE|Yes|boolean|true|If true, responses from `Get` method are cached|
|USE_LOCAL_CACHE|Yes|boolean|true|If true, cache is stored on memory|
|REDIS_HOST|No|string||URL of redis which use in the system. This option is required when `USE_LOCAL_CACHE` value is `false`|
|REDIS_PORT|No|number||Port of redis which use in the system. This option is required when `USE_LOCAL_CACHE` value is `false`|
|REDIS_DB|No|number||Database of redis which use in the system. This option is required when `USE_LOCAL_CACHE` value is `false`|
|REDIS_PASSWORD|No|string||Password of redis which use in the system. This option is required when `USE_LOCAL_CACHE` value is `false`|
|CACHE_TTL|No|number||Time in second unit for keeping data in redis. This option is required when `USE_LOCAL_CACHE` value is `false`|
## Migration
- You can create table in database using these commands.
```
npm run -- migration:generate --name=create-users-table // for creating a users table migration
npm run migrate // for migrating table to the database
npm run migrate:undo // for undo the most recent migration
npm run migrate:refresh  // for droping and re-creating all tables
```

- For seeder, type these commands to seed data to the database.
```
npm run -- seed:generate --name=demo-users // for create a demo user seeder
npm run seed:run // for seeding data to the database
npm run seed:undo // for undo the most recent seeder
npm run seed:undo:all // for undo all seeders
```
