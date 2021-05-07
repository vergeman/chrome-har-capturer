'use strict';

const HAR = require('./lib/har');
const Loader = require('./lib/loader');
const Replay = require('./lib/replay');

function run(urls, options = {}) {
    return new Loader(urls, options);
}

async function fromLog(url, log, options = {}) {
    const replay = new Replay(url, log, options);
    const stats = await replay.load()
          .catch(({err, stats}) => {
              const har = HAR.create([stats]);
              throw {err, har};
          });
    return HAR.create([stats]);
}

module.exports = {run, fromLog};
