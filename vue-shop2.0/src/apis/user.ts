import httpInstance from "@/utils/http"

export interface LoginParams {
  account: string;
  password: string;
}

export interface UserInfo {
  account: string
  avatar: string
  birthday: string
  cityCode: string
  gender: string
  id: string
  mobile: string
  nickname: string
  profession: string
  provinceCode: string
  token: string
}

export const loginAPI = ({ account, password }: LoginParams) => {
  return httpInstance({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}

///////////////////////////////

export const getLikeListAPI = ({ limit = 4 }) => {
  return httpInstance({
    url:'/goods/relevant',
    params: {
      limit 
    }
  })
}
