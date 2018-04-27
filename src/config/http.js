import {
    baseUrl
} from './env'
import Vue from 'vue'
import VueResource from 'vue-resource'
export default async(type = 'GET', url = '', data = {}, successCallback, auth = '', file = 'false') => {

    //检测设备是否联网
    if (!navigator.onLine) {
        successCallback({ retCode: 402, retMsg: "设配已断开网络，请检查!" });
        return;

    }

    Vue.use(VueResource);
    type = type.toUpperCase();
    url = baseUrl + url;

    if (auth != '') {
        Vue.http.headers.common['Authorization'] = 'Bearer ' + auth;
    } else {

    }
    if (file == 'false') {
        Vue.http.options.emulateJSON = true;
    } else {
        let fileData = new FormData();
        fileData.append("enctype", "multipart/form-data");
        var map = eval(data);
        for (var key in map) {
            var val = map[key];
            fileData.append(key, val);
        }
        data = fileData;
    }
    if (type == 'POST') {
        try {
            Vue.http.post(url, data).then(function(res) {
                if (res.status == 200) {
                    try {
                        successCallback(JSON.parse(res.bodyText));
                        return;
                    } catch (e) {
                        return;
                    }
                } else if (res.status == 500) {
                    successCallback({ retCode: 500, retMsg: "服务器连接错误" });
                    return;
                }

            }, function(res) {
                if(res.status == 401){
                    successCallback({ retCode: 110001, retMsg: "TOKEN为空" });
                }else if(res.status == 500){
                     successCallback({ retCode: 500, retMsg: "服务器连接错误" });
                }
                else{
                     successCallback({ retCode: 401, retMsg: "服务器错误" });
                }
                return;
            });
        } catch (e) {
            successCallback({ retCode: 401, retMsg: "服务器错误" });
            return;
        }

    }
}
