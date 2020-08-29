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
                const guild = await this.server.managers.guild(id).catch((e) => { throw e; });
                this.server.ws.local.emit('raw', 'guildUpdate', guild.toJSON());
                res.status(200).json(guild.toJSON());
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
                const guild = await this.server.managers.guild(id).catch((e) => { throw e; });
                await guild.update(partial).catch((e) => { throw e; });
                await guild.fetch().catch((e) => { throw e; });
                this.server.ws.local.emit('raw', 'guildUpdate', guild.toJSON());
                res.status(200).json(guild.toJSON());
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
                const guild = await this.server.managers.guild(id).catch((e) => { throw e; });
                await guild.destroy().catch((e) => { throw e; });
                this.server.ws.local.emit('raw', 'guildDelete', id);
                res.status(200).send({ status: 200, message: 'Guild Deleted from the database!' });
            }
            catch (e) {
                res.status(400).send(e);
            }
        });
        return this.router;
    }
}