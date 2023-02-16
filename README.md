# README

This README would normally document whatever steps are necessary to get the
application up and running.

* System dependencies
  * PostgreSQL, npm

* Configuration
  * create .env file copied form .env.example file and add database name and credentials
  * run bundle exec rake secret and add the generated token as DEVISE_JWT_SECRET_KEY in .env

* Starting App
  * form root directory `$ rails db:setup && $ rails s -p 3001`
  * `$ cd client`
  * `$ npm install`
  * `$ npm start`
