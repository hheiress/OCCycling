CREATE TABLE users (
  id       		SERIAL PRIMARY KEY,
  name     		TEXT NOT NULL,
  last_name		TEXT NOT null, 
  passport 		TEXT NOT NULL,
  address   	TEXT NOT NULL,
  gender		TEXT,
  date_birth	DATE NOT NULL,
  nationality	TEXT NOT NULL,
  email			TEXT NOT NULL,
  phone_number	INT NOT NULL,
  status		TEXT NOT NULL
);

CREATE TABLE station (
  id       			SERIAL PRIMARY KEY,
  station_name    	TEXT NOT NULL
);

CREATE TABLE bikes (
  id       			SERIAL PRIMARY KEY,
  model_name    	TEXT NOT NULL,
  status        TEXT NOT NULL,
  entry_date		DATE NOT NULL,
  conditions		TEXT NOT NULL,
  station_id			INT REFERENCES station(id) 
 );

CREATE TABLE rentings (
  id       			SERIAL PRIMARY KEY,
  bike_id		 	INT REFERENCES bikes(id),
  user_id			INT REFERENCES users(id),
  last_name         INT REFERENCES users(id),
  status			TEXT NOT NULL,
  renting_date		TIMESTAMP NOT NULL,
  station_id		INT REFERENCES bikes(id),
  starting_time		INTERVAL NOT NULL,
  conditions_id		INT REFERENCES bikes(id),
  finished_date		TIMESTAMP 
 );

 CREATE TABLE ngo_users (
id       		SERIAL PRIMARY KEY,
user_name     	TEXT NOT NULL,
user_email		TEXT NOT NULL,
user_password	TEXT NOT NULL
);

INSERT INTO users (name, last_name, passport, address, gender, date_birth, nationality, email, phone_number, status) 
VALUES ('Ehsan', 'Abdul', 'H235690L', 'Street Tree 23', 'Male', '1970-06-20', 'Syrian', 'ehsan90@gmail.com', 44590832, 'Active');
INSERT INTO users (name, last_name, passport, address, gender, date_birth, nationality, email, phone_number, status) 
VALUES ('Abel', 'Honks', 'G567623P', 'Street Table 44', 'Male', '1980-10-08', 'Liberia', 'abel_lib@yahoo.com', 33456712, 'Active');
INSERT INTO users (name, last_name, passport, address, gender, date_birth, nationality, email, phone_number, status) 
VALUES ('Miray', 'Demir', 'TK239445J', 'AV. Rome 56', 'Female', '1994-05-13', 'Turkey', 'miraydream@yahoo.com', 77234509, 'Active');
INSERT INTO users (name, last_name, passport, address, gender, date_birth, nationality, email, phone_number, status) 
VALUES ('Alberto', 'Lopez', 'V228946K', 'Street Rose', 'Male', '1989-02-23', 'Venezuela', 'lopez10@gmail.com', 32568901, 'Banned');


INSERT INTO station (station_name) VALUES ('Camp');
INSERT INTO station (station_name) VALUES ('Polikastro');

INSERT INTO bikes (model_name, status, entry_date, conditions, station_id) VALUES ('Decathlon', 'Unavailable', '2018-03-10', 'Change brakes', 2 );
INSERT INTO bikes (model_name, status, entry_date, conditions, station_id) VALUES ('Trek', 'Unavailable','2020-03-20', 'New', 1);
INSERT INTO bikes (model_name, status, entry_date, conditions, station_id) VALUES ('Apache', 'Unavailable', '2015-10-16', 'flat tire', 2);
INSERT INTO bikes (model_name, status, entry_date, conditions, station_id) VALUES ('Vento', 'Available', '2016-11-04', 'Good', 1);

INSERT INTO rentings (bike_id, user_id, last_name, status, renting_date, station_id, starting_time, conditions_id, finished_date) VALUES (2, 3, 3, 'Rent finished', '2021-05-09 10:12:06', 2, '04:00:00', 2, '2021-05-10 13:02:15');
INSERT INTO rentings (bike_id, user_id, last_name, status, renting_date, station_id, starting_time, conditions_id, finished_date) VALUES (1, 2, 2, 'Rent finished', '2021-05-11 14:22:11', 1, '04:00:00', 1, '2021-05-11 18:23:41');
INSERT INTO rentings (bike_id, user_id, last_name, status, renting_date, station_id, starting_time, conditions_id, finished_date) VALUES (3, 1, 1, 'Rent finished', '2021-05-09 09:42:10', 3, '04:00:00', 3, '2021-05-09 14:22:11');

INSERT INTO ngo_users (user_name, user_email, user_password) VALUES ('Irene', 'ireneocc@gmail.com', 'igrece4381');

