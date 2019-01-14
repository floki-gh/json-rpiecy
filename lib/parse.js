const Request = require('./request');
const Response = require('./response');

const parse = function (str) {
  try {
    let parsed = JSON.parse(str);
    return parsed;
  } catch (error) {
    return null;
  }
};

parse.response = function (response) {
  return rpiecy.createResponse(parse(response));
};

parse.request = function (request) {
  return rpiecy.createRequest(parse(request));
};


module.exports = parse;