<template>
  <div class="cartListItem">
    <div class="cartListItem-left">
      <div class="cartListItem-name">{{this.name}}</div>
      <div class="cartListItem-detail">{{this.detail}}</div>
    </div>
    <div class="cartListItem-right">
      <div class="cartListItem-price">￥{{this.price*this.count}}</div>
      <div class="cartListItem-countImg">
        <img src="../assets/sub.svg" class="cartListItem-img" @click="cartOper('sub')">
        {{this.count}}
        <img src="../assets/add.svg" class="cartListItem-img" @click="cartOper('add')">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartListItem",
  props: ["name", "detail", "count", "price",'index'],
  methods:{
      cartOper(oper){
          this.$emit('countChange',oper,this.index,2)
      }
  }
}
</script>

<style scoped>
.cartListItem {
  background: #ffffff;
  width: 100%;
  height: 114px;
  display: flex;
  justify-content: space-between;
}
.cartListItem-left {
  margin-left: 32px;
  margin-top: 22px;
}
.cartListItem-right {
  height: 40px;
  margin-top: 22px;
  width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 32px;
}
.cartListItem-name {
  font-family: PingFangSC-Medium;
  font-size: 30px;
  color: #454545;
  letter-spacing: 0;
  line-height: 30px;
}
.cartListItem-detail {
  font-family: PingFangSC-Light;
  font-size: 24px;
  color: #999999;
  letter-spacing: 0;
  line-height: 24px;
}
.cartListItem-img {
  width: 40px;
  height: 40px;
  display: inline;
}
.cartListItem-price {
  font-family: PingFangSC-Semibold;
  font-size: 30px;
  color: #ef5350;
  letter-spacing: 0;
  line-height: 30px;
  display: inline;
}
.cartListItem-countImg{
    display: flex;
    width: 120px;
    justify-content: space-between;
    align-items: center;
}
</style>
