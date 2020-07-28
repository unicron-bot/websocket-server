require('dotenv').config();
const force = true;
require('./admin/').db.sync({ force }).then(() => {
    console.log('Unicron Administrative dropped');
});
require('./users/').db.sync({ force }).then(() => {
    console.log('Users Database dropped');
});
require('./guilds/').db.sync({ force }).then(() => {
    console.log('Guild Database dropped');
});