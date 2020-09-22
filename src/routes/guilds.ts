import Route from '../classes/Route';
import Server from '../classes/Server';
import { Guild } from '../database';

export default class GuildsRoute extends Route {
    public constructor(server: Server) {
        super(server, '/api/guilds');
    }
    public createRoute() {
        this.router.get('/', async (req, res) => {
            try {
                const guilds = await Guild.findAll();
                res.status(200).json(guilds);
            } catch (e) {
                this.server.logger.error(e);
                res.status(500).json(e);
            }
        });
        this.router.delete('/', async (req, res) => {
            try {
                const amount = await Guild.destroy({ where: {} });
                this.server.ws.local.emit('raw', { EVENT: 'GUILDS_DELETE' });
                res.status(200).json({ amount });
            } catch (e) {
                this.server.logger.error(e);
                res.status(500).json(e);
            }
        });
        return this.router;
    }
}