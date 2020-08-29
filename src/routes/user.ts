const Route = require('../classes/Route');

class User extends Route {
    constructor(server: any) {
        super(server, '/api/user');
    }

    createRoute() {
        this.router.get('/:id', async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): void; new(): any; }; }; }) => {
            try {
                const id = req.params.id;
                if (!id) throw { status: 400, message: 'Parameter ID not provided' };
                const user = await this.server.managers.user(id).catch((e: any) => { throw e; });
                this.server.ws.local.emit('raw', 'userUpdate', user.toJSON());
                res.status(200).send(user.toJSON());
            } catch (e) {
                res.status(400).send(e);
            }
        });
        this.router.post('/:id', async (req: { params: { id: any; }; body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): void; new(): any; }; }; }) => {
            try {
                const id = req.params.id;
                const partial = req.body;
                if (!id) throw { status: 400, message: 'Parameter ID not provided' };
                if (!partial || typeof partial !== 'object') throw { status: 400, message: 'Invalid Body' };
                const user = await this.server.managers.user(id, true).catch((e: any) => { throw e; });
                await user.update(partial).catch((e: any) => { throw e; });
                await user.fetch().catch((e: any) => { throw e; });
                this.server.ws.local.emit('raw', 'userUpdate', user.toJSON());
                res.status(200).send(user.toJSON());
            } catch (e) {
                res.status(400).send(e);
            }
        });
        this.router.delete('/:id', async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { status: number; message: string; }): void; new(): any; }; }; }) => {
            try {
                const id = req.params.id;
                if (!id) throw { status: 400, message: 'Parameter ID not provided'};
                const user = await this.server.managers.user(id).catch((e: any) => { throw e; });
                await user.destroy().catch((e: any) => { throw e; });
                this.server.ws.local.emit('raw', 'userDelete', id);
                res.status(200).send({ status: 200, message: 'User Deleted from the database!'});
            } catch (e) {
                res.status(400).send(e);
            }
        });
        return this.router;
    }
}

module.exports = User;