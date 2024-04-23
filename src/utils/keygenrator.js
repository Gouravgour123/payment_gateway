const crypto = require('crypto');

function generateSecrets() {
    const key = crypto.randomBytes(16).toString('hex');
    const encryptionIV = crypto.randomBytes(8).toString('hex');
    return { key, encryptionIV };
}

module.exports={generateSecrets}