const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML


async function getText(textprompt, key) {
    deepai.setApiKey(key);
    var resp = await deepai.callStandardApi("text-generator", {
            text: textprompt,
    });
    return resp.output
}

async function getMood(textprompt, key) {
    deepai.setApiKey(key);
    var resp = await deepai.callStandardApi("sentiment-analysis", {
            text: textprompt,
    });
    return resp.output[0].toString()
}


module.exports = { getText, getMood }