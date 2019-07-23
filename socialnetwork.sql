DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(24) NOT NULL,
    last VARCHAR(24) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO users (first, last, email, password) VALUES ('Peter', 'Parker', 'pp@web.de', 'secret');

SELECT * FROM users;
