import axios from "axios";
import { showToast } from 'vant';
const baseURL = '/api';
//const baseURL = '';
const instance = axios.create({ baseURL })


//添加请求拦截器
instance.interceptors.request.use(
    (config)=>{
        //请求前的回调
        return config;
    },
    (err)=>{
        //请求错误的回调
        Promise.reject(err)
    }
)

//添加响应拦截器
instance.interceptors.response.use(
    result => {

        if(result.data.msgcode===200 || result.status === 204){
            return result.data;
        }

        //操作失败
        showToast('服务异常');

        //异步操作的状态转换为失败
        return Promise.reject(result.data)

    },
    err => {

        showToast('服务异常');
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance;