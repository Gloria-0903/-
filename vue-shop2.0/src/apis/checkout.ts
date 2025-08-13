import httpInstance from "@/utils/http"

// 结算页 - 地址
export interface CheckoutAddress {
  id: string
  receiver: string
  contact: string
  provinceCode: string
  cityCode: string
  countyCode: string
  postalCode: string
  address: string
  fullLocation: string
  addressTags?: string
  isDefault: number
}

// 结算页 - 商品条目
export interface CheckoutGoodsItem {
  id: string
  skuId: string
  picture: string
  name: string
  attrsText: string
  price: number
  count: number
  totalPrice: number
  totalPayPrice: number
}

// 结算页 - 汇总信息
export interface CheckoutSummary {
  goodsCount: number
  totalPrice: number
  totalPayPrice: number
  postFee: number
  discountPrice?: number
}

// 结算页 - 整体数据
export interface CheckoutInfo {
  goods: CheckoutGoodsItem[]
  summary: CheckoutSummary
  userAddresses: CheckoutAddress[]
}

/**
 * 获取结算信息
 */
export const getCheckoutInfoAPI = () => {
  return httpInstance({
    url:'/member/order/pre'
  })
}

///////////////////////////

export const createOrderAPI = (data:any) => {
  return httpInstance({
    url: '/member/order',
    method: 'POST',
    data
  })
}

/**
 * 添加收货地址
 */
export const addAddressAPI = (data: any) => {
  return httpInstance({
    url: '/member/address',
    method: 'POST',
    data
  })
}

/**
 * 删除收货地址
 */
export const deleteAddressAPI = (id: string) => {
  return httpInstance({
    url: `/member/address/${id}`,
    method: 'DELETE'
  })
}
