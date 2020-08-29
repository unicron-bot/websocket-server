import Route from '../classes/Route';
import Server from '../classes/Server';

export default class Members extends Route {
    constructor(server: Server) {
        super(server, '/api/members');
    }
    createRoute() {
        this.router.get('/:guild_id', async (req, res) => {
            try {
                const guild_id = req.params.guild_id;
                if (!guild_id) throw { status: 400, message: 'Missing Parameters' };
                const members = await this.server.db.models.GuildMember.findAll({ where: { guild_id } }).catch((e: any) => { throw e; });
                res.status(200).send(members.map((m: any) => {
                    const { member_id, data } = m.toJSON();
                    return { member_id, data };
                }));
            } catch (e) {
                res.status(400).send(e);
            }
        });
        this.router.delete('/:guild_id', async (req, res) => {
            try {
                const guild_id = req.params.guild_id;
                if (!guild_id) throw { status: 400, message: 'Missing Parameters'};
                const count = await this.server.db.models.GuildMember.destroy({ where: { guild_id }}).catch((e: any) => { throw e; });
                this.server.ws.local.emit('raw', 'memberDeletion', guild_id);
                res.status(200).send({ status: 200, message: `Deleted ${count} member(s) datas from ${guild_id}`});
            } catch (e) {
                res.status(400).send(e);
            }
        });
        return this.router;
    }
}