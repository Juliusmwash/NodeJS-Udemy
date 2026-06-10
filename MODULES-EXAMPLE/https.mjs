import { send } from './internals/request.mjs';
import { read } from './internals/response.mjs';

function request(url, data) {
    send(url, data);
    return read(data);
}

const responseData = request('https://google.com', 'hello');
console.log(responseData);