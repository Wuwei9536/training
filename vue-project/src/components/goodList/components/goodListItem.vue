<template>
  <div class="goodListItem">
    <img :src="this.img" class="img">
    <div>
      <div class="goodListItem-name">{{this.name}}</div>
      <div class="goodListItem-detail">{{this.detail}}</div>
      <div class="goodListItem-footer">
        <div class="goodListItem-price">
          <span class="goodListItem-￥">￥</span>
          <span>{{this.price}}</span>
        </div>
        <div class="goodListItem-addsub" v-if="this.count">
          <img src="../../../assets/sub.svg" class="goodListItem-img" @click="oper('sub')">
          <div>{{this.count}}</div>
          <img src="../../../assets/add.svg" class="goodListItem-img" @click="oper('add')">
        </div>
        <img src="../../../assets/add.svg" class="goodListItem-add"  @click="oper('add')" v-else>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodListItem",
  props: ["img", "name", "detail", "price", "count","index"],
  methods:{
    oper(oper){
      this.$emit('countChange',oper,this.index)
    }
  },
  // computed:{
  //   show(){
  //    return Boolean(this.count)
  //   }
  // }


  //   computed() {
  //     img = this.img;
  //     name = this.name;
  //     detail = this.detai;
  //     price = this.price;
  //   }
};
</script>

<style scoped>
.goodListItem {
  margin-top: 25px;
  margin-left: 24px;
  display: flex;
  width: 542px;
  height: 180px;
}
.img {
  width: 180px;
  height: 180px;
}
.goodListItem-name {
  font-family: PingFangSC-Medium;
  font-size: 30px;
  color: #454545;
  letter-spacing: 0;
  line-height: 36px;
  margin-top: 10px;
  margin-left: 16px;
}
.goodListItem-detail {
  font-family: PingFangSC-Light;
  font-size: 22px;
  color: #999999;
  letter-spacing: 0;
  line-height: 22px;
  margin-top: 10px;
  margin-left: 16px;
}
.goodListItem-footer {
  display: flex;
}
.goodListItem-price {
  font-family: PingFangSC-Semibold;
  font-size: 30px;
  color: #ef5350;
  letter-spacing: 0;
  line-height: 30px;
  margin-top: 57px;
}
.goodListItem-￥ {
  font-size: 20px;
  margin-left: 16px;
  margin-right: -10px;
}
.goodListItem-addsub {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;
  margin-top: 52px;
  margin-left: 78px;
}
.goodListItem-img {
  width: 40px;
  height: 40px;
}
.goodListItem-add{
   width: 40px;
  height: 40px;
    margin-top: 52px;
  margin-left: 158px;
}
</style>
