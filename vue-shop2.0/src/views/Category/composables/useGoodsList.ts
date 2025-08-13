import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getSubCategoryAPI } from '@/apis/category';
import type {  GoodsListItemInfo } from '@/apis/category';

export function useGoodsList() {
    const route = useRoute()

    const goodList = ref<GoodsListItemInfo[]>([])
    const reqData = ref({
        categoryId: route.params.id,
        page: 1,
        pageSize: 20,
        sortFields: 'publishTime'
    })

    const getGoodList = async () => {
        const res = await getSubCategoryAPI(reqData.value) as any
        console.log(res)
        goodList.value = res.result.items
    }
    onMounted(() => getGoodList())
    //watch(() => reqData.value, () => {
    //        getGoodList()
    //    }, { immediate: true })

    const tabChange = () => {
      //console.log('tab切换了', reqData.value.sortFields)
      reqData.value.page = 1
      getGoodList()
    }

    const disabled = ref(false)
    const load = async () => {
        console.log('加载更多数据咯')
        reqData.value.page++
        const res = await getSubCategoryAPI(reqData.value) as any
        goodList.value = [...goodList.value, ...res.result.items]
        if (res.result.items.length === 0) {
            disabled.value = true
        }
    }

    return {
        goodList,
        reqData,
        tabChange,
        disabled,
        load
    }
}