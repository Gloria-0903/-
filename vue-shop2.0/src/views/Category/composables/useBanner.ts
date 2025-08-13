import { onMounted, ref } from 'vue';
import { getBannerAPI } from '@/apis/home';
import type { BannerItem } from '@/apis/home';

export function useBanner () {
    const bannerList = ref<BannerItem[]>([])

    const getBanner = async () => {
        const res = await getBannerAPI({
            distributionSite: '2' 
        }) as any
        //console.log(res)
        bannerList.value = res.result
    }
    onMounted(() => getBanner()) 

    return {
        bannerList
    }
}