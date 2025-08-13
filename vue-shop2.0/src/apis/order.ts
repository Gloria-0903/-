import httpInstance from "@/utils/http"


export const getUserOrder = (params: any) => {
  return httpInstance({
    url:'/member/order',
    method:'GET',
    params
  })
}
