# slot-machine-cs (client-server skeleton)

## Structure
- `apps/server` - Fastify server (authoritative session+spin endpoints)
- `apps/client` - Vite client consuming server API
- `packages/shared` - shared request/response types

## Run
```bash
cd slot-machine-cs
npm install
npm run dev:server
# in another terminal
npm run dev
```

- Server: http://localhost:8787
- Client: http://localhost:5173

## Current endpoints
- `GET /health`
- `POST /session/init`
- `POST /spin`
