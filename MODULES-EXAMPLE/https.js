/*
const { send } = require('./request');
const { read } = require('./response');

function request(url, data) {
    send(url, data);
    return read(data);
}
*/

// Using ECMA6 script module
import { send } from './request.js';
import { read } from './response.js';

function request(url, data) {
    send(url, data);
    return read(data);
}

const responseData = request('https://google.com', 'hello');
console.log(responseData);