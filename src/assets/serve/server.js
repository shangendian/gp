import axios from 'axios'
import qs from 'qs';
import store from "../../store.js";
// axios.defaults.withCredentials=true; //请求携带 cookie
// axios.defaults.headers.common['token'] = localStorage.getItem('TOKEN');    
const ADDRESS = 'http://test.guapi.net.cn'

if (process.env.NODE_ENV == 'development') {
	console.log('开发环境，development')
} else if (process.env.NODE_ENV == 'production') {
    console.log('开发环境，production')
}


export function get (url, params) {
    params.token = sessionStorage.getItem('TOKEN')
    return new Promise((resolve, reject)=>{
        axios.get( ADDRESS + url,{ params: params }).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err)
        })
    })
   
}

export function post(url, data = {}) {
    data.token = sessionStorage.getItem('TOKEN')
	return new Promise((resolve, reject) => {
		axios.post( ADDRESS + url, qs.stringify(data)).then(response => {
			resolve(response.data);
		}, err => {
			reject(err)
		})
	})
}
