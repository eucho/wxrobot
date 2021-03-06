var xml2js = require("xml2js");

function parseMessageBody(bodyXml) {
  var xmlObj;
  xml2js.parseString(bodyXml, function (err, result) {
     xmlObj = result.xml;
  });
  if (xmlObj.MsgType == "text") {
    var parsed = {
        "me": xmlObj.ToUserName[0],
        "client": xmlObj.FromUserName[0],
        "content": xmlObj.Content[0]
    };
    return parsed;
  }
  else {
    return null;
  }
}

function genResponseBody(obj) {
  var builder = new xml2js.Builder( {cdata: true, rootName: "xml", headless: true} );
  var xml = builder.buildObject(obj);
  return xml;
}

exports.parseMsgBody = parseMessageBody;
exports.genResponseBody = genResponseBody;
