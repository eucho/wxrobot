var querystring = require("querystring");
var url = require("url");
var crypto = require("crypto");
var parseMsgBody = require("./xmlparser").parseMsgBody;
var genResponseBody = require("./xmlparser").genResponseBody;
var genReplyMessage = require("./messageHandler").genReplyMessage;

function getSignature(queryDic) {
  var timestamp = queryDic["timestamp"];
  var nonce = queryDic["nonce"];
  var token = "shsunbing111";
  var tempArr = [token, timestamp, nonce];
  tempArr.sort();
  var genSignature = tempArr[0] + tempArr[1] + tempArr[2];
  var hasher = crypto.createHash('sha1');
  hasher.update(genSignature);
  var genSignatureSha1 = hasher.digest('hex');
  return genSignatureSha1;
}

function returnEchoStr(response, echoStr) {
  response.write(echostr);
  response.end();
}


function replyMessage(postData, response) {
  var msgObj = parseMsgBody(postData);
  var me = msgObj.me;
  var client = msgObj.client;
  var content = msgObj.content;
  var d = new Date();
  var createTime = d.getTime() / 1000;
  var msgResponse = {
    "ToUserName": [ client ],
    "FromUserName": [ me ] ,
    "CreateTime": [ createTime.toFixed() ],
    "MsgType": [ "text" ],
    "Content": [ genReplyMessage(content) ]
  };
  var responseXml = genResponseBody(msgResponse);
  if (responseXml != null) {
    console.log(responseXml);
    response.write(responseXml);
    response.end();
  }
  else {
    response.write("");
    response.end();
  }
}

function requestHandler(request, response, postData) {
  var query = url.parse(request.url).query;
  var queryDic = querystring.parse(query);

  var signature = queryDic["signature"];
  var genSignature = getSignature(queryDic);

  if (genSignature == signature) {
    if (queryDic["echostr"]) {
      returnEchoStr(response, queryDic["echostr"]);
    }
    else {
      replyMessage(postData, response);
    }
  }
  else {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.end();
  }
}

exports.requestHandler = requestHandler;
