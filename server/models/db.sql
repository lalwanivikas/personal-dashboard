DROP DATABASE IF EXISTS todos;
CREATE DATABASE todos;

\c todos;

CREATE TABLE items (
  todo_id VARCHAR PRIMARY KEY NOT NULL,
  user_id VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  todo_text VARCHAR NOT NULL,
  todo_status BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP,
  target_date TIMESTAMP
);

CREATE TABLE users (
  user_id VARCHAR PRIMARY KEY NOT NULL,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  password_hash VARCHAR NOT NULL
);

/*
INSERT INTO items (id, category, todo_text, todo_status, created_at)
  VALUES ('41XTDbE', 'misc', 'get shit done', 'FALSE', CURRENT_TIMESTAMP);
*/

/*
- Add user_id

users:
- user id
- name
- email
- password hash
- salt

access_tokens
- user_id
- token
- valid_till

*/
