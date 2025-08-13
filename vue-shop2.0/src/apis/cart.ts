import httpInstance from "@/utils/http"

export const insertCartAPI = ({ skuId, count }: { skuId: string; count: number }) => {
  return httpInstance({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}

export const findNewCartListAPI = () => {
  return httpInstance({
    url: '/member/cart'
  })
}

export const delCartAPI = (ids: string[]) => {
  return httpInstance({
    url: '/member/cart',
    method: 'DELETE',
    data: { ids }
  })
}

export const mergeCartAPI = (data:any) => {
  return httpInstance({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}