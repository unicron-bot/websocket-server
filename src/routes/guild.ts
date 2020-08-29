const Route = require('../classes/Route');

class Guild extends Route {
    constructor(server: any) {
        super(server, '/api/guild');
    }
    createRoute() {
        this.router.get('/:id', async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; send: { (arg0: any): void; new(): any; }; }; }) => {
            try {
                const id = req.params.id;
                if (!id) throw { status: 400, message: 'Parameter ID not provided' };
                const guild = await this.server.managers.guild(id).catch((e: any) => { throw e; });
                this.server.ws.local.emit('raw', 'guildUpdate', guild.toJSON());
                res.status(200).json(guild.toJSON());
            } catch (e) {
                res.status(400).send(e);
            }
        });
        this.router.post('/:id', async (req: { params: { id: any; }; body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; send: { (arg0: any): void; new(): any; }; }; }) => {
            try {
                const id = req.params.id;
                const partial = req.body;
                if (!id) throw { status: 400, message: 'Missing Parameter' };
                if (!partial || typeof partial !== 'object') throw { status: 400, message: 'Invalid Body' };
                const guild = await this.server.managers.guild(id).catch((e: any) => { throw e; });
                await guild.update(partial).catch((e: any) => { throw e; });
                await guild.fetch().catch((e: any) => { throw e; });
                this.server.ws.local.emit('raw', 'guildUpdate', guild.toJSON());
                res.status(200).json(guild.toJSON());
            } catch (e) {
                res.status(400).send(e);
            }
        });
        this.router.delete('/:id', async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { status: number; message: string; }): void; new(): any; }; }; }) => {
            try {
                const id = req.params.id;
                if (!id) throw { status: 400, message: 'Missing Parameter'};
                const guild = await this.server.managers.guild(id).catch((e: any) => { throw e; });
                await guild.destroy().catch((e: any) => { throw e; });
                this.server.ws.local.emit('raw', 'guildDelete', id);
                res.status(200).send({ status: 200, message: 'Guild Deleted from the database!'});
            } catch (e) {
                res.status(400).send(e);
            }
        });
        return this.router;
    }
}

module.exports = Guild;