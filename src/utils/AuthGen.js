const Base64 = require('./Base64');
const { SHA256 } = require('crypto-js');

/**
 * 
 * @param {string} client_id 
 */
function generate(client_id) {
    return `${Base64.encode(client_id)}.${Base64.encode(SHA256(Math.floor(Math.random() * Date.now()).toString(), client_id))}`;
}

/**
 * 
 * @param {string} key 
 * @returns {Array<string>}
 */
function resolve(key) {
    return key.split('.').map((p) => Base64.decode(p));
}


module.exports = {
    generate,
    resolve,
}
