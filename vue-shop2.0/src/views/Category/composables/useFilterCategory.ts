import { getCategoryFilterAPI } from '@/apis/category';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { CategoryFilterItem } from '@/apis/category';

export function useFilterCategory() {
    const route = useRoute()
    const filterData = ref<CategoryFilterItem>()

    const getFilterData = async () => {
        const res = await getCategoryFilterAPI(route.params.id as string) as any
        filterData.value = res.result
        //console.log(res)
    }
    onMounted(() => getFilterData())

    return {
        filterData
    }
}