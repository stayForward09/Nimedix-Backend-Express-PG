

##RESTful APIs using Node.js, Express, and Postgresql.

  Plase install Node and Postgresql on your pc.

  Here is the live server for database.

  18.222.194.44:5432

  You can use this database instead of your local database.

  Node version: ^12.x

##Clone the repo:

   git clone https://github.com/NiMEDix-Ecosystem/NiMEDix-Backend

   cd NiMEDix-Backend

##Install dependencies:
   
   npm install

##Table of Contents


##Command
   
   Running locally: 

   ```bash
	  npm run start:dev
   ```
   
    Running in production: 

   ```bash
	  npm run start
   ```
##Environment Variable


##API documentation

  API Endpoints

  List of available routes:

  Auth routes:
	POST /v1/auth/register - register
  	POST /v1/auth/login - login
	POST /v1/auth/refresh-tokens - refresh auth tokens
	POST /v1/auth/forgot-password - send reset password email
	POST /v1/auth/reset-password - reset password
	POST /v1/auth/send-verification-email - send verification email
	POST /v1/auth/verify-email - verify email




