import Server from './Server';

export default class User {
    private server: Server;
    public id: string;
    private raw: any;
    constructor(server: Server, id: string) {
        this.server = server;
        this.id = id;
        this.raw = null;
    }
    fetch(): Promise<User> {
        return new Promise(async (resolve, reject) => {
            let raw = await this.server.db.models.User.findOne({ where: { id: this.id } }).catch(reject);
            if (!raw) raw = await this.server.db.models.User.create({ id: this.id }).catch(reject);
            this.raw = raw;
            resolve(this);
        })
    }
    destroy(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await this.server.db.models.User.destroy({ where: { id: this.id } }).catch(reject);
            resolve();
        });
    }
    update(partial: {}): Promise<User> {
        return new Promise(async (resolve, reject) => {
            await this.server.db.models.User.update(partial, { where: { id: this.id } }).catch(reject);
            resolve(this);
        });
    }
    /**
     * @returns {{}}
     */
    toJSON(): {} {
        return this.raw ? this.raw.toJSON() : {};
    }
}