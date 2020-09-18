import Route from '../classes/Route';
import Server from '../classes/Server';

export default class Member extends Route {
    constructor(server: Server) {
        super(server, '/api/member');
    }
    createRoute() {
        this.router.get('/:guild_id/:member_id', async (req, res) => {
            try {
                const guild_id = req.params.guild_id;
                const member_id = req.params.member_id;
                const member = await this.server.managers.member(guild_id, member_id);
                this.server.ws.local.emit('raw', 'memberUpdate', member.toJSON());
                res.sendStatus(200);
            } catch (e) {
                res.status(400).send(e);
            }
        });
        this.router.post('/:guild_id/:member_id', async (req, res) => {
            try {
                const guild_id = req.params.guild_id;
                const member_id = req.params.member_id;
                const partial = req.body;
                if (!partial || typeof partial !== 'object') throw { status: 400, message: 'Invalid Body' };
                const member = await this.server.managers.member(guild_id, member_id);
                await member.update(partial);
                await member.fetch();
                this.server.ws.local.emit('raw', 'memberUpdate', member.toJSON());
                res.sendStatus(200);
            } catch (e) {
                res.status(400).send(e);
            }
        });
        this.router.delete('/:guild_id/:member_id', async (req, res) => {
            try {
                const guild_id = req.params.guild_id;
                const member_id = req.params.member_id;
                const member = await this.server.managers.member(guild_id, member_id);
                await member.destroy();
                this.server.ws.local.emit('raw', 'memberDelete', { guild_id, member_id });
                res.sendStatus(200);
            } catch (e) {
                res.status(400).send(e);
            }
        });
        return this.router;
    }
}