const { send } = require('./internals/request.cjs');
const { read } = require('./internals/response.cjs');

function request(url, data) {
    send(url, data);
    return read(data);
}

const responseData = request('https://google.com', 'hello');
console.log(responseData);