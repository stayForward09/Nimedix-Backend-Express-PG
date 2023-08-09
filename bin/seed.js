const pool = require('../database/pool')

const userQuery = `CREATE TABLE IF NOT EXISTS nimedix_user (  
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
)`;

const emailOTPQuery = `CREATE TABLE IF NOT EXISTS nimedix_email_otp (  
  id uuid DEFAULT uuid_generate_v4 (),    
  email VARCHAR NOT NULL,  
  code int8 ,  
  created_at TIMESTAMP DEFAULT now(),
  status VARCHAR,
  PRIMARY KEY (id)  
)`;

const waitlistQuery = `CREATE TABLE IF NOT EXISTS nimedix_waitlist (
  id uuid DEFAULT uuid_generate_v4 (),
  email VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  PRIMARY KEY (id)
)`;

const seed = async () => {
  console.log('Create seed tables...')
  await pool.query(userQuery);
  await pool.query(emailOTPQuery);
  await pool.query(waitlistQuery);
}

seed()