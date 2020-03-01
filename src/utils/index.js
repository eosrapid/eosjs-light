
function arrayToHex(arr) {
  var outputArr = [];
  var len = arr.length,
    i = 0;
  for (i = 0; i < len; i++) {
    outputArr[i] = arr[i] >= 0x10 ? arr[i].toString(16) : ("0" + arr[i].toString(16));
  }
  return outputArr.join("");
}

function getRpcErrorMsg(p) {
  if (p.error && p.error.details && p.error.details[0] && p.error.details[0].message) {
    return p.error.details[0].message;
  } else if (p.processed && p.processed.except && p.processed.except.message) {
    return p.processed.except.message;
  } else {
    return p.message;
  }
}
function RpcError(p) {
  var err = new Error();
  err._is_eos_rpc_error = true;
}

function isRpcError(err) {
  return err._is_eos_rpc_error === true;
}

function ifUndefX(v, x) {
  return typeof v==='undefined'?x:v;
}
function processCbEos(text, callback) {
    var respObj = null;
    try {
      respObj = JSON.parse(text);
    } catch (errJson) {
      return callback(null, errJson);
    }
    if (respObj && typeof respObj === 'object' && respObj.processed && respObj.processed.except) {
      return callback(RpcError(getRpcErrorMsg(respObj)));
    } else {
      return callback(null, respObj);
    }

}
function sendReq(url, jsonBody, callback, options) {
  options = options || {};


  var xhr = new XMLHttpRequest();
  xhr.onload = function (e) {
    processCbEos(e.responseText, callback);
  };
  xhr.onerror = function (e) {
    callback(e);
  };
  xhr.open("POST", url, true);
  xhr.send(jsonBody == null ? null : JSON.stringify(jsonBody));
  return xhr;
}

function sendReqPromise(url, jsonBody, options) {
  if(options.fetch){
    return options.fetch(url, {
      body: jsonBody == null ? '{}' : JSON.stringify(jsonBody),
      method: 'POST',
    })
    .then(r=>r.json())
    .then(json=>{
      if (json && json.processed && json.processed.except) {
        throw RpcError(getRpcErrorMsg(json))
      }
      return json;
    })
  }
  return new Promise(function (resolve, reject) {
    sendReq(url, jsonBody, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    }, options);
  })
}


export {
  arrayToHex,
  getRpcErrorMsg,
  isRpcError,
  RpcError,
  ifUndefX,
  sendReq,
  sendReqPromise,

}