DROP TABLE IF EXISTS chat;

CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    chat_text VARCHAR NOT NULL,
    first VARCHAR NOT NULL,
    last VARCHAR NOT NULL,
    user_id INT NOT NULL REFERENCES users(id),
    profile_pic VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO chat (chat_text, first, last, user_id, profile_pic)
VALUES ('Fööörst lol', 'Fred', 'Fisher', 4, 'https://s3.amazonaws.com/spicedling/-ClB4WDWVRbizwTSOCD7Eco2FQ422uHe.jpg');

INSERT INTO chat (chat_text, first, last, user_id, profile_pic)
VALUES ('2nd lol', 'Fred', 'Fisher', 4, 'https://s3.amazonaws.com/spicedling/-ClB4WDWVRbizwTSOCD7Eco2FQ422uHe.jpg');

INSERT INTO chat (chat_text, first, last, user_id, profile_pic)
VALUES ('3rd lol', 'Fred', 'Fisher', 4, 'https://s3.amazonaws.com/spicedling/-ClB4WDWVRbizwTSOCD7Eco2FQ422uHe.jpg');

INSERT INTO chat (chat_text, first, last, user_id, profile_pic)
VALUES ('4th lol', 'Fred', 'Fisher', 4, 'https://s3.amazonaws.com/spicedling/-ClB4WDWVRbizwTSOCD7Eco2FQ422uHe.jpg');

INSERT INTO chat (chat_text, first, last, user_id, profile_pic)
VALUES ('5th lol', 'Fred', 'Fisher', 4, 'https://s3.amazonaws.com/spicedling/-ClB4WDWVRbizwTSOCD7Eco2FQ422uHe.jpg');

INSERT INTO chat (chat_text, first, last, user_id, profile_pic)
VALUES ('6th lol', 'Fred', 'Fisher', 4, 'https://s3.amazonaws.com/spicedling/-ClB4WDWVRbizwTSOCD7Eco2FQ422uHe.jpg');

INSERT INTO chat (chat_text, first, last, user_id, profile_pic)
VALUES ('7th lol', 'Fred', 'Fisher', 4, 'https://s3.amazonaws.com/spicedling/-ClB4WDWVRbizwTSOCD7Eco2FQ422uHe.jpg');

INSERT INTO chat (chat_text, first, last, user_id, profile_pic)
VALUES ('8th lol', 'Fred', 'Fisher', 4, 'https://s3.amazonaws.com/spicedling/-ClB4WDWVRbizwTSOCD7Eco2FQ422uHe.jpg');

INSERT INTO chat (chat_text, first, last, user_id, profile_pic)
VALUES ('9th lol', 'Fred', 'Fisher', 4, 'https://s3.amazonaws.com/spicedling/-ClB4WDWVRbizwTSOCD7Eco2FQ422uHe.jpg');

INSERT INTO chat (chat_text, first, last, user_id, profile_pic)
VALUES ('10th lol', 'Fred', 'Fisher', 4, 'https://s3.amazonaws.com/spicedling/-ClB4WDWVRbizwTSOCD7Eco2FQ422uHe.jpg');

INSERT INTO chat (chat_text, first, last, user_id, profile_pic)
VALUES ('11th lol', 'Fred', 'Fisher', 4, 'https://s3.amazonaws.com/spicedling/-ClB4WDWVRbizwTSOCD7Eco2FQ422uHe.jpg');
