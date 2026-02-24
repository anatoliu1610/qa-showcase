CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  started_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP
);

CREATE TABLE bets (
  id SERIAL PRIMARY KEY,
  session_id INT NOT NULL REFERENCES sessions(id),
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE wins (
  id SERIAL PRIMARY KEY,
  bet_id INT NOT NULL REFERENCES bets(id),
  amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  type TEXT NOT NULL CHECK (type IN ('deposit','bet','win','withdraw')),
  amount NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
