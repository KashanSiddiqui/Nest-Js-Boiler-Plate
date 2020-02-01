<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>

## Description
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
Node js boiler plate with login and signup routes and payments gateways. Mongoose database is used for this boiler plate. <br/>

* Functions/Modules 
  - Login/Signup Route and storing data in moongose
  - CRUD function route with monodb 
  - Send Email Function using nodemailer
  - Stripe Payment Method
  - Paypal Payment Method
  - Currency conversion (By Rapid Api)
  - Crypto to fiat conversion (Kraken)
 
 Few keys that needed to be updated. Create config.json and .env file and update things that are mentioned below

* Updates Required
  - Update JWT secret key in .env file for encryption and generation of token
  - Update mongoose private key in config.json file 
  - Update Stripe secret key  in .env file 
  - Update email and password for sender email
  - Update paypal secrets keys in paypal services file
  - Update Rapid api and kraken keys in kraken services file 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```



## License

  Nest is [MIT licensed](LICENSE).
