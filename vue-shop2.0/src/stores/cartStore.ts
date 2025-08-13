import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";

export interface skuObjInfo {
    inventory: number
    oldPrice: string
    price: string
    skuId: string
    specsText: string
}

export interface CartListInfo {
    attrsText: string
    count: number
    id: string
    name: string
    picture: string
    price: string
    selected: boolean
    skuId: string
}

export interface APICartItem {
    id: string;
    skuId: string;
    name: string;
    picture: string;
    price: string;
    count: number;
    attrsText: string;
    discount: string
    isCollect: boolean
    isEffective: boolean
    nowOriginalPrice: string
    nowPrice:string
    postFee: boolean
    stock: number
    space: []
}

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => Boolean(userStore.userInfo?.token))

    const cartList = ref<CartListInfo[]>([])

    const mapApiCartItemToCart = (item: APICartItem): CartListInfo => ({
        attrsText: item.attrsText ?? '',
        count: item.count,
        id: item.id,
        name: item.name,
        picture: item.picture,
        price: (item.nowPrice ?? item.price ?? '0') as string,
        selected: true,
        skuId: item.skuId,
    })

    const updateNewList = async () => {
        if (!isLogin.value) return
        const res = await findNewCartListAPI() as any
        const serverList = (res.result || []) as APICartItem[]
        cartList.value = serverList.map(mapApiCartItemToCart)
    }

    const addCart = async (goods: any) => {
        const { skuId, count } = goods

        if(isLogin.value) {
            await insertCartAPI({skuId, count})
            await updateNewList()
            
        } else {
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if(item) {
                item.count += goods.count
            } else {
                cartList.value.push({
                    ...goods,
                    selected: goods.selected ?? true,
                })
            }
        }
        
    }

    const delCart = async (skuId: string) => {
        if (isLogin.value) {
            await delCartAPI([skuId])
            await updateNewList()
        } else {
            const index = cartList.value.findIndex((item) => item.skuId === skuId)
            if (index !== -1) {
                cartList.value.splice(index, 1)
            }
        }
    }

    const clearCart = () => {
        cartList.value = []
    }

    const singleCheck = (skuId: string, selected: boolean) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        if (item) {
            item.selected = selected;
    }
    }

    const isAll = computed(() => cartList.value.length > 0 && cartList.value.every((item) => item.selected))

    const allCheck = (selected: boolean) => {
        cartList.value.forEach(item => item.selected = selected)
    }

    const allCount = computed(() => {
        return cartList.value.reduce((total, item) => total + item.count, 0)
    })

    const SelectedCount = computed(() => 
        cartList.value.filter(item => item.selected).reduce((total, item) => total + item.count, 0)
    )

    const allPrice = computed(() => {
        return cartList.value.reduce((total, item) => {
            const price = parseFloat(item.price) || 0
            return total + price * item.count
        }, 0)
    })

    const SelectedPrice = computed(() => 
        cartList.value.filter(item => item.selected).reduce((total, item) => {
            const price = parseFloat(item.price) || 0
            return total + price * item.count},0)
    )   

    return {
        cartList,
        addCart,
        delCart,
        clearCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allCheck,
        SelectedCount,
        SelectedPrice,
        updateNewList,
        isLogin,
    }
},{
    persist: true,
  })