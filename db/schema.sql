DROP DATABASE IF EXISTS friendFinder_db;

CREATE DATABASE friendFinder_db;

USE DATABASE friendFinder_db;

CREATE TABLE IF NOT EXISTS profiles (
   id int(11) AUTO_INCREMENT NOT NULL, 
   name VARCHAR(25) NOT NULL,
   photo VARCHAR(255),
   scores VARCHAR(25),
   PRIMARY KEY (id)
);