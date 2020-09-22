import Route from '../classes/Route';
import Server from '../classes/Server';
import { GuildMember } from '../database';

interface Warning {
    case: number;
    reason: string;
    moderator: string;
    date: string;
}

interface Member {
    member_id: string;
    warnings: Warning[];
    cases: number;
}

export default class MemberRoute extends Route {
    public constructor(server: Server) {
        super(server, '/api/member');
    }
    public createRoute() {
        this.server.app.get('/api/members/:guild_id', async (req, res) => {
            try {
                const guild_id = req.params.guild_id;
                const guild = await GuildMember.findOne({ where: { guild_id } });
                if (!guild) return res.status(200).json([]);
                const payload = guild.getDataValue('data');
                this.server.ws.local.emit('raw', { EVENT: 'MEMBERS', data: { guild_id, members: payload } });
                res.status(200).json(payload);
            } catch (e) {
                this.server.logger.error(e);
                res.status(500).json(e);
            }
        });
        this.server.app.delete('/api/members/:guild_id', async (req, res) => {
            try {
                const guild_id = req.params.guild_id;
                await GuildMember.destroy({ where: { guild_id } });
                this.server.ws.local.emit('raw', { EVENT: 'MEMBERS_DELETE', data: { guild_id } });
                res.status(200).json({ guild_id });
            } catch (e) {
                this.server.logger.error(e);
                res.status(500).json(e);
            }
        });
        this.router.get('/:guild_id/:member_id', async (req, res) => {
            try {
                const guild_id = req.params.guild_id;
                const member_id = req.params.member_id;
                const guild = await GuildMember.findOne({ where: { guild_id } });
                if (!guild) return res.status(200).json({ guild_id, member_id });
                const data: Member[] = guild.getDataValue('data');
                const member = data.find(m => m.member_id === member_id);
                if (!member) return res.status(200).json({ guild_id, member_id });
                const payload = { guild_id, ...member };
                this.server.ws.local.emit('raw', { EVENT: 'MEMBER', data: payload });
                res.status(200).json(payload);
            } catch (e) {
                this.server.logger.error(e);
                res.status(500).json(e);
            }
        });
        this.router.post('/:guild_id/:member_id', async (req, res) => {
            try {
                const guild_id = req.params.guild_id;
                const member_id = req.params.member_id;
                const body = req.body;
                let guild = await GuildMember.findOne({ where: { guild_id } });
                if (!guild) guild = await GuildMember.create({ where: { guild_id } });
                const data: Member[] = guild.getDataValue('data');
                let member = data.find(m => m.member_id === member_id);
                if (!member) member = { member_id, cases: 0, warnings: [] };
                member = { member, ...body };
                await GuildMember.update({ data: data.map(m => m.member_id === member.member_id ? member : m) }, { where: { guild_id } });
                const payload = { guild_id, ...member };
                this.server.ws.local.emit('raw', { EVENT: 'MEMBER', data: payload });
                res.status(200).json(payload);
            } catch (e) {
                this.server.logger.error(e);
                res.status(500).json(e);
            }
        });
        this.router.delete('/:guild_id/:member_id', async (req, res) => {
            try {
                const guild_id = req.params.guild_id;
                const member_id = req.params.member_id;
                const payload = { guild_id, member_id };
                const guild = await GuildMember.findOne({ where: { guild_id } });
                if (!guild) return res.status(200).json(payload);
                const data: Member[] = guild.getDataValue('data');
                const member = data.find(m => m.member_id === member_id);
                if (!member) return res.status(200).json(payload);
                await GuildMember.update({ data: data.filter(m => m.member_id !== member_id) }, { where: { guild_id } });
                this.server.ws.local.emit('raw', { EVENT: 'MEMBER_DELETE', data: payload });
                res.status(200).json(payload);
            } catch (e) {
                this.server.logger.error(e);
                res.status(500).json(e);
            }
        });
        return this.router;
    }
}