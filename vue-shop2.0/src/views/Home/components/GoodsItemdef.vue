<template>
    <RouterLink :to="`/detail/${safeGoods.id}`" class="goods-item">
      <img v-img-lazy="safeGoods.picture" alt="" />
      <p class="name ellipsis">{{ safeGoods.name }}</p>
      <p class="desc ellipsis">{{ safeGoods.desc }}</p>
      <p class="price">&yen;{{ safeGoods.price }}</p>
    </RouterLink>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    
    interface Goods {
        id: string
        name: string
        desc: string
        price: string
        picture: string
        orderNum: number
    }

    const props = defineProps<{
        goods: Goods
    }>()

    const safeGoods = computed(() => props.goods || {
        id: '',
        name: '',
        desc: '',
        price: '',
        picture: '',
        orderNum: 0
    })
</script>

<style scoped lang="scss">
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  transition: all .5s;

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }

  img {
    width: 160px;
    height: 160px;
  }

  p {
    padding-top: 10px;
  }

  .name {
    font-size: 16px;
  }

  .desc {
    color: #999;
    height: 29px;
  }

  .price {
    color: $priceColor;
    font-size: 20px;
  }
}
</style>