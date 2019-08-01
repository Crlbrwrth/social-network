Create table friends(
id SERIAL PRIMARY KEY,
sender_id INT NOT NULL REFERENCES users(id),
receiver_id INT NOT NULL REFERENCES users(id),
accepted BOOLEAN DEFAULT false);

SELECT * FROM friends;



 -- SELECT * FROM friendships
 -- WHERE (sender_id = $1 AND receiver_id = $2)
 -- OR (sender_id = $2 AND receiver_id = $1);



-- DELETE WHEN FRIENDSHIP IS END
--
--  UPDATE
--
--  INSERT
