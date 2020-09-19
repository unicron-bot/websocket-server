# WebSocket API Database Server

## License
See [LICENSE](LICENSE)

# Documentation

## Reference

Base URL: `http://localhost:4201/`


## Endpoints

```http
GET /api/guild/:id 
POST /api/guild/:id
DELETE /api/guild/:id
```

```http
GET /api/user/:id
POST /api/user/:id
DELETE /api/user/:id
```

```http
GET /api/member/:guild_id/:member_id
POST /api/member/:guild_id/:member_id
DELETE /api/member/:guild_id/:member_id
```

```http
DELETE /api/members/:guild_id
```