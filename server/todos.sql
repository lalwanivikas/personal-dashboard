DROP DATABASE IF EXISTS todos;
CREATE DATABASE todos;

\c todos;

CREATE TABLE items (
  id VARCHAR PRIMARY KEY NOT NULL,
  category VARCHAR NOT NULL NOT NULL,
  todo_text VARCHAR NOT NULL,
  todo_status BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP,
  target_date TIMESTAMP
);

/*
INSERT INTO items (id, category, todo_text, todo_status, created_at)
  VALUES ('41XTDbE', 'misc', 'get shit done', 'FALSE', CURRENT_TIMESTAMP);
*/
