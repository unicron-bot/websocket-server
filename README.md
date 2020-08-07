# WebSocket API Database Server

## License
See [LICENSE](LICENSE)

# Documentation

## Reference

Base URL: `http://localhost:4201/`


## Endpoints
---
### Guild
```http
GET /api/guild/:id
Accept: application/json
```
```http
POST /api/guild/:id
Content-Type: application/json

{
    ...Guild Properties
}
```
```http
DELETE /api/guild/:id
```
---
### User
```http
GET /api/user/:id
Accept: application/json
```
```http
POST /api/user/:id
Content-Type: application/json

{
    ...User Properties
}
```
```http
DELETE /api/user/:id
```
---
### Tag
```http
GET /api/tag/:guild_id/:name
Accept: application/json
```
```http
POST /api/tag/:guild_id/:name
Content-Type: application/json

{
    ...Tag Properties
}
```
```http
DELETE /api/tag/:guild_id/:name
```
---
### Tags
```http
GET /api/tags/:guild_id
Accept: application/json
```
```http
DELETE /api/tags/:guild_id
```
---
### Member
```http
GET /api/member/:guild_id/:member_id
Accept: application/json
```
```http
POST /api/member/:guild_id/:member_id
Content-type: application/json

{
    ...Member Properties
}
```
```http
DELETE /api/member/:guild_id/:member_id
```
---
### Members
```http
GET /api/members/:guild_id
Accept: application/json
```
```http
DELETE /api/members/:guild_id
```