# Kibana (KQL) Queries

## 1) Server errors
status:[500 TO 599]

## 2) Slow API requests
response_time_ms > 1000

## 3) Failed bets
message : "*bet*failed*"

## 4) User/session tracing
user_id : 12345 and session_id : "abc-123"

## 5) Auth failures
status:401 or status:403
