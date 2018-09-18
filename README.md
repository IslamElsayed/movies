# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version
  '2.5.1'
* System dependencies
  MySQL, npm

* Configuration
  create .env file copied form .env.example file and add database name and credential
  run bundle exec rake secret and add the generated token as DEVISE_JWT_SECRET_KEY in .env
  $rails db:create & migrate

* Starting App
  form root directory $rails s -p 3001
  $cd client
  $npm install
  $npm start
