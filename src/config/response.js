import { MessageBox } from 'mint-ui';

const RESPONSE_NULL_REALNAME = '真实姓名不能为空'
const RESPONSE_NULL_USERNAME = '用户名不能为空'
const RESPONSE_NULL_EMAIL = '电子邮箱不能为空'
const RESPONSE_ERROR_EMAIL = '电子邮箱格式不正确'
const RESPONSE_NULL_USER_SPELL = '姓的拼音不能为空'
const RESPONSE_NULL_NAME_SPELL = '名的拼音不能为空'
const RESPONSE_NULL_IDCARDNO = '身份证号码不能为空'
const RESPONSE_ERROR_IDCARDNO = '身份证号码格式不正确'
const RESPONSE_NULL_IDCARDADDR = '身份证地址不能为空'
const RESPONSE_ERROR_IDCARDADDR = '身份证地址格式不正确'
const RESPONSE_NULL_ADDRESS = '永久居住地址不能为空'
const RESPONSE_ERROR_SYSTEM = '服务器错误'
const RESPONSE_SUCCESS = '请求成功'
const RESPONSE_NULL_PASSWORD = '密码不能为空'
const RESPONSE_ERROR_PASSWORD = '密码必须为6到18位字母和数字'
const RESPONSE_NULL_REPASSWORD = '确认密码不能为空'
const RESPONSE_ERROR_REPASSWORD = '确认密码必须为6到18位字母和数字'
const RESPONSE_NULL_CODE = '验证码不能为空'
const RESPONSE_ERROR_CODE = '验证码长度必须为6位'

const RESPONSE_CODE_ERROR_TOKEN = 110001 //token失效
const RESPONSE_CODE_ERROR_ILLEGAL = 110000 //非法操作
const RESPONSE_CODE_ERROR_PARAM = 100001 //参数错误
const RESPONSE_CODE_ERROR_SYSTEM = 401 //服务器错误
const RESPONSE_CODE_ERROR_NETWORK = 402 //设配未联网
const RESPONSE_CODE_ERROR_AUTH = 403 //token为空
const RESPONSE_CODE_SUCCESS = 0 //请求成功
const RESPONSE_CODE_ERROR_DATA = 1 //获取数据失败
const RESPONSE_CODE_ERROR_SYSTEM_CONNECT = 500 //服务器链接错误


/**
 * 判断返回结果是否成功
 */

var responseResult = function(handle, ret, tokene = null, tokeni = null) {
    if (!ret) {
        return;
    }
    switch (ret.retCode) {
        case 0:
            return '';
            break;
        case RESPONSE_CODE_ERROR_TOKEN:
            if (tokene == 1) {
                handle.$router.replace({ path: '/login' });
                return;
            } else if (tokene == 2) {
                return RESPONSE_CODE_ERROR_DATA;
            } else if (tokene == 3) {
                handle.$router.push({ path: '/login' });
                handle.$router.go(1);
                return;
            }
            return RESPONSE_CODE_ERROR_TOKEN;
            break;
        case RESPONSE_CODE_ERROR_ILLEGAL:
            if (tokeni == 1) {
                handle.$router.replace({ path: '/login' });
            } else if (tokeni == 2) {
                return RESPONSE_CODE_ERROR_DATA;
            } else if (tokeni == 3) {
                handle.$router.push({ path: '/login' });
                handle.$router.go(1);
                return;
            }
            return RESPONSE_CODE_ERROR_ILLEGAL;
            break;
        case RESPONSE_CODE_ERROR_PARAM:

            return ret.retMsg;
            break;
        case RESPONSE_CODE_ERROR_SYSTEM:

            return RESPONSE_CODE_ERROR_SYSTEM;
            break;
        case RESPONSE_CODE_ERROR_NETWORK:

            return RESPONSE_CODE_ERROR_DATA;
            break;
        case RESPONSE_CODE_ERROR_SYSTEM_CONNECT:
            MessageBox('提示', RESPONSE_ERROR_SYSTEM+"(500)");
            return ;
            break;
        case RESPONSE_CODE_ERROR_AUTH:
            if (tokene == 1) {
                handle.$router.replace({ path: '/login' });
                return;
            } else if (tokene == 2) {
                return RESPONSE_CODE_ERROR_DATA;
            } else if (tokene == 3) {
                handle.$router.push({ path: '/login' });
                handle.$router.go(1);
                return;
            }
            return RESPONSE_CODE_ERROR_TOKEN;
            break;
        default:
            return RESPONSE_CODE_ERROR_DATA;
            break;
    }
    return 401;
};


/**
 * 判断真实姓名是否符合规则
 */

var responseRealName = function(realName) {
    if (!realName) {
        return RESPONSE_NULL_REALNAME;
    }

    return '';
};

/**
 * 判断邮箱是否符合规则
 */

var responseEmail = function(email) {
    if (!email) {
        return RESPONSE_NULL_EMAIL;
    }
    //对电子邮件的验证
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!myreg.test(email)) {
        return RESPONSE_ERROR_EMAIL;
    };

    return '';
};

/**
 * 判断姓的拼音是否符合规则
 */

var responseUserSpell = function(name) {
    if (!name) {
        return RESPONSE_NULL_USER_SPELL;
    }
    return '';
};

/**
 * 判断名的拼音是否符合规则
 */

var responseNameSpell = function(name) {
    if (!name) {
        return RESPONSE_NULL_NAME_SPELL;
    }
    return '';
};

/**
 * 判断身份证号码是否符合规则
 */

var responseIdCardNo = function(code) {

    if (!code) {
        return RESPONSE_NULL_IDCARDNO;
    }

    // return '';

    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    var tip = "";
    var pass = true;

    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = "身份证号格式错误";
        pass = false;
    } else if (!city[code.substr(0, 2)]) {
        tip = "身份证号格式错误";
        pass = false;
    } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if (parity[sum % 11] != code[17]) {
                tip = "身份证号格式错误";
                pass = false;
            }
        }
    }
    return tip;
};


/**
 * 判断身份证地址是否符合规则
 */

var responseIdCardAddr = function(name) {
    if (!name) {
        return RESPONSE_NULL_IDCARDADDR;
    }

    return '';
};

/**
 * 判断永久居住地址是否符合规则
 */

var responseAddress = function(address) {
    if (!address) {
        return RESPONSE_NULL_ADDRESS;
    }
    return '';
};

var responsePassword = function(password) {
    if (!password) {
        return RESPONSE_NULL_PASSWORD;
    } else if (!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(password)) {
        return RESPONSE_ERROR_PASSWORD;
    } else if (password.length < 6 || password.length > 18) {
        return RESPONSE_ERROR_PASSWORD;
    }

    return '';
}

var responseRePassword = function(password) {
    if (!password) {
        return RESPONSE_NULL_REPASSWORD;
    } else if (!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(password)) {
        return RESPONSE_ERROR_REPASSWORD;
    } else if (password.length < 6 || password.length > 18) {
        return RESPONSE_ERROR_REPASSWORD;
    }
    return '';
}

var responseCode = function(code) {
    if (!code) {
        return RESPONSE_NULL_CODE;
    } else if (code.length != 6) {
        return RESPONSE_ERROR_CODE;
    }
    return '';
}

export { responseRealName, responseEmail, responseResult, responseNameSpell, responseIdCardNo, responseIdCardAddr, responseUserSpell, responseAddress, responsePassword, responseRePassword, responseCode, RESPONSE_CODE_ERROR_DATA, RESPONSE_CODE_SUCCESS, RESPONSE_CODE_ERROR_SYSTEM, RESPONSE_CODE_ERROR_TOKEN }
