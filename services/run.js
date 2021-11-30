const randomColor = require('randomcolor');
const { getText, getMood } = require('./ai.js');

(async function() {
    console.log(await getText("interesting", "a250dc2f-e7ef-4ef0-b22d-2f9871e168d6"))
})()

console.log(randomColor())