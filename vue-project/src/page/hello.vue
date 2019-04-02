<template>
  <div class="menuapp">
    <div class="menu">
      <template v-for="(item,index) in menuItems">
        <MenuItem
          :itemName="item.name"
          :key="index"
          :index="index"
          @active="active"
          :isActive="item.isActive"
        />
      </template>
    </div>
    <router-view :goodListItems="goodListItems" @countChange="countChange"/>
    <div class="footer"></div>
    <div class="circle"></div>
    <template v-if="!totalCount">
      <div class="circle-cart">
        <img src="../assets/cart.svg" class="cart">
      </div>
      <div class="footer-noGoods">您还未选购商品</div>
      <div class="footer-buy">
        <span class="footer-buy-text">去下单</span>
      </div>
    </template>
    <template v-else>
      <div class="circle-cart" style="background-color:#B88F64" @click="showMaskLayer">
        <img src="../assets/cart-color.svg" class="cart">
      </div>
      <div class="circle-count">
        <span style="color:#FFFFFF">{{totalCount}}</span>
      </div>
      <div class="total-price">
        <span class="total-price-￥">￥</span>
        {{totalPrice}}
      </div>
      <div class="footer-buy" style="background-color:#B88F64">
        <span class="footer-buy-text" style="color:#FFFFFF">去下单</span>
      </div>
    </template>

    <template v-if="maskLayer">
      <div class="maskLayer"></div>
      <div class="cart-goods">
        <div class="cart-goods-title">
          <div class="cart-goods-title-text">已选商品</div>
          <div class="cart-goods-title-clear" @click="clear">
            <img src="../assets/clear.svg" class="clear-img">清空
          </div>
        </div>
        <template v-for="(item,index) in cartListItems">
          <CartListItem
            :name="item.name"
            :detail="item.detail"
            :count="item.count"
            :price="item.price"
            :key="index"
            :index="index"
            @countChange="countChange"
          />
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import MenuItem from "../components/menuItem";
import CartListItem from "../components/cartListItem";
export default {
  name: "Hello",
  components: {
    MenuItem,
    CartListItem
  },
  computed: {
    ...mapState({
      menuItems: state => state.cart.menuItems,
      goodListItems: state => state.cart.goodListItems,
      cartListItems: state => state.cart.cartListItems,
      maskLayer: state => state.cart.maskLayer
    }),
    totalCount() {
      let totalCount = 0;
      for (let i in this.cartListItems) {
        totalCount += this.cartListItems[i].count;
      }
      return totalCount;
    },
    totalPrice() {
      let totalPrice = 0;
      for (let i in this.cartListItems) {
        totalPrice += this.cartListItems[i].count * this.cartListItems[i].price;
      }
      return totalPrice;
    }
  },
  methods: {
    ...mapActions([
      "changeGoodListItems",
      "addCount",
      "subCount",
      "changeMaskLayer",
      "clearCartListItems",
      "menuItemStatus"
    ]),
    active(index) {
      let number = index ? index : "";
      this.$router.push("/" + number);
      // this.$store.dispatch('changeGoodListItems',index)
      this.changeGoodListItems(index);
      this.menuItemStatus(index);
    },
    countChange(oper, index, type) {
      let payload = {
        index,
        type
      };
      if (oper === "add") {
        this.addCount(payload);
      } else {
        this.subCount(payload);
      }
    },
    showMaskLayer() {
      if (this.maskLayer) {
        this.changeMaskLayer(false);
      } else {
        this.changeMaskLayer(true);
      }
    },
    clear() {
      this.clearCartListItems();
    }
  }
};
</script>

<style scoped>
.menuapp {
  height: 100%;
  width: 100%;
  display: flex;
}
.menu {
  width: 184px;
  height: 100%;
  background: #f8f8f8;
}

.footer {
  background: #333333;
  height: 128px;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 2;
}
.circle {
  height: 138px;
  width: 138px;
  background: #333333;
  position: fixed;
  bottom: 19px;
  left: 29px;
  border-radius: 50%;
  z-index: 2;
}
.circle-cart {
  height: 104px;
  width: 104px;
  position: fixed;
  bottom: 36px;
  left: 46px;
  background: #5b5b5b;
  border: 1px solid #333333;
  border-radius: 50%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cart {
  height: 61px;
  width: 54px;
}
.maskLayer {
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.4;
  background: #000000;
}
.cart-goods {
  position: fixed;
  bottom: 128px;
  width: 100%;
}
.cart-goods-title {
  height: 100px;
  background: #ffffff;
  box-shadow: 0 -5px 10px 0 rgba(0, 0, 0, 0.05);
  border-bottom: 2px solid #d8d8d8;
  display: flex;
  justify-content: space-between;
}
.cart-goods-title-text {
  font-family: PingFangSC-Light;
  font-size: 36px;
  color: #454545;
  letter-spacing: 0;
  text-align: center;
  line-height: 36px;
  margin-top: 32px;
  margin-left: 32px;
}
.cart-goods-title-clear {
  font-family: PingFangSC-Light;
  font-size: 30px;
  color: #999999;
  letter-spacing: 0;
  text-align: right;
  line-height: 30px;
  margin-top: 32px;
  margin-right: 32px;
}
.clear-img {
  width: 22px;
  height: 22px;
  margin-right: 10px;
}
.circle-count {
  background: #ef5350;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 108px;
  left: 111px;
  z-index: 3;
}
.footer-noGoods {
  position: fixed;
  bottom: 45px;
  left: 184px;
  font-family: PingFangSC-Light;
  font-size: 30px;
  color: #c1c1c1;
  letter-spacing: 0;
  line-height: 30px;
  z-index: 2;
}
.footer-buy {
  position: fixed;
  width: 210px;
  height: 80px;
  left: 508px;
  bottom: 20px;
  /* opacity: 0.2; */
  background: rgb(255, 254, 254, 0.2);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.footer-buy-text {
  font-family: PingFangSC-Medium;
  font-size: 30px;
  color: #c1c1c1;
  letter-spacing: 0;
  line-height: 30px;
}
.total-price {
  position: fixed;
  left: 184px;
  bottom: 36px;
  font-family: PingFangSC-Semibold;
  font-size: 48px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 48px;
  z-index: 2;
}
.total-price-￥ {
  font-size: 30px;
  margin-right: -10px;
}
</style>

<style>
* {
  padding: 0;
  margin: 0;
}
html {
  width: 100%;
  height: 100%;
}
body {
  width: 100%;
  height: 100%;
}
</style>

