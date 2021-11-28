-- Drop and recreate Users table (Example)

-- DROP TABLE IF EXISTS users CASCADE;
-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(255) NOT NULL
-- );


DROP DATABASE IF EXISTS midterm;

CREATE DATABASE midterm;
\c midterm

DROP TABLE IF EXISTS menu_dishes CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE menu_dishes (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  unit_price INTEGER NOT NULL, -- price in cents
  number_available INTEGER NOT NULL, -- number of dishes available
  restaurant_id INTEGER -- FK
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  menu_items VARCHAR(255) NOT NULL,   -- ARRAY OF ARRAYS [[1,2,3],[2,3,4]] -> [[item_id, qnty, unit_price]]
  item_names VARCHAR(255) NOT NULL,  -- [name of the items ordered]
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(255) NOT NULL,
  total_paid INTEGER NOT NULL,
  start_time TIMESTAMP DEFAULT NOW(),
  end_time TIMESTAMP NOT NULL,
  restaurant_id INTEGER -- FK
);
