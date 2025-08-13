import httpInstance from "@/utils/http";

// 商品属性类型
export interface Property {
  propertyMainName: string;
  propertyValueName: string;
}

// 商品SKU类型
export interface Sku {
  attrsText: string;
  curPrice: number;
  id: string;
  image: string;
  name: string;
  properties: Property[];
  quantity: number
  realPay: number
  spuId: string
  totalMoney: number
}

// 订单数据类型
export interface OrderData {
  arrivalEstimatedTime: string | null;
  cityCode: string;
  closeTime: string | null;
  consignTime: string | null;
  countdown: number;
  countyCode: string;
  createTime: string;
  deliveryTimeType: number;
  endTime: string | null;
  evaluationTime: string | null;
  id: string;
  orderState: number;
  payChannel: number;
  payLatestTime: string;
  payMoney: number;
  payState: number;
  payTime: string | null;
  payType: number;
  postFee: number;
  provinceCode: string;
  receiverAddress: string;
  receiverContact: string;
  receiverMobile: string;
  skus: Sku[];
  totalMoney: number
  totalNum: number
}

// API响应类型
export interface OrderResponse {
  result: OrderData;
}

export const getOrderAPI = (id: string) => {
  return httpInstance({
    url: `/member/order/${id}`
  })
}