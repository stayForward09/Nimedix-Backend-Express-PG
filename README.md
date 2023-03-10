

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






#######TABLE
1.user table:
      CREATE TABLE nimedix_user (  
         user_id uuid DEFAULT uuid_generate_v4 (),  
         email VARCHAR NOT NULL,  
         full_name VARCHAR ,  
         address VARCHAR ,  
         dob VARCHAR, 
         photo VARCHAR,
         user_role VARCHAR, 
         phone_number VARCHAR,
         username VARCHAR NOT NULL,
         pass VARCHAR NOT NULL, 
         wallet_address VARCHAR NOT NULL,
         email_otp BOOLEAN, 
         phone_otp BOOLEAN,
         id_verification BOOLEAN,
         PRIMARY KEY (user_id)  
      );  
2.email_otp Table:
      CREATE TABLE nimedix_email_otp (  
         id uuid DEFAULT uuid_generate_v4 (),    
         email VARCHAR NOT NULL,  
         code int8 ,  
         created_at TIMESTAMP DEFAULT now(),
         status VARCHAR,
         PRIMARY KEY (id)  
      );  