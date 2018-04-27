import fetch from '../config/fetch'
import http from '../config/http'
import * as market from './tempData/market'
import * as profile from './tempData/profile'
import * as asset from './tempData/asset'
import { getToken } from '../store/store'


/**
 * 创建临时数据
 */
const setpromise = data => {
    return new Promise((resolve, reject) => {
        resolve(data)
    })
}

//编译环境使用真实数据

var mainMarket = () => setpromise(market.mainMarket);
var mainMarketDetail = () => setpromise(market.mainMarketDetail);
// var messageList = () => setpromise(profile.messageList);
// var messageDetail = (mid) => setpromise(profile.messageDetail);
var indexDetail = (mid) => setpromise(market.indexDetail);
var indexData = (mid) => setpromise(market.indexData);
var indexMarketDetail = (mid) => setpromise(market.indexMarketDetail);
var packageMarketDetail = (mid) => setpromise(market.indexMarketDetail);
var assetDetail = (mid) => setpromise(profile.assetDetail);
var assetDetailList = (mid) => setpromise(profile.assetDetailList);
var entrustDetailList = (mid) => setpromise(profile.entrustDetailList);
// var profitDetailList = (mid) => setpromise(profile.profitDetailList);
// var assetPieData = (mid) => setpromise(asset.assetPie);

/**
 * 账号密码登录
 */

// var accountLogin = (username, password) => http('POST', '/user/login', { username, password });

var accountLogin = (username, password, successCallback) => http('POST', '/user/login', { username, password }, successCallback);


/**
 * my/index
 */

var myIndex = (token, successCallback) => http('POST', '/my/test', { token }, successCallback);



/**
 * 获取注册短信验证码
 */
var mobileCode = (phone, successCallback) => http('POST', '/utility/sendtoken', {
    mobile: phone,
    type: 'ib.signup',
    srcType: '2'
}, successCallback);

/**
 * 获取忘记密码短信验证码
 */
var forgetGetMobileCode = (phone, successCallback) => http('POST', '/utility/sendtoken', {
    mobile: phone,
    type: 'trade.findpwd'
}, successCallback);

/**
 * 注册
 */
var register = (mobile, password, confirmPassword, token, invite, successCallback) => http('POST', '/user/sign-up', {
    mobile: mobile,
    password: password,
    confirmPassword: confirmPassword,
    token: token,
    invite: invite
}, successCallback);

/**
 * 忘记密码-验证手机
 */
var forgetVeriftyMobile = (mobile, token, successCallback) => http('POST', '/user/find-pwd', {
    mobile: mobile,
    tokentype: 'trade.findpwd',
    token: token
}, successCallback);

/**
 * 忘记密码-确认密码
 */
var forgetResetPassword = (mobile, password,token, successCallback) => http('POST', '/user/reset-pwd', {
    mobile: mobile,
    password: password,
    token: token
}, successCallback);

/**
 * 注册-选择开户方式
 */
var registerStep0 = (email, ibType, userName, userSpell, nameSpell, successCallback) => http('POST', '/user/info_step0', {
    email: email,
    ibType: ibType,
    userName: userName,
    userSpell: userSpell,
    nameSpell: nameSpell
}, successCallback, getToken());

/**
 * 注册-填写基本资料
 */
var registerStep1 = (email, userName, userSpell, nameSpell, idCardNo, idCardAddress, isSameAddress, permanentAddress, isAmerican, successCallback) => http('POST', '/user/info_step1', {
    email: email,
    userName: userName,
    userSpell: userSpell,
    nameSpell: nameSpell,
    idCardNo: idCardNo,
    idCardAddress: idCardAddress,
    nameSpell: nameSpell,
    idCardNo: idCardNo,
    idCardAddress: idCardAddress,
    isSameAddress: isSameAddress,
    permanentAddress: permanentAddress,
    isAmerican: isAmerican
}, successCallback, getToken());

/**
 * 注册-填写家庭和职业信息
 */
var registerStep2 = (familyCount, marriageInfo, professionType, professionName, isRelative, isDirector, companyAddress, companyName, addressProvince, addressCity, addressArea, successCallback) => http('POST', '/user/info_step2', {
    familyCount: familyCount,
    marriageInfo: marriageInfo,
    professionType: professionType,
    professionName: professionName,
    isRelative: isRelative,
    isDirector: isDirector,
    companyAddress: companyAddress,
    companyName: companyName,
    addressProvince: addressProvince,
    addressCity: addressCity,
    addressArea: addressArea
}, successCallback, getToken()); /**/

/**
 * 注册-资产和交易经验
 */
var registerStep3 = (netAssets, netCurrentAssets, netAnnualIncome, totalAssets, investAim, tradeYears, tradeTimes, knowledgeLevel, isOpenOptionTrade, optionTradeYears, isOpenOtherTrade, hasTwsTradeExperience, successCallback) => http('POST', '/user/info_step3', {
    netAssets: netAssets,
    netCurrentAssets: netCurrentAssets,
    netAnnualIncome: netAnnualIncome,
    totalAssets: totalAssets,
    investAim: investAim,
    tradeYears: tradeYears,
    tradeTimes: tradeTimes,
    knowledgeLevel: knowledgeLevel,
    isOpenOptionTrade: isOpenOptionTrade,
    optionTradeYears: optionTradeYears,
    isOpenOtherTrade: isOpenOtherTrade,
    hasTwsTradeExperience: hasTwsTradeExperience,
}, successCallback, getToken());

/**
 * 注册-协议签署
 */
var registerStep4 = (realName, successCallback) => http('POST', '/user/info_step4', {
    realName: realName
}, successCallback, getToken()); /**/

/**
 * 注册-上传身份证明
 */
var registerStep5 = (imgA, imgB, successCallback) => http('POST', '/user/info_step5', {
    imgA: imgA,
    imgB: imgB,
}, successCallback, getToken(), 'true');

/**
 * 个人中心-账户信息
 */
var profileInfo = (successCallback) => http('POST', '/my/center', {}, successCallback, getToken());


/**
 * 个人中心-消息列表
 */
var messageList = (type, successCallback) => http('POST', '/my/message', { type: type }, successCallback, getToken());

/**
 * 个人中心-消息详情
 */
var messageDetail = (mid, successCallback) => http('POST', '/my/message-detail', { mid: mid }, successCallback, getToken());

/**
 * 个人中心-信息反馈
 */
var feedBack = (type, des, successCallback) => http('POST', '/my/feedback', { type: type, des: des }, successCallback, getToken());

/**
 * 个人中心-设置-退出
 */
var signOut = (successCallback) => http('POST', '/user/logout', {}, successCallback, getToken());

/**
 * 个人中心-风险测评
 */
var riskTest = (question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, successCallback) => http('POST', '/my/risk', { question1: question1, question2: question2, question3: question3, question4: question4, question5: question5, question6: question6, question7: question7, question8: question8, question9: question9, question10: question10 }, successCallback, getToken());

/**
 * 个人中心-风险测评结果
 */
var riskTestResult = (successCallback) => http('POST', '/my/risk-result', {}, successCallback, getToken());


/**
 * 个人中心-基本信息
 */
var baseInfo = (successCallback) => http('POST', '/my/base-info', {}, successCallback, getToken());

/**
 * 个人中心-每日盈亏
 */
var profitDetailList = (type, opType, successCallback) => http('POST', '/my/daily-income', { type: type, opType: opType }, successCallback, getToken());

/**
 * 智能资产-交易界面展示数据
 */
var assetIndex = (opType, successCallback) => http('POST', '/my/index', { opType: opType }, successCallback, getToken());

/**
 * 智能资产-自配交易界面展示数据
 */
var assetDiyIndex = (opType, successCallback) => http('POST', '/my/diy-index', { opType: opType }, successCallback, getToken());

/**
 * 智能资产-饼图数据(用户登录后)
 */
var assetPieData = (type, successCallback) => http('POST', '/profile/get-ring', { type: type }, successCallback, getToken());

/**
 * 智能资产-饼图数据(游客)
 */
var assetPieDataNoToken = (type, successCallback) => http('POST', '/profile/get-standard', { type: type }, successCallback);

/**
 * 智能资产-根据日期获取饼图数据
 */
var assetPieDataByDate = (type, date, successCallback) => http('POST', '/profile/get-ring', { type: type, date: date }, successCallback, getToken());

/**
 * 智能资产-确定选择
 */
var assetAddType = (type, reset = 0, successCallback) => http('POST', '/my/add-type', { type: type, reset: reset }, successCallback, getToken());

/**
 * 智能资产-组合详情
 */
var assetTypeDetail = (type, f, successCallback) => http('POST', '/my/asset-type', { type: type, f: f }, successCallback, getToken());

/**
 * 智能资产-组合详情画图数据
 */
var assetTypeMonth = (type, successCallback) => http('POST', '/my/type-month', { type: type }, successCallback, getToken());

/**
 * 智能资产-获取调仓记录详情
 */
var assetRecordDetail = (type, date, opType, successCallback) => http('POST', '/my/record-detail', { type: type, date: date, opType: opType }, successCallback, getToken());

/**
 * 智能资产-单支FOF买入
 */
var assetSimpleFOFBuy = (fofId, amount, successCallback) => http('POST', '/order/buy-fof', { fofId: fofId, amount: amount }, successCallback, getToken());

/**
 * 智能资产-单支FOF卖出
 */
var assetSimpleFOFSell = (fofId, amount, successCallback) => http('POST', '/order/sell-fof', { fofId: fofId, amount: amount }, successCallback, getToken());
/**
 * 智能资产-一篮子FOF买入
 */
var assetMultiFOFBuy = (list, successCallback) => http('POST', '/order/basket-buy', { list: list }, successCallback, getToken());

/**
 * 智能资产-FOF大类列表
 */
var assetFOFList = (successCallback) => http('POST', '/order/get-fof', {}, successCallback, getToken());

/**
 * 智能资产-检测是否需要实时数据
 */
var checkTrade = (successCallback) => http('POST', '/order/check-trade', {}, successCallback);

/**
 * 智能资产-自配账户饼图
 */
var getFofChart = (successCallback) => http('POST', '/order/fof-chart', {}, successCallback);

/**
 * 发现-新闻列表
 */
var newsList = (page,isRecommend,category,perPage, successCallback) => http('POST', '/research/getnews', { page,isRecommend,category,perPage }, successCallback);


/**
 * 发现-新闻详情
 */
var newsDetail = (id, successCallback) => http('POST', '/research/news-detail', { id }, successCallback);

/**
 * 智能资产-委托订单
 */
var assetOrderList = (orderType, cur, successCallback) => http('POST', '/order/list', { orderType, cur }, successCallback, getToken());

/**
 * 智能资产-日线
 */
var assetFOFDayLine = (fofId, successCallback) => http('POST', '/analyse/day-line', { fofId }, successCallback);

/**
 * 智能资产-周线
 */
var assetFOFWeekLine = (fofId, successCallback) => http('POST', '/analyse/week-line', { fofId }, successCallback);

/**
 * 智能资产-月线
 */
var assetFOFMonthLine = (fofId, successCallback) => http('POST', '/analyse/month-line', { fofId }, successCallback);


/**
 * 主要市场-FOF资产包的静态数据
 */
var mainFOFStaticList = (successCallback) => http('POST', '/order/fof-group', {}, successCallback);


/**
 * 主要市场-FOF资产包的静态数据
 */
var mainIndexStaticList = (successCallback) => http('POST', '/order/index-group', {}, successCallback);


/**
 * 撤单-撤销订单
 */
var orderCancel = (orderId, successCallback) => http('POST', '/order/cancel', { orderId }, successCallback, getToken());


/**
 * 我的实盘-用户开户步骤信息
 */
var profileGetStep = (successCallback) => http('POST', '/user/get-step', {}, successCallback, getToken());


/**
 * 推荐类型-订单列表
 */
var commendOrderList = (type, cur, successCallback) => http('POST', '/my/change-list', { type, cur }, successCallback, getToken());


/**
 * 推荐类型-订单列表
 */
var commendOrderCancel = (id, successCallback) => http('POST', '/my/cancel-order', { id }, successCallback, getToken());

/**
 * 主要市场-全球市场
 */
var mainMainStaticList = (successCallback) => http('POST', '/order/global-group', {  }, successCallback);

/**
 * FOF详情-关于
 */
var fofAnalyseDetail = (fofId,successCallback) => http('POST', '/analyse/detail', { fofId }, successCallback);

/**
 * 智能资产-推荐组合卖出
 */
var myCommendSell = (successCallback) => http('POST', '/my/sold-out', { }, successCallback, getToken());

/**
 * 智能资产-推荐组合建仓，调仓
 */
var myChangePostion = (toType,successCallback) => http('POST', '/my/change-position', { toType }, successCallback, getToken());

/**
 * 大类指数-日线
 */
var assetIndexDayLine = (fofId, successCallback) => http('POST', '/analyse/id-line', { fofId }, successCallback);

/**
 * 大类指数-周线
 */
var assetIndexWeekLine = (fofId, successCallback) => http('POST', '/analyse/iw-line', { fofId }, successCallback);

/**
 * 大类指数-月线
 */
var assetIndexMonthLine = (fofId, successCallback) => http('POST', '/analyse/im-line', { fofId }, successCallback);


/**
 * 大类指数|FOF包-分时线
 */
var assetMinuteLine = (fofId, successCallback) => http('POST', '/analyse/minute-line', { fofId }, successCallback);

/**
 * 大类指数|FOF包-基本信息（昨收、今开）
 */
var assetLineBaseInfo = (fofId, successCallback) => http('POST', '/analyse/price', { fofId }, successCallback);

/**
 * 我的持仓-前5名ETF
 */
var assetTopEtf = (type,successCallback) => http('POST', '/my/top-etf', { type }, successCallback, getToken());

/**
 * 我的模拟盘资产-推荐组合和自配组合
 */
var assetMyVirtual = (successCallback) => http('POST', '/my/vir-total', {  }, successCallback, getToken());

/**
 * FOF包-历史收益
 */
var assetHistoryIncome = (fofId,successCallback) => http('POST', '/analyse/history-income', { fofId }, successCallback, getToken());


/**
 * 实盘交易-账户信息
 */
var tradeRecIndex = (type,accountId,successCallback) => http('POST', '/trade/rec-index', { type,accountId }, successCallback, getToken());


/**
 * 实盘交易-获取交易账号
 */
var tradeGetAccount = (successCallback) => http('POST', '/trade/get-account', {  }, successCallback, getToken());


/**
 * 实盘交易-选择类型
 */
var tradeChooseType = (type,accountId,successCallback) => http('POST', '/trade/choose-type', {type,accountId}, successCallback, getToken());


/**
 * 实盘交易-增资凭证
 */
var tradeAddFund = (amt,currency,remarks,accountId,addProve,successCallback) => http('POST', '/trade/add-fund', {amt,currency,remarks,accountId,addProve}, successCallback, getToken(), 'true');


/**
 * 实盘交易-赎回申请
 */
var tradeRedeem = (amt,currency,remarks,bankType,bankName,swiftCode,accountId,accountName,successCallback) => http('POST', '/trade/redeem', {amt,currency,remarks,bankType,bankName,swiftCode,accountId,accountName}, successCallback, getToken());

/**
 * 实盘交易-每日收益
 */
var tradeDailyProfit = (type,accountId,successCallback) => http('POST', '/trade/daily-profit', {type,accountId}, successCallback, getToken());

/**
 * 实盘交易-取消委托
 */
var tradeCancelEntrust = (changeId,successCallback) => http('POST', '/trade/cancel', {changeId}, successCallback, getToken());

/**
 * 实盘交易-委托列表
 */
var tradeEntrustList = (type, cur,successCallback) => http('POST', '/trade/change-list', {type, cur}, successCallback, getToken());

/**
 * 实盘交易-卖出
 */
var tradeSoldOut = (accountId,successCallback) => http('POST', '/trade/sold-out', {accountId}, successCallback, getToken());

/**
 * 实盘交易-持仓
 */
var tradePostionList = (accountId,successCallback) => http('POST', '/trade/position', {accountId}, successCallback, getToken());

/**
 * 实盘交易-出入金明细-入金
 */
var tradeAddFundRecord = (successCallback) => http('POST', '/trade/add-list', {}, successCallback, getToken());

/**
 * 实盘交易-出入金明细-出金
 */
var tradeRedeemRecord = (successCallback) => http('POST', '/trade/redeem-list', {}, successCallback, getToken());


/**
 * 实盘交易-判断是否能够增资
 */
var tradeCanAdd = (successCallback) => http('POST', '/trade/can-add', {}, successCallback, getToken());

/**
 * 实盘交易-判断是否能够赎回
 */
var tradeCanRedeem = (successCallback) => http('POST', '/trade/can-redeem', {}, successCallback, getToken());

export { 
 getRecommendGroupChart, mobileCode, accountLogin, checkExsis, sendMobile,
 checkout, mainMarket, mainMarketDetail, messageList,
 messageDetail, indexDetail, indexData,
 indexMarketDetail, packageMarketDetail,
 assetDetail, assetDetailList,
 entrustDetailList, profitDetailList, 
 myIndex, assetPieData, register, 
 registerStep0, registerStep1,
 registerStep2, registerStep3,
 registerStep4, registerStep5, 
 profileInfo, feedBack, signOut, 
 riskTest, baseInfo, assetIndex, 
 riskTestResult, assetAddType, 
 assetTypeDetail, assetTypeMonth,
 assetRecordDetail, assetPieDataByDate,
 assetPieDataNoToken, assetSimpleFOFBuy, 
 assetMultiFOFBuy, assetDiyIndex,
 assetFOFList, checkTrade, newsList,
 assetSimpleFOFSell, getFofChart, assetOrderList,
 assetFOFDayLine, assetFOFWeekLine, 
 assetFOFMonthLine, mainFOFStaticList, mainIndexStaticList,
 orderCancel, profileGetStep, commendOrderList, 
 commendOrderCancel,mainMainStaticList,fofAnalyseDetail,
 myCommendSell,myChangePostion,assetIndexDayLine,
 assetIndexWeekLine,assetIndexMonthLine,newsDetail,assetTopEtf,
 assetMinuteLine,assetMyVirtual,assetLineBaseInfo,
 forgetGetMobileCode,forgetVeriftyMobile,forgetResetPassword,
 assetHistoryIncome,tradeRecIndex,tradeGetAccount,tradeChooseType,
 tradeAddFund,tradeRedeem,tradeDailyProfit,tradeCancelEntrust,tradeEntrustList,
 tradePostionList,tradeSoldOut,
 tradeAddFundRecord,
 tradeRedeemRecord,
 tradeCanAdd,
 tradeCanRedeem
}

