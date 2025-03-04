## Description

Simple restful API system (just Backend, no frontend) to allow users able to CRUD locations.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API description

Endpoints
Method Endpoint -------Description
GET ---/locations -----Get all locations
GET ---/locations/:id -Get a specific location
POST --/locations -----Create a new location
PUT ---/locations/:id -Update a location
DELETE /locations/:id -Delete a location

## Technology:

- Database: PostgreSQL with a Location entity supporting a parent-child hierarchy.
- API: RESTful CRUD using NestJS.
- Validation: DTOs with class-validator.
- Logging: Custom middleware.
- Error Handling: Global exception filter.

## Run on local

Visit API at http://localhost:4000/docs
