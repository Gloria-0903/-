import httpInstance from "@/utils/http";

export interface CategoryItem {
    id: string
    name: string
    picture: string
    children: CategoryChild[]
    goods: CategoryGoods[]
}

export interface CategoryChild {
    id: string
    name: string
    picture: string
    parentId: string
    sortOrder: number
}

export interface CategoryGoods {
    id: string
    name: string
    desc: string
    price: string
    picture: string
    discount?: number
    orderNum: number
}

export function getCategoryAPI () {
  return httpInstance({
    url: '/home/category/head'
  })
}