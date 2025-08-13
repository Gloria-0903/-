import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

httpInstance.interceptors.request.use(config => {
  const useStore = useUserStore()
  const token = useStore.userInfo?.token
  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

httpInstance.interceptors.response.use(res => res.data, e => {
  const useStore = useUserStore()
  
  let errorMessage = '网络请求失败'
  if (e.response && e.response.data && e.response.data.message) {
    errorMessage = e.response.data.message
  } else if (e.message) {
    errorMessage = e.message
  }
  
  ElMessage({
    type: 'warning',
    message: errorMessage
  })

  if (e.response && e.response.status === 401) {
    useStore.clearUserInfo()
    router.push('/login')
  }

  return Promise.reject(e)
})

export default httpInstance

