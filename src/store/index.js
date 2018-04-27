import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
    token: '', //用户的token
    declare_law: '请选择', //法律文件用户选择的状态
    declare_cash: '请选择', //保证金披露
    declare_customer: '请选择', //客户协议
    declare_wben: '请选择', //w8ben表格
    declare_notice: '请选择', //通知和确认清算安排
    declare_other: '请选择', //其它交易品种协议和披露声明
    user_name: '', //
    is_login:false,//用户是否登录
    step_url:'',//开户到达的步骤
    asset_type:'command',//模型类型
    asset_optype:'virtual',//交易类型
    market_type:'main',//市场页面的TAB类型
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})
