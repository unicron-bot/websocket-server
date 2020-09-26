# WebSocket API Database Server

## License
See [LICENSE](LICENSE)

# Documentation

## Installation

It requires Node v14 and above and typescript installed
```sh
npm -v # check if npm is installed
npm install --global typescript # you dont have to do this if you already have it installed
git clone https://github.com/oadpoaw/websocket-server.git
cd websocket-server
npm install # install dependencies
npm run build # to compile typescript to javascript
npm run dbInit # to initialize database
npm run start # to start
```


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
GET /api/members/:guild_id
DELETE /api/members/:guild_id
```

## Events
All events starts at event `raw`

Event Names:
- READY
- GUILD
- GUILD_DELETE
- GUILDS_DELETE
- MEMBERS
- MEMBERS_DELETE
- MEMBER
- MEMBER_DELETE
- USER
- USER_DELETE
- USERS_DELETE

`READY`
```json
{
    "session": "SESSION_ID:USED FOR HTTP REQUEST AUTHORIZATION",
}
```

`GUILD`, `GUILD_DELETE`
```json
{
    "id": "GUILD ID",
    /* ... */
}
```

`GUILDS_DELETE`, `USERS_DELETE` :`none`

`MEMBERS`,
```json
{
    "guild_id": "GUILD_ID",
    "members": [], /* ARRAY OF MEMBERS */
}
```

`MEMBERS_DELETE`
```json
{
    "guild_id": "GUILD_ID",
}
```

`MEMBER`
```json
{
    "guild_id": "GUILD_ID",
    "member_id": "MEMBER_ID",
    "warnings": [], /* ARRAY OF WARNINGS */
    "cases": 0,
}
```

`MEMBER_DELETE`
```json
{
    "guild_id": "GUILD_ID",
    "member_id": "MEMBER_ID",
}
```

`USER`, `USER_DELETE`
```json
{
    "id": "USER_ID",
    /* ... */
}
```
