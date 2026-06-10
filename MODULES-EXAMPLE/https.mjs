import { send } from './request.mjs';
import { read } from './response.mjs';

function request(url, data) {
    send(url, data);
    return read(data);
}

const responseData = request('https://google.com', 'hello');
console.log(responseData);