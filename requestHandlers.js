var querystring = require("querystring");
var url = require("url");
var crypto = require("crypto");
var parseMsgBody = require("./xmlparser").parseMsgBody;
var genResponseBody = require("./xmlparser").genResponseBody;

function handshake(request, response, postData) {
  var query = url.parse(request.url).query;
  var queryDic = querystring.parse(query);

  var signature = queryDic["signature"];
  var timestamp = queryDic["timestamp"];
  var nonce = queryDic["nonce"];
  var echostr = queryDic["echostr"];
  var token = "shsunbing111";
  var tempArr = [token, timestamp, nonce];
  tempArr.sort();
  var tempStr = tempArr[0] + tempArr[1] + tempArr[2];
  console.log(tempStr);

  const hasher = crypto.createHash('sha1');
  hasher.update(tempStr);
  var tempStrSha1 = hasher.digest('hex');
  console.log(tempStrSha1);

  if (tempStrSha1 == signature) {
    if (echostr != undefined) {
      console.log("echostr = " + echostr);
      response.write(echostr);
      response.end();
    }
    else {
      var msgObj = parseMsgBody(postData);
      var me = msgObj.me;
      var client = msgObj.client;
      var d = new Date();
      var createTime = d.getTime() / 1000;
      var msgResponse = {
        "ToUserName": [ client ],
        "FromUserName": [ me ] ,
        "CreateTime": [ createTime.toFixed() ],
        "MsgType": [ "text" ],
        "Content": [ "冰冰！我是智障" ]
      };
      console.log(genResponseBody(msgResponse));
      response.write("");
      response.end();
    }
  }
  else {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("!=");
      response.end();
  }
}

exports.handshake = handshake;
