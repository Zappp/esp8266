CREATE TABLE sensor_data (id SERIAL PRIMARY KEY, temperature VARCHAR, humidity VARCHAR, pressure VARCHAR, date TIMESTAMPTZ);

INSERT INTO sensor_data(temperature, humidity, pressure, date) VALUES ('21,58', '53,29', '102800', current_timestamp);