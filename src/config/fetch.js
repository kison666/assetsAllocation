import {
    baseUrl
} from './env'
export default async(type = 'GET', url = '', data = {}, auth = '', file = 'false', method = 'fetch') => {
    type = type.toUpperCase();
    url = baseUrl + url;
    if (type == 'GET') {
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })
        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }
    // let systemVersion = false;
    if (window.fetch && method == 'fetch') {
        let requestConfig = {}
            //用户的auth
        if (auth != '' && file == 'false') {
            requestConfig = {
                // credentials: 'include',
                method: type,
                headers: {
                    "Authorization": "Bearer " + auth,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                mode: "cors",
                // cache: "force-cache"
            }
        } else if (file == 'true') {
            requestConfig = {
                // credentials: 'include',
                method: type,
                headers: {
                    "Authorization": "Bearer " + auth
                },
                mode: "cors",
                // cache: "force-cache"
            }
        } else {
            requestConfig = {
                // credentials: 'include',
                method: type,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                mode: "cors",
                // cache: "force-cache"
            }
        }
        if (type == 'POST') {
            //如果file为true,则切换为上传文件模式
            if (file == 'true') {
                let fileData = new FormData();
                fileData.append("enctype", "multipart/form-data");
                var map = eval(data);
                for (var key in map) {
                    var val = map[key];
                    fileData.append(key, val);
                }
                Object.defineProperty(requestConfig, 'body', {
                    value: fileData
                })
            } else {
                //将json字符砖转换为key=value形式
                let dataStr = '';
                var map = eval(data);
                let length = Object.keys(map).length;
                let count = 1;
                for (var key in map) {
                    var val = map[key];
                    dataStr = dataStr + key + "=" + val;
                    if (count < length) {
                        dataStr = dataStr + '&';
                    }
                    count++;
                }
                Object.defineProperty(requestConfig, 'body', {
                    value: dataStr
                })
            }
        }
        try {
            var response = await fetch(url, requestConfig);
            var responseJson =null;
            if (response.status != 200) {
                return { retCode: 401, retMsg: "服务器错误" };
            } else {
                responseJson = await response.json();
                return responseJson;
            }
        } catch (error) {
            return { retCode: 401, retMsg: "服务器错误" };
            throw new Error(error)
        }
        return responseJson
    } else {
        let requestObj;
        if (window.XMLHttpRequest) {
            requestObj = new XMLHttpRequest();
        } else {
            requestObj = new ActiveXObject;
        }
        let sendData = '';
        if (type == 'POST') {
            //如果file为true,则切换为上传文件模式
            if (file == 'true') {
                let fileData = new FormData();
                fileData.append("enctype", "multipart/form-data");
                var map = eval(data);
                for (var key in map) {
                    var val = map[key];
                    fileData.append(key, val);
                }
                sendData = fileData;
            } else {
                //将json字符砖转换为key=value形式
                let dataStr = '';
                var map = eval(data);
                let length = Object.keys(map).length;
                let count = 1;
                for (var key in map) {
                    var val = map[key];
                    dataStr = dataStr + key + "=" + val;
                    if (count < length) {
                        dataStr = dataStr + '&';
                    }
                    count++;
                }
                sendData = dataStr;
            }
        }
        requestObj.open(type, url, true);
        //用户的auth
        if (auth != '' && file == 'false') {
            requestObj.setRequestHeader("Authorization", "Bearer " + auth);
            requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        } else if (file == 'true') {
            requestObj.setRequestHeader("Authorization", "Bearer " + auth);
        } else {
            requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }
        requestObj.send(sendData);

        if (requestObj.readyState == 4) {
            if (requestObj.status == 200) {
                let obj = requestObj.response;
                if (typeof obj !== 'object') {
                    obj = JSON.parse(obj);
                }
                return obj;
            } else {
                return { retCode: 401, retMsg: "服务器错误" };
                throw new Error(requestObj);
            }
        } else {
            return { retCode: 401, retMsg: "服务器错误" };
            throw new Error(requestObj)
        }


    }
}
