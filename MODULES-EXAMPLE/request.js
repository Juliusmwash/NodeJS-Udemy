function encrypt(data) {
    return 'encrypted data';
}
/*
function send(url, data) {
    const encryptedData = encrypt(data);
    console.log(`sending ${encryptedData} to ${url}`);
}

module.exports = {
    send,
}
*/

// Use EMA6 script modules
export function send(url, data) {
    const encryptedData = encrypt(data);
    console.log(`sending ${encryptedData} to ${url}`);
}