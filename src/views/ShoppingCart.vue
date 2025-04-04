<template>
  <div>
    <van-nav-bar title="购物车" left-text="返回" @click-left="goBack" />
    <van-checkbox-group v-model="selectedIds">

      <van-card
          v-for="item in cartList"
          :title="item.name"
          :price="item.price"
          :thumb="item.thumb"
          :num="item.quantity"
      >
        <template #title>
          {{ item.name }}
          <van-checkbox :name="item.id" />
        </template>
        <template #footer>
          <van-stepper v-model="item.quantity" @change="onQuantityChange(item)" />
          <van-button type="danger" @click="removeFromCart(item)">删除</van-button>
        </template>
      </van-card>
    </van-checkbox-group>
    <van-submit-bar
        :price="totalPrice"
        button-text="结算"
        @click-button="checkout"
    >
      <template #top>
        <van-checkbox v-model="isAllSelected" @change="toggleAllSelection">全选</van-checkbox>
      </template>
    </van-submit-bar>
  </div>
</template>

<script setup>
import { ref, computed,onMounted  } from 'vue';
import {useRouter} from "vue-router";
import {showToast} from "vant";
import request from "@/utils/request.js";
const router = useRouter();
// 模拟购物车数据
const cartList = ref([]);

const selectedIds = ref([]);
const isAllSelected = ref(false);

onMounted(()=>{
  carList()
})
const carList = () =>{
  request.get('/ai/cartList')
      .then((res) => {
        res.body.forEach(item=>{
          cartList.value.push({
            id:item.id,
            name: item.goodsName,
            quantity:1,
            price:item.goodsPrice,
            thumb:item.goodsUrl}
          )
        })
      })
}

// 计算总价格
const totalPrice = computed(() => {
  return cartList.value.reduce((total, item) => {
    if (selectedIds.value.includes(item.id)) {
      return total + item.price *100 * item.quantity;
    }
    return total;
  }, 0);
});

// 返回操作
const goBack = () => {
  router.push("/")
};

// 数量改变事件
const onQuantityChange = (item) => {
  console.log(`商品 ${item.name} 的数量变为 ${item.quantity}`);
};

// 从购物车删除商品
const removeFromCart = (item) => {
  const index = cartList.value.findIndex((i) => i.id === item.id);
  if (index!== -1) {
    cartList.value.splice(index, 1);
    const selectedIndex = selectedIds.value.indexOf(item.id);
    if (selectedIndex!== -1) {
      selectedIds.value.splice(selectedIndex, 1);
    }
  }
};

// 全选操作
const toggleAllSelection = (value) => {
  if (value) {
    selectedIds.value = cartList.value.map((item) => item.id);
  } else {
    selectedIds.value = [];
  }
};

// 结算操作
const checkout = () => {
  console.log("aaaaaaaa")
};
</script>

<style scoped>
/* 可以添加自定义样式 */
</style>