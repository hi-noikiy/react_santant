import axios from 'axios'
import qs from 'qs'

const HSOT = 'https://uc-api-sandbox.fcoin.com/'
const HSOT2 = 'https://exchange-sandbox.fcoin.com/';
const LOGIN = 'https://uc-api-sandbox.fcoin.com/users/v1/dev/login'
// const LOGIN='https://ex-api-sandbox.fcoin.com/web/v1/dev/login'
const REGISTERED = `${HSOT}users/v1/register`;
//资产中心
const GET_ASSETS = `${HSOT2}api/web/v1/accounts/balance`;
//币种充值
const CurrencyRecharge = `${HSOT2}api/web/v1/accounts/deposits/address?currency=ft`;

//获取地址列表
const GET_ADDRESSLIST = `${HSOT2}api/web/v1/accounts/withdraws/addresses?currency=ft`;

//充值历史
const GET_FINANCEHISTORY = `${HSOT2}api/web/v1/accounts/latest-deposits?currency=eth`;

//提币记录
const LATEST_WITHDRAWS = `${HSOT2}api/web/v1/accounts/latest-withdraws?currency=btc`;

//用户状态
const USER_STATUS = `${HSOT2}api/users/v1/user`;

//IP列表
const IP_LIST = `${HSOT2}api/users/v1/user/audits`;

//当前委托
const CURRENTENTRUST_LIST = `${HSOT2}api/web/v1/orders/active-orders?symbol=ethusdt`;
//历史委托
const HISTORY_ENTRUST=`${HSOT2}api/web/v1/orders/lastest-orders?symbol=ethusdt`

axios.defaults.retry = 0;
axios.defaults.retryDelay = 1000;
axios.defaults.timeout = 500000;
var loadinginstace
const URL = 'http://beta.artup.com/artup-build/builder/sku.do?format=json&ignore=true&client=pc&category=xiaoshiguang&parameter=xiaoshiguang.xiaoshiguang.blue.170X235.32'
axios.interceptors.request.use(config => {
    console.log('sessionStorage', sessionStorage.getItem('token'));
    let userTocken = sessionStorage.getItem('token') || '';
    config.headers['Content-Type'] = 'application/json';
    config.headers.token = userTocken;
    // config.headers.cache = false;
    return config
}, error => {
    // alert('加载超时')

    return Promise.reject(error)
});

axios.interceptors.response.use(function (data) {
    return data
}, function axiosRetryInterceptor(err) {
    console.log('ssss=', err)
    var config = err.config;
    // alert('加载失败')
    // 设置变量以跟踪重试计数 如果配置不存在，或者重试选项没有设置，则拒绝
    if (!config || !config.retry) return Promise.reject(err);

    // 或者重试选项没有设置，则拒绝
    config.__retryCount = config.__retryCount || 0;

    // 检查我们是否已经完成了重试的总数
    if (config.__retryCount >= config.retry) {

        return Promise.reject(err);
    }

    // 增加重试计数
    config.__retryCount += 1;

    // 创造新的承诺来处理指数回退
    var backoff = new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, config.retryDelay || 1);
    });

    // 返回让axios重新尝试请求的承诺
    return backoff.then(function () {
        return axios(config);
    });
});

export default {
    logoin: (data) => {
        return axios.post(LOGIN, data)
    },
    registered: (data) => {
        return axios.post(REGISTERED, data)
    },
    assets: {
        get_assets: (data) => {
            return axios.get(GET_ASSETS, data)
        },
        //币种充值
        CurrencyRecharge: (data) => {
            return axios.get(CurrencyRecharge, data)
        },
    },
    addresses: {
        //获取地址列表
        get_addresses: (data) => {
            return axios.get(GET_ADDRESSLIST, data)
        },
    },
    //充值历史
    getfinanceHistory: (data) => {
        return axios.get(GET_FINANCEHISTORY, data)
    },
    //提币记录
    latest_withdraws: (data) => {
        return axios.get(LATEST_WITHDRAWS, data)
    },
    user: {
        getUserstatus: (data) => {
            return axios.get(USER_STATUS, data)
        },
        getIplist: (data) => {
            return axios.get(IP_LIST, data)
        }
    },
    entrust: {
        get_currentEntrust: (data) => {
            return axios.get(CURRENTENTRUST_LIST, data)
        },
        //历史委托
        history_entrust: (data) => {
            return axios.get(HISTORY_ENTRUST, data)
        },


    }


}