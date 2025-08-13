import { defineStore } from "pinia";
import { loginAPI } from '@/apis/user';
import type { LoginParams } from "@/apis/user";
import { ref } from "vue";
import type { UserInfo } from "@/apis/user";
import { useCartStore } from "./cartStore";
import { mergeCartAPI } from "@/apis/cart";

export const useUserStore = defineStore('user', () => {
    const userInfo = ref<UserInfo | null>()

    const cartStore = useCartStore()

    const getUserInfo = async ({ account, password }: LoginParams) => {
        const res = await loginAPI({ account, password }) as any
        //console.log(res)
        userInfo.value = res.result

        const localCartToMerge = cartStore.cartList.map(item => ({
            skuId: item.skuId,
            selected: item.selected,
            count: item.count
        }))

        if (localCartToMerge.length > 0) {
            await mergeCartAPI(localCartToMerge)
            cartStore.clearCart()
        }
        await cartStore.updateNewList()
    }

    const clearUserInfo = () => {
        userInfo.value = null
        cartStore.clearCart()
    }

    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    persist: true,
  })