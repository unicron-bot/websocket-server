const Route = require('../classes/Route');

class Member extends Route {
    constructor(server: any) {
        super(server, '/api/member');
    }
    createRoute() {
        this.router.get('/:guild_id/:member_id', async (req: { params: { guild_id: any; member_id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): void; new(): any; }; }; }) => {
            try {
                const guild_id = req.params.guild_id;
                const member_id = req.params.member_id;
                const member = await this.server.managers.member(guild_id, member_id).catch((e: any) => { throw e; });
                this.server.ws.local.emit('raw', 'memberUpdate', member.toJSON());
                res.status(200).send(member.toJSON());
            } catch (e) {
                res.status(400).send(e);
            }
        });
        this.router.post('/:guild_id/:member_id', async (req: { params: { guild_id: any; member_id: any; }; body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): void; new(): any; }; }; }) => {
            try {
                const guild_id = req.params.guild_id;
                const member_id = req.params.member_id;
                const partial = req.body;
                if (!partial || typeof partial !== 'object') throw { status: 400, message: 'Invalid Body' };
                const member = await this.server.managers.member(guild_id, member_id).catch((e: any) => { throw e; });
                await member.update(partial).catch((e: any) => { throw e; });
                await member.fetch().catch((e: any) => { throw e; });
                this.server.ws.local.emit('raw', 'memberUpdate', member.toJSON());
                res.status(200).send(member.toJSON());
            } catch (e) {
                res.status(400).send(e);
            }
        });
        this.router.delete('/:guild_id/:member_id', async (req: { params: { guild_id: any; member_id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { status: number; message: string; }): void; new(): any; }; }; }) => {
            try {
                const guild_id = req.params.guild_id;
                const member_id = req.params.member_id;
                const member = await this.server.managers.member(guild_id, member_id).catch((e: any) => { throw e; });
                await member.destroy().catch((e: any) => { throw e });
                this.server.ws.local.emit('raw', 'memberDelete', { guild_id, member_id });
                res.status(200).send({ status: 200, message: 'Member Deleted from the database!' });
            } catch (e) {
                res.status(400).send(e);
            }
        });
        return this.router;
    }
}

module.exports = Member;