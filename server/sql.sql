SET NAMES UTF8;
DROP DATABASE IF EXISTS nodeserver; 
CREATE DATABASE nodeserver CHARSET = UTF8; 
USE nodeserver; 
CREATE TABLE user_list (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(32),
  password VARCHAR(32)
);

INSERT INTO user_list VALUES 
(NULL, 'admin', 'hefeng6500');