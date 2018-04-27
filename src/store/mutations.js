import {
    SET_PAGE_DECLARE_LAW,
    GET_PAGE_DECLARE_LAW,
} from './mutation-types.js'


export default {

    //记录用户的法律声明
    [SET_PAGE_DECLARE_LAW](state, declare) {
        state.declare_law = declare;
    },

}
