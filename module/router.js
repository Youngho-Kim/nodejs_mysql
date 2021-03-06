var error = require("../error");
var bbs = require("../bbs");
var user = require("../user");
// request 를 분석해서 요청 url에 대한 연결
// url 을 분석
exports.parse = function (request, response){
    var path = splitQuerystring(request.url);
    if(path == "/bbs"){
        parseMethod(bbs, request, response);
    } else if(path == "/user"){
        parseMethod(user, request, response);
    } else {
        error.send(response, 404);
    }
};

// http 메서드를 분석
function parseMethod(module, request, response){
    if(request.method == "POST"){
        module.write();
    }else if(request.method == "GET"){
        module.read();
    }else if(request.method == "PUT"){
        module.update();
    }else if(request.method == "DELETE"){
        module.delete();
    }
}
// http://localhost          /bbs?title=서초구
function splitQuerystring(fullUrl){
    var position = fullUrl.indexOf('?'); // ?의 위치값을 반환. 없으면 -1
    if(position == -1){
        return fullUrl;
    }else{
        return fullUrl.substring(0, position);
    }
}