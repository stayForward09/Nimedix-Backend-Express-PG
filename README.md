

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

3.servieces_offered Table:
      CREATE TABLE nimedix_services_offered (  
         id uuid DEFAULT uuid_generate_v4 (),    
         service_name VARCHAR, 
         service_detail VARCHAR,
         service_img VARCHAR,
         PRIMARY KEY (id)  
      );  

      INSERT INTO nimedix_services_offered(service_name, service_detail, service_img) VALUES ($1, $2, $3)
4.appointments Table:
      CREATE TABLE nimedix_appointments (  
         id uuid DEFAULT uuid_generate_v4 (),    
         owner_email VARCHAR, 
         partner_email VARCHAR,
         partner_name VARCHAR,
         type VARCHAR, 
         time TIMESTAMP,
         duration int8,
         PRIMARY KEY (id)  
      );  

      INSERT INTO nimedix_appointments(owner_email, partner_email, partner_name,type,time, duration) VALUES ($1, $2, $3,$4, $5, $6)

5.vitals Table:
      CREATE TABLE nimedix_vitals (  
         id uuid DEFAULT uuid_generate_v4 (),    
         email VARCHAR, 
         heartRate int8,
         O2Saturation int8,
         respirationRate int8, 
         bodyTemp int8,
         bloodSugar int8,
         takeMedicine timestamp,
         status bool DEFAULT false,
         PRIMARY KEY (id)  
      );  

      INSERT INTO nimedix_vitals(email, heartRate, O2Saturation,respirationRate,bodyTemp, bloodSugar) VALUES ($1, $2, $3,$4, $5, $6)

6.messages Table:
      CREATE TABLE nimedix_messages (  
         id uuid DEFAULT uuid_generate_v4 (),    
         sender VARCHAR, 
         recipiant VARCHAR,
         content VARCHAR,
         date timestamp,
         is_read BOOL,
         is_delete BOOL,
         updated_date timestamp,
         quote_message_id VARCHAR,
         quote_message_name VARCHAR,
         quote_message_date VARCHAR,
         quote_message_body VARCHAR,
         PRIMARY KEY (id)  
      );  

7.conversations Table:
      CREATE TABLE nimedix_conversations (  
         id uuid DEFAULT uuid_generate_v4 (),  
         sender VARCHAR,
         recipient VARCHAR,
         last_msg VARCHAR,
         date timestamp,        
         PRIMARY KEY (id)  
      );  
8.assets Table: 
      CREATE TABLE nimedix_assets (  
         id uuid DEFAULT uuid_generate_v4 (),  
         name VARCHAR,
         key VARCHAR,
         date timestamp,    
         mimeType VARCHAR,    
         size int8,
         PRIMARY KEY (id)  
      );  
                     