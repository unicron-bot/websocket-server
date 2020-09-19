import Route from '../classes/Route';
import Server from '../classes/Server';
import { User } from '../database';

export default class UsersRoute extends Route {
    public constructor(server: Server) {
        super(server, '/api/users');
    }
    public createRoute() {
        this.router.get('/', async (req, res) => {
            try {
                const users = await User.findAll();
                res.status(200).json(users);
            } catch (e) {
                this.server.logger.error(e);
                res.status(500).json(e);
            }
        });
        this.router.delete('/', async (req, res) => {
            try {
                const amount = await User.destroy();
                this.server.ws.local.emit('raw', 'usersDelete');
                res.status(200).json({ amount });
            } catch (e) {
                this.server.logger.error(e);
                res.status(500).json(e);
            }
        });
        return this.router;
    }
}