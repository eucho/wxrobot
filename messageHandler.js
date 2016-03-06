function genReplyMessage(incomingContent) {
  if (incomingContent.toLowerCase() === "bing") {
    return "Bing it on!";
  }
  else if (incomingContent.match(/^[0-9]+d[0-9]+$/)) {
    return parseRandom(incomingContent);
  }
  return "妈的智障";
}

function parseRandom(incomingContent) {
  var splitArr = incomingContent.split("d");
  if (splitArr.length !== 2) {
    return "妈的智障";
  }
  var times = splitArr[0];
  var randMax = splitArr[1];
  if (times > 100 || randMax > 10000 || times <= 0 || randMax <= 0) {
    return "妈的智障";
  }

  var sum = Math.ceil(randMax * Math.random());
  var result = sum.toString();
  for (i = 1; i < times; ++i) {
    var randNum = Math.ceil(randMax * Math.random());
    result += " + " + randNum;
    sum += randNum;
  }
  result += " = " + sum;
  return result;
}

exports.genReplyMessage = genReplyMessage;
