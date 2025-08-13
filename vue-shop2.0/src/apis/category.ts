import httpInstance from "@/utils/http";

export interface TopItem {
    id: string
    name: string
    picture: string
    children: TopChild[]
}

export interface TopChild {
    id: string
    name: string
    picture: string
    parentId: string
    parentName: string
    brands: string
    categories: string
    saleProperties: string
    goods: TopGoods[]
}

export interface TopGoods {
    id: string
    name: string
    desc: string
    price: string
    picture: string
    orderNum: number
}

/**
 * @description: 获取分类数据
 * @param {*} id 分类id 
 * @return {*}
 */
export const getTopCategoryAPI = (id:string) => {
  return httpInstance({
    url:'/category',
    params:{
      id
    }
  })
}

//////////////////////////
export interface CategoryFilterItem {
    id: string
    name: string
    picture: string
    parentId: string
    parentName: string
    brands: Filterbrands[]
    categories: Filtercategories[]
    saleProperties: FiltersaleProperties[]
    goods: Filtergoods[]
}

export interface Filterbrands {
    desc: string
    id: string
    logo: string
    name: string
    nameEn: string
    picture: string
    place: string
    type: string
}

export interface Filtercategories {
    id: string
    name: string
    layer: number
    parent: string
}

export interface Filtergoods {
    desc: string
    id: string
    name: string
    picture: string
    price: string
    orderNum: number
}

export interface FiltersaleProperties {
    id: string
    name: string
    properties: salepropertiesInfo[]
}

export interface salepropertiesInfo {
    id: string
    name: string
}

/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id 
 * @return {*}
 */

export const getCategoryFilterAPI = (id:string) => {
  return httpInstance({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}
//////////////////////////

//////////////////////////
export interface GoodsListItem {
  counts: number
  items: GoodsListItemInfo[]
  page: number
  pageSizes: number
  pages: number 
}

export interface GoodsListItemInfo {
  desc: string
  id: string
  name: string
  orderNum: number
  picture: string
  price: string
}

/**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
export const getSubCategoryAPI = (data:any) => {
  return httpInstance({
    url:'/category/goods/temporary',
    method:'POST',
    data
  })
}
