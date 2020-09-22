import Route from '../classes/Route';
import Server from '../classes/Server';
import { Guild } from '../database';

export default class GuildRoute extends Route {
    public constructor(server: Server) {
        super(server, '/api/guild')
    }
    public createRoute() {
        this.router.get('/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const guild = await Guild.findOne({ where: { id } });
                if (!guild) return res.status(200).json({ id });
                const payload = guild.toJSON();
                this.server.ws.local.emit('raw', { EVENT: 'GUILD', data: payload });
                res.status(200).json(payload);
            } catch (e) {
                this.server.logger.error(e);
                res.status(500).json(e);
            }
        });
        this.router.post('/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const body = req.body;
                let guild = await Guild.findOne({ where: { id } });
                if (!guild) guild = await Guild.create({ id });
                await Guild.update(body, { where: { id } });
                const raw = await Guild.findOne({ where: { id } });
                const payload = raw.toJSON();
                this.server.ws.local.emit('raw', { EVENT: 'GUILD', data: payload });
                res.status(200).json(payload);
            } catch (e) {
                this.server.logger.error(e);
                res.status(500).json(e);
            }
        });
        this.router.delete('/:id', async (req, res) => {
            try {
                const id = req.params.id;
                await Guild.destroy({ where: { id } });
                this.server.ws.local.emit('raw', { EVENT: 'GUILD_DELETE', data: { id } });
                res.status(200).json({ id });
            } catch (e) {
                this.server.logger.error(e);
                res.status(500).json(e);
            }
        });
        return this.router;
    }
}