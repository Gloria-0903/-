import { getTopCategoryAPI } from '@/apis/category';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { TopItem } from '@/apis/category';

export function useCategory () {
    const route = useRoute()

    const categoryData = ref<TopItem>()

    const getCategory = async () => {
        const res = await getTopCategoryAPI(route.params.id as string) as any
        categoryData.value = res.result
        console.log(res)
    }

    watch(() => route.params.id, () => {
        getCategory()
    }, { immediate: true })

    return {
        categoryData
    }
}