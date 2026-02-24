-- 1) Total bet/win per user
SELECT u.id, u.email,
       COALESCE(SUM(b.amount),0) AS total_bet,
       COALESCE(SUM(w.amount),0) AS total_win
FROM users u
LEFT JOIN sessions s ON s.user_id = u.id
LEFT JOIN bets b ON b.session_id = s.id
LEFT JOIN wins w ON w.bet_id = b.id
GROUP BY u.id, u.email;

-- 2) Sessions with no bets
SELECT s.*
FROM sessions s
LEFT JOIN bets b ON b.session_id = s.id
WHERE b.id IS NULL;

-- 3) Duplicate transaction detector (same user/type/amount in 1 minute)
SELECT t1.id AS tx1, t2.id AS tx2, t1.user_id, t1.type, t1.amount
FROM transactions t1
JOIN transactions t2
  ON t1.user_id = t2.user_id
 AND t1.type = t2.type
 AND t1.amount = t2.amount
 AND t1.id < t2.id
 AND ABS(EXTRACT(EPOCH FROM (t1.created_at - t2.created_at))) <= 60;
