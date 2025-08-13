import { ref } from "vue";
import { defineStore } from "pinia";
import { getCategoryAPI } from "@/apis/layout";
import type { CategoryItem } from '@/apis/layout';

export const useCategoryStore = defineStore('category',() => {
    const categorylist = ref<CategoryItem[]>([])

    const getCategory = async () => {
    const res = await getCategoryAPI() as any
    categorylist.value = res.result
    console.log('categorylist.value:', categorylist.value)
  }

  return {
    categorylist,
    getCategory
  }
})