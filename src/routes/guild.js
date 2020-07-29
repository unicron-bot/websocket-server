const Route = require('../classes/Route');

class Guild extends Route {
    constructor(server) {
        super(server, '/api/guild');
    }
    createRoute() {
        this.router.get('/:id', (req, res) => {
            try {
                
            } catch (e) {

            }
        });
        this.router.post('/:id', (req, res) => {
            try {

            } catch (e) {

            }
        });
        this.router.put('/:id', (req, res) => {
            try {

            } catch (e) {
                
            }
        });
        this.router.delete('/:id', (req, res) => {
            try {

            } catch (e) {
                
            }
        });
        return this.router;
    }
}

module.exports = Guild;