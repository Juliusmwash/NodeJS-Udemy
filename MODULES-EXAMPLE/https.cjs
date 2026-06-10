const { send } = require('./request.cjs');
const { read } = require('./response.cjs');

function request(url, data) {
    send(url, data);
    return read(data);
}

const responseData = request('https://google.com', 'hello');
console.log(responseData);