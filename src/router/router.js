import App from '../App'

const market = r => require.ensure([], () => r(require('../page/market/market')), 'market')
const asset = r => require.ensure([], () => r(require('../page/asset/asset')), 'asset')
const assetDetail = r => require.ensure([], () => r(require('../page/asset/assetDetail')), 'assetdetail')
const find = r => require.ensure([], () => r(require('../page/find/find')), 'find')
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
const forget1 = r => require.ensure([], () => r(require('../page/forget/forget1')), 'forget1')
const signup = r => require.ensure([], () => r(require('../page/register/signup')), 'signup')
const registerIndex = r => require.ensure([], () => r(require('../page/register/index')), 'index')
const registerStep0 = r => require.ensure([], () => r(require('../page/register/step0')), 'step0')
const registerStep1 = r => require.ensure([], () => r(require('../page/register/step1')), 'step1')
const registerStep2 = r => require.ensure([], () => r(require('../page/register/step2')), 'step2')
const registerStep3 = r => require.ensure([], () => r(require('../page/register/step3')), 'step3')
const registerStep4 = r => require.ensure([], () => r(require('../page/register/step4')), 'step4')
const registerStep5 = r => require.ensure([], () => r(require('../page/register/step5')), 'step5')
const registerStatement = r => require.ensure([], () => r(require('../page/register/statement')), 'statement')
const registerResult = r => require.ensure([], () => r(require('../page/register/stepresult')), 'stepResult')
const registerAgreement = r => require.ensure([], () => r(require('../page/register/agreement')), 'agreement')
const declareLaw = r => require.ensure([], () => r(require('../page/register/children/declareLaw')), 'declareLaw')
const declareCustomer = r => require.ensure([], () => r(require('../page/register/children/declareCustomer')), 'declareCustomer')
const declareCash = r => require.ensure([], () => r(require('../page/register/children/declareCash')), 'declareCash')
const declareNotice = r => require.ensure([], () => r(require('../page/register/children/declareNotice')), 'declareNotice')
const declareOther = r => require.ensure([], () => r(require('../page/register/children/declareOther')), 'declareOther')
const declareWben = r => require.ensure([], () => r(require('../page/register/children/declare8ben')), 'declareWben')
const sendLink = r => require.ensure([], () => r(require('../page/register/sendlinkresult')), 'sendLink')
const message = r => require.ensure([], () => r(require('../page/profile/children/message')), 'message')
const messageDetail = r => require.ensure([], () => r(require('../page/profile/children/children/messageDetail')), 'messageDetail')
const question = r => require.ensure([], () => r(require('../page/profile/children/question')), 'question')
const feedback = r => require.ensure([], () => r(require('../page/profile/children/feedback')), 'feedback')
const setting = r => require.ensure([], () => r(require('../page/profile/children/setting')), 'setting')
const myAsset = r => require.ensure([], () => r(require('../page/profile/children/myasset')), 'myasset')
const myAssetDetail = r => require.ensure([], () => r(require('../page/profile/children/children/myassetdetail')), 'myassetdetail')
const tradeNotice = r => require.ensure([], () => r(require('../page/asset/children/tradenotice')), 'tradenotice')
const fofTradeNotice = r => require.ensure([], () => r(require('../page/asset/children/foftradenotice')), 'foftradenotice')
const fofDetail = r => require.ensure([], () => r(require('../page/asset/fragment/children/fofDetail')), 'fofDetail')
const profileInfo = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')
const riskTest = r => require.ensure([], () => r(require('../page/profile/children/risktest')), 'risktest')
const riskResult = r => require.ensure([], () => r(require('../page/profile/children/riskresult')), 'riskresult')
const changeRecord = r => require.ensure([], () => r(require('../page/asset/children/changerecord')), 'changerecord')
const overSeaInvest = r => require.ensure([], () => r(require('../page/find/children/overseainvest')), 'overSeaInvest')
const findData = r => require.ensure([], () => r(require('../page/find/children/data')), 'findData')
const findProgram = r => require.ensure([], () => r(require('../page/find/children/program')), 'findProgram')
const findAboutus = r => require.ensure([], () => r(require('../page/find/children/aboutus')), 'findAboutus')
const findNews = r => require.ensure([], () => r(require('../page/find/children/news')), 'findNews')
const findNewDetail = r => require.ensure([], () => r(require('../page/find/children/newDetail')), 'newDetail')
const profileQueryDetail = r => require.ensure([], () => r(require('../page/profile/children/children/children/querydetail')), 'profileQueryDetail')
const indexDetail = r => require.ensure([], () => r(require('../page/asset/fragment/children/indexDetail')), 'indexDetail')
const fofHistoryIncome = r => require.ensure([], () => r(require('../page/asset/fragment/children/historyIncome')), 'fofHistoryIncome')
const tradeRedeem = r => require.ensure([], () => r(require('../page/asset/fragment/children/tradeRedeem')), 'tradeRedeem')
const tradePayment = r => require.ensure([], () => r(require('../page/asset/fragment/children/tradePayment')), 'tradePayment')
const tradeResult = r => require.ensure([], () => r(require('../page/asset/fragment/children/tradeResult')), 'tradeResult')
export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //市场信息home页面
        {
            path: '/home/index',
            redirect: '/market',
            meta: {
                title: '全球市场'
            },
        },
        //市场信息home页面
        {
            path: '',
            redirect: '/market',
            meta: {
                title: '全球市场'
            },
        },
        //市场信息home页面
        {
            path: '/market',
            component: market,
            meta: {
                title: '全球市场'
            },
        },
        //资产信息
        {
            path: '/my/index',
            component: asset,
            meta: {
                title: '智能交易'
            },
        },
        //资产信息详情
        {
            path: '/my/detail',
            component: assetDetail,
            meta: {
                title: '资产详情'
            },
        },
        //资产-FOF详情
        {
            path: '/my/fofdetail',
            component: fofDetail,
            meta: {
                title: 'FOF详情'
            },
        },
        //资产-大类资产详情
        {
            path: '/my/indexdetail',
            component: indexDetail,
            meta: {
                title: '大类资产详情'
            },
        },
        //资产-历史收益
        {
            path: '/my/hisincome',
            component: fofHistoryIncome,
            meta: {
                title: 'FOF历史收益'
            },
        },
        //实盘-赎回
        {
            path: '/trade/redeem',
            component: tradeRedeem,
            meta: {
                title: '赎回'
            },
        },
        //实盘-增资/赎回
        {
            path: '/trade/payment',
            component: tradePayment,
            meta: {
                title: '增资/提现'
            },
        },
        //实盘-增资/赎回结果页面
        {
            path: '/trade/result',
            component: tradeResult,
            meta: {
                title: '增资/提现结果'
            },
        },
        //调仓记录
        {
            path: '/my/record',
            component: changeRecord,
            meta: {
                title: '调仓记录'
            },
        },
        //交易须知
        {
            path: '/asset/notice',
            component: tradeNotice,
            meta: {
                title: '交易须知'
            },
        },
        //交易须知-FOF大类资产
        {
            path: '/asset/fofnotice',
            component: fofTradeNotice,
            meta: {
                title: '交易须知'
            },
        },
        //发现，包括风向标，雷达
        {
            path: '/find',
            component: find,
            meta: {
                title: '发现'
            },
        },
        //发现-金融大数据
        {
            path: '/find/data',
            component: findData,
            meta: {
                title: '金融大数据平台'
            },
        },
        //发现-程序化交易平台
        {
            path: '/find/program',
            component: findProgram,
            meta: {
                title: '程序化交易平台'
            },
        },
        //发现-关于我们
        {
            path: '/find/aboutus',
            component: findAboutus,
            meta: {
                title: '关于我们'
            },
        },
        //发现-新闻列表
        {
            path: '/find/news',
            component: findNews,
            meta: {
                title: '行业动态'
            },
        },
        //发现-新闻详情
        {
            path: '/find/newdetail',
            component: findNewDetail,
            meta: {
                title: '新闻详情'
            },
        },
        //我的信息
        {
            path: '/profile',
            component: profile,
            meta: {
                title: '我的'
            },
        },
        //登录
        {
            path: '/login',
            component: login,
            meta: {
                title: '登录'
            },
        },
        //登录
        {
            path: 'user/login',
            component: login,
            meta: {
                title: '登录'
            },
        },
        //忘记密码-验证手机短信
        {
            path: '/forget/code',
            component: forget,
            meta: {
                title: '忘记密码'
            },
        },
        //忘记密码-确定密码
        {
            path: '/forget/reset',
            component: forget1,
            meta: {
                title: '忘记密码'
            },
        },
        //注册
        {
            path: '/signup',
            component: signup,
            meta: {
                title: '注册'
            },
        },
        //开户，开户首页
        {
            path: '/user/index',
            component: registerIndex,
            meta: {
                title: '开户'
            },
        },
        //开户，选择开户类型
        {
            path: '/user/info_step0',
            component: registerStep0,
            meta: {
                title: '选择开户类型'
            },
        },
        //开户，填写基本信息
        {
            path: '/user/info_step1',
            component: registerStep1,
            meta: {
                title: '基本资料'
            },
        },
        //开户，家庭和职业信息
        {
            path: '/user/info_step2',
            component: registerStep2,
            meta: {
                title: '家庭和职业信息'
            },
        },
        //开户，资产信息和交易经验
        {
            path: '/user/info_step3',
            component: registerStep3,
            meta: {
                title: '资产和交易经验'
            },
        },
        //开户，投资协议
        {
            path: '/user/info_step4',
            component: registerStep4,
            meta: {
                title: '投资协议'
            },
        },
        //开户，法律声明
        {
            path: '/user/declare/law',
            component: declareLaw,
            meta: {
                title: '法律声明'
            },
        },
        //开户，保证金披露
        {
            path: '/user/declare/cash',
            component: declareCash,
            meta: {
                title: '保证金披露'
            },
        },
        //开户，客户协议
        {
            path: '/user/declare/customer',
            component: declareCustomer,
            meta: {
                title: '客户协议'
            },
        },
        //开户，W-8BEN表格
        {
            path: '/user/declare/wben',
            component: declareWben,
            meta: {
                title: 'W-8BEN表格'
            },
        },
        //开户，其它交易品种协议和声明
        {
            path: '/user/declare/other',
            component: declareOther,
            meta: {
                title: '其它交易品种协议和声明'
            },
        },
        //开户，通知和确认清算安排
        {
            path: '/user/declare/notice',
            component: declareNotice,
            meta: {
                title: '通知和确认清算安排'
            },
        },
        //开户，上传身份证明
        {
            path: '/user/info_step5',
            component: registerStep5,
            meta: {
                title: '上传身份证明'
            },
        },
        //开户，开户结果
        {
            path: '/user/info_success',
            component: registerResult,
            meta: {
                title: '开户申请结果'
            },
        },
        //开户，发送开户链接
        {
            path: '/user/sendlink',
            component: sendLink,
            meta: {
                title: '开户链接发送'
            },
        },
        //开户，开户协议
        {
            path: '/user/agreement',
            component: registerAgreement,
            meta: {
                title: '用户协议'
            },
        },

        //开户，开户声明
        {
            path: '/user/statement',
            component: registerStatement,
            meta: {
                title: '温馨提示'
            },
        },
        //个人信息-我的消息列表
        {
            path: '/message',
            component: message,
            meta: {
                title: '我的消息'
            },
        },
        //个人信息-我的消息详情
        {
            path: '/message/detail',
            component: messageDetail,
            meta: {
                title: '消息详情'
            },
        },
        //个人信息-常见问题
        {
            path: '/question',
            component: question,
            meta: {
                title: '常见问题'
            },
        },
        //个人信息-我要反馈
        {
            path: '/feedback',
            component: feedback,
            meta: {
                title: '我要反馈'
            },
        },
        //个人信息-设置
        {
            path: '/setting',
            component: setting,
            meta: {
                title: '设置'
            },
        },
        //个人信息-风险测评
        {
            path: '/my/risk',
            component: riskTest,
            meta: {
                title: '风险测评'
            },
        },
        //个人信息-风险测评结果
        {
            path: '/my/risk-result',
            component: riskResult,
            meta: {
                title: '风险测评结果'
            },
        },
        //指数详情
        {
            path: '/indexdetail',
            component: indexDetail,
            meta: {
                title: '指数详情'
            },
        },
        //我的资产
        {
            path: '/profile/asset',
            component: myAsset,
            meta: {
                title: '我的资产'
            },
        },
        //我的资产详情
        {
            path: '/profile/assetdetail',
            component: myAssetDetail,
            meta: {
                title: '我的资产详情'
            },
        },

        //个人信息-基本信息
        {
            path: '/profile/info',
            component: profileInfo,
            meta: {
                title: '基本信息'
            },
        },
        //个人信息-基本信息
        {
            path: '/find/invest',
            component: overSeaInvest,
            meta: {
                title: '海外投资'
            },
        },
        //个人信息-我的资产-查询
        {
            path: '/profile/asset/query',
            component: profileQueryDetail,
            meta: {
                title: '查询'
            },
        },
    ]
}]
