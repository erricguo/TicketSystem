import axios from 'axios'
import Swal from 'sweetalert2'
import store from '../store'
//import { getToken } from '@/utils/auth'
import qs from 'qs'

// 創建axios實例
const service = axios.create({
    baseURL: 'http://localhost:8088/', // api 的 base_url
    timeout: 50000 // 請求超時時間
})

// request攔截器
/*service.interceptors.request.use(
    config => {
        console.log(config.data);
        config.data = qs.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
        if (store.getters.token) {
            //config.headers['X-Token'] = getToken() // 讓每個請求攜帶自訂token 請根據實際情況自行修改
        }
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)*/


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

// response 攔截器
service.interceptors.response.use(
    response => {
        /**
         * code為非20000是拋錯 可結合自己業務進行修改
         */
        const res = response.data
        if (res.code !== 20000) {
            Swal.fire("錯誤", res.message, "error");

            // 50008:非法的token; 50012:其他用戶端登錄了;  50014:Token 過期了;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                Swal.fire({
                    title: '確定登出?',
                    text: "你已被登出，可以取消繼續留在該頁面，或者重新登錄",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '重新登錄'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload() // 為了重新產生實體vue-router物件 避免bug
                    }
                })
            }
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        console.log('err' + error) // for debug
        Toast.fire({
            icon: 'error',
            title: error.message
        })
        //Swal.fire("錯誤", error.message, "error");
        return Promise.reject(error)
    }
)

export default service
