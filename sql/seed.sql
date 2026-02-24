INSERT INTO users(email) VALUES
('alice@example.com'),
('bob@example.com');

INSERT INTO sessions(user_id) VALUES (1), (2);
INSERT INTO bets(session_id, amount) VALUES (1, 10.00), (1, 20.00), (2, 5.00);
INSERT INTO wins(bet_id, amount) VALUES (1, 0.00), (2, 40.00), (3, 0.00);
