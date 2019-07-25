DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(24) NOT NULL,
    last VARCHAR(24) NOT NULL,
    email VARCHAR(40) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    bio VARCHAR(800),
    profile_pic varchar (200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO users (first, last, email, password, bio) VALUES ('Peter', 'Parker', 'pp@web.de', 'secret', 'I am Peter Schmeter');

SELECT * FROM users;
