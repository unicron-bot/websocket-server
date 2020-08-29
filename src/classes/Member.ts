import Server from './Server';

export default class GuildMember {
    private server: Server;
    private raw: any;
    public id: {};
    constructor(server: Server, id: {}) {
        this.server = server;
        this.raw = null;
        this.id = id;
    }
    fetch(): Promise<GuildMember> {
        return new Promise(async (resolve, reject) => {
            let raw = await this.server.db.models.GuildMember.findOne({ where: this.id }).catch(reject);
            if (!raw) raw = await this.server.db.models.GuildMember.create(this.id).catch(reject);
            this.raw = raw;
            resolve(this);
        })
    }
    destroy(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await this.server.db.models.GuildMember.destroy({ where: this.id }).catch(reject);
            resolve();
        });
    }
    update(payload: {}): Promise<GuildMember> {
        return new Promise(async (resolve, reject) => {
            await this.server.db.models.GuildMember.update(payload, { where: this.id }).catch(reject);
            resolve(this);
        });
    }
    toJSON(): {} {
        const { guild_id, member_id, data } = this.raw.toJSON();
        return guild_id && member_id ? { guild_id, member: { id: member_id, data } } : {};
    }
}