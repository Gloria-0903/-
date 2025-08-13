import httpInstance from '@/utils/http'

// 品牌信息
export interface Brand {
  id: string
  name: string
  nameEn: string
  logo: string
  desc: string
  picture: string
  place: string
  type: string
}

// 分类信息
export interface Category {
  id: string
  name: string
  layer: number
  parent: Parent[]
}

export interface Parent {
  id: string
  name: string
  layer: number
  parent: string  
}

export interface Details {
  pictures: string[]
  properties: Property[]
}

// 商品属性
export interface Property {
  name: string
  value: string
}

// 商品规格
export interface Spec {
  id: string
  name: string
  values: SpecValue[]
}

export interface SpecValue {
  name: string
  picture: string
  desc: string
}

// SKU信息
export interface Sku {
  id: string
  skuCode: string
  price: string
  oldPrice: string
  inventory: number
  picture: string
  specs: SpecItem[]
}

export interface SpecItem {
  name: string
  valueName: string
}

export interface ProductItem {
  desc: string
  id: string
  name: string
  orderNum: number
  picture: string
  price: string
}

// 商品详情
export interface GoodsDetail {
  id: string
  name: string
  desc: string
  price: string
  oldPrice: string
  discount: number
  inventory: number
  brand: Brand
  categories: Category[]
  collectCount: number
  commentCount: number
  evaluationInfo: string
  hotByDay: ProductItem[]
  isCollect: boolean
  isPreSale: boolean
  mainPictures: string[]
  mainVideos: any[]
  details: Details  
  recommends: string
  salesCount: number
  similarProducts: ProductItem[]
  skus: Sku[]
  specs: Spec[]
  spuCode: string
  userAddresses: string
  videoScale: number
}

export const getDetail = (id:string) => {
  return httpInstance({
    url: '/goods',
    params: {
      id
    }
  })
}
/////////////////////////////////

/////////////////////////////////
export interface HotGoodItem {
  desc: string
  id: string
  name: string
  orderNum: number
  picture: string
  price: string
}


/**
 * 获取热榜商品
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜
 * @param {Number} limit - 获取个数
 */
export const getHotGoodsAPI = ({ id, type, limit = 3 }: { id: number; type: number; limit?: number })  => {
  return httpInstance({
    url:'/goods/hot',
    params:{
      id, 
      type, 
      limit
    }
  })
}