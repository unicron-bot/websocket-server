module.exports = {
    /**
     * 
     * @param {string} str 
     */
    encode: function(str) {
        return Buffer.from(str, 'utf-8').toString('base64');
    },
    /**
     * 
     * @param {string} str 
     */
    decode: function(str) {
        return Buffer.from(str, 'base64').toString('utf-8');
    }
}