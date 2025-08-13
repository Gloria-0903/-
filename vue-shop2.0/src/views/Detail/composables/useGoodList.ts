import { getDetail } from '@/apis/detail'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { GoodsDetail } from '@/apis/detail'

export function useGoodList() {
    const goods = ref<GoodsDetail>()
    const route = useRoute()
    const getGoods = async () => {
        const res = await getDetail(route.params.id as string) as any
        console.log(res)
        goods.value = res.result
    }
    onMounted(() => getGoods())

    return {
        goods
    }
}