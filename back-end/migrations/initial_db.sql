select datname from pg_database WHERE datname = 'occycling';

drop table if exists bikes;

CREATE TABLE users (
  id       		SERIAL PRIMARY KEY,
  name     		VARCHAR(100) NOT NULL,
  last_name		VARCHAR(100) NOT null, 
  passport 		VARCHAR(22) NOT NULL,
  adress   		VARCHAR(50) NOT NULL,
  gender		VARCHAR(10),
  date_birth	DATE NOT NULL,
  nationality	VARCHAR(20) NOT NULL,
  email			VARCHAR(40) NOT NULL,
  phone_number	INT NOT NULL
);

CREATE TABLE station (
  id       			SERIAL PRIMARY KEY,
  station_name    	VARCHAR(20) NOT NULL
);

CREATE TABLE bikes (
  id       			SERIAL PRIMARY KEY,
  model_name    	VARCHAR(20) NOT NULL,
  entry_date		DATE NOT NULL,
  conditions		VARCHAR(20)NOT NULL
 );

CREATE TABLE rentings (
  id       			SERIAL PRIMARY KEY,
  bike_id		 	INT REFERENCES bikes(id),
  user_id			INT REFERENCES users(id),
  status			VARCHAR(10)NOT NULL,
  renting_date		DATE NOT NULL,
  station_id		INT REFERENCES station(id),
  time_left			TIME,
  conditions_id		INT REFERENCES bikes(id)
 );

INSERT INTO users (name, last_name, passport, adress, gender, date_birth, nationality, email, phone_number) VALUES ('Ehsan', 'Abdul', 'H235690L', 'Street Tree 23', 'Male', '1970-06-20', 'Syrian', 'ehsan90@gmail.com', 44590832);
INSERT INTO users (name, last_name, passport, adress, gender, date_birth, nationality, email, phone_number) VALUES ('Abel', 'Honks', 'G567623P', 'Street Table 44', 'Male', '1980-10-08', 'Liberia', 'abel_lib@yahoo.com', 33456712);
INSERT INTO users (name, last_name, passport, adress, gender, date_birth, nationality, email, phone_number) VALUES ('Miray', 'Demir', 'TK239445J', 'AV. Rome 56', 'Female', '1994-05-13', 'Turkey', 'miraydream@yahoo.com', 77234509);
INSERT INTO users (name, last_name, passport, adress, gender, date_birth, nationality, email, phone_number) VALUES ('Alberto', 'Lopez', 'V228946K', 'Street Rose', 'Male', '1989-02-23', 'Venezuela', 'lopez10@gmail.com', 32568901);

INSERT INTO bikes (model_name, entry_date, conditions) VALUES ('Decathlon', '2018-03-10', 'Change brakes');
INSERT INTO bikes (model_name, entry_date, conditions) VALUES ('Trek', '2020-03-20', 'New');
INSERT INTO bikes (model_name, entry_date, conditions) VALUES ('Apache', '2015-10-16', 'flat tire');

INSERT INTO station (station_name) VALUES ('Camp');
INSERT INTO station (station_name) VALUES ('Polikastro');


INSERT INTO rentings (bike_id, user_id, status, renting_date, station_id, time_left, conditions_id) VALUES (2, 3, 'Active', '2021-01-18', 1, '04:00:00', 2);
INSERT INTO rentings (bike_id, user_id, status, renting_date, station_id, time_left, conditions_id) VALUES (1, 2, 'Active', '2021-01-18', 1, '04:00:00', 1);
INSERT INTO rentings (bike_id, user_id, status, renting_date, station_id, time_left, conditions_id) VALUES (3,1, 'Active', '2021-01-18', 2, '04:00:00', 3);
