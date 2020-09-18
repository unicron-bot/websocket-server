import Route from '../classes/Route';
import Server from '../classes/Server';

export default class Guild extends Route {
    constructor(server: Server) {
        super(server, '/api/guild');
    }
    createRoute() {
        this.router.get('/:id', async (req, res) => {
            try {
                const id = req.params.id;
                if (!id)
                    throw { status: 400, message: 'Parameter ID not provided' };
                const guild = await this.server.managers.guild(id);
                this.server.ws.local.emit('raw', 'guildUpdate', guild.toJSON());
                res.sendStatus(200);
            }
            catch (e) {
                res.status(400).send(e);
            }
        });
        this.router.post('/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const partial = req.body;
                if (!id)
                    throw { status: 400, message: 'Missing Parameter' };
                if (!partial || typeof partial !== 'object')
                    throw { status: 400, message: 'Invalid Body' };
                const guild = await this.server.managers.guild(id);
                await guild.update(partial);
                await guild.fetch();
                this.server.ws.local.emit('raw', 'guildUpdate', guild.toJSON());
                res.sendStatus(200);
            }
            catch (e) {
                res.status(400).send(e);
            }
        });
        this.router.delete('/:id', async (req, res) => {
            try {
                const id = req.params.id;
                if (!id)
                    throw { status: 400, message: 'Missing Parameter' };
                const guild = await this.server.managers.guild(id);
                await guild.destroy();
                this.server.ws.local.emit('raw', 'guildDelete', id);
                res.sendStatus(200);
            }
            catch (e) {
                res.status(400).send(e);
            }
        });
        return this.router;
    }
}