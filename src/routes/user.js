
const Route = require('../classes/Route');

class User extends Route {
    constructor(server) {
        super(server, '/api/user');
    }

    createRoute() {
        this.router.get('/:id', (req, res) => {
            try {
                const id = req.params.id;
                const user = await this.server.users.fetch(id, true, true);
                res.status(200).send(user.toJSON());
            } catch (e) {
                res.status(400).json(e);
            }
        });
        this.router.post('/:id', (req, res) => {
            try {
                const id = req.params.id;
                const user = await this.server.users.fetch(id, true, true);
                await user.update(req.body).catch((e) => { throw e; });
                res.status(200).json(user.toJSON());
                this.server.ws.emit('userUpdate', user.toJSON());
            } catch (e) {
                res.status(400).json(e);
            }
        });
        this.router.delete('/:id', (req, res) => {
            try {
                const id = req.params.id;
                const user = await this.server.users.fetch(id);
                user.destroy();
                if (this.server.users.cache.has(id)) this.server.users.cache.delete(id);
                res.status(200).json('done');
                this.server.ws.emit('userDelete', id);
            } catch (e) {
                res.status(400).json(e);
            }
        });
        return this.router;
    }
}

module.exports = User;