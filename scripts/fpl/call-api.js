"use strict";

// npm modules
const rp = require("request-promise");

const headerFields = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/" +
    "537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36"
};

/**
 * This function sets the uri of the options object with the required
 * uri and then return a json response or an error.
 * @param { Object } p
 * @param { string } p.uri
 * @param { Object.<string, string> } [p.qS]
 * @param { boolean } [p.logging] - default true
 * @return { Promise<T> }
 * @template T
 */
async function fetchFromAPI({ uri, qS = {}, logging = true }) {
  if (logging) {
    console.log(`Requesting: ${uri}\n    With qS: ${JSON.stringify(qS)}`);
  }

  // set options for request
  const rpOptions = {
    uri: uri,
    qs: qS,
    headers: headerFields,
    json: true // automatically parses the JSON string in the response
  };

  // hit API
  let data;
  try {
    data = await rp(rpOptions);
  } catch (e) {
    return e;
  }
  return data;
}

module.exports = fetchFromAPI;
