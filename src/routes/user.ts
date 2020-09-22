import Route from '../classes/Route';
import Server from '../classes/Server';
import { User } from '../database';

export default class UserRoute extends Route {
    public constructor(server: Server) {
        super(server, '/api/user')
    }
    public createRoute() {
        this.router.get('/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const user = await User.findOne({ where: { id } });
                if (!user) return res.status(200).json({ id });
                const payload = user.toJSON();
                this.server.ws.local.emit('raw', { EVENT: 'USER', data: payload });
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
                let user = await User.findOne({ where: { id } });
                if (!user) user = await User.create({ id });
                await User.update(body, { where: { id } });
                const raw = await User.findOne({ where: { id } });
                const payload = raw.toJSON();
                this.server.ws.local.emit('raw', { EVENT: 'USER', data: payload });
                res.status(200).json(payload);
            } catch (e) {
                this.server.logger.error(e);
                res.status(500).json(e);
            }
        });
        this.router.delete('/:id', async (req, res) => {
            try {
                const id = req.params.id;
                await User.destroy({ where: { id } });
                this.server.ws.local.emit('raw', { EVENT: 'USER_DELETE', data: { id } });
                res.status(200).json({ id });
            } catch (e) {
                this.server.logger.error(e);
                res.status(500).json(e);
            }
        });
        return this.router;
    }
}