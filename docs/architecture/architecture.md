# Client-Server Architecture (iGaming example)

## Flow
Browser (HTML5 client) -> API Gateway -> Game Service -> DB -> Logs (ELK/Kibana)

## What QA validates
- Request/response correctness at each boundary
- Session/token behavior
- Error propagation (4xx/5xx)
- Data consistency between API and DB
- Log traceability by request/session id
