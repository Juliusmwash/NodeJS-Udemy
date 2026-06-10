function decrypt(data) {
    return `decrypted ${data}`;
}
/*
function read() {
    return decrypt('data');
}

module.exports = {
    read,
};
*/

// Use EMA6 script modules
export function read() {
    return decrypt('data');
}