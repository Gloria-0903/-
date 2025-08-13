import httpInstance from "@/utils/http";


//////////////////////////
export interface BannerItem {
    id: string
    imgUrl: string
}

export interface BannerParams {
    distributionSite?: string
}

export function getBannerAPI (params: BannerParams = {}) {
    const { distributionSite = '1' } = params 
    return httpInstance({
        url: '/home/banner',
        params: {
          distributionSite
        }
    })
}
//////////////////////////


//////////////////////////
export interface NewItem {
    id: string
    name: string
    desc: string
    price: string
    picture: string
    orderNum: number
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
  return httpInstance({
    url:'/home/new'
  })
}
//////////////////////////


//////////////////////////
export interface HotItem {
    id: string
    title: string
    picture: string
    alt: string
}

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => {
  return  httpInstance({
    url:'/home/hot'
  })
}
//////////////////////////

//////////////////////////
export interface GoodsItem {
    id: string
    name: string
    picture: string
    saleInfo: string
    children: GoodsChild[]
    goods: GoodsInfo[]
}

export interface GoodsChild {
    id: string
    name: string
    layer: number
    parent: string
}

export interface GoodsInfo {
    id: string
    name: string
    desc: string
    price: string
    picture: string
    orderNum: number
}


/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}
//////////////////////////