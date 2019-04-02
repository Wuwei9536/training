<template>
  <div class="menuItem" :class="this.isActive?color:''" @click="active">{{this.itemName}}</div>
</template>
<script>
export default {
  name: "MenuItem",
  props: ["itemName", "index", "isActive"],
  data() {
    return {
      color: 'isActive'
    };
  },
  methods: {
    active() {
      this.$emit("active", this.index);
    }
  }
};
</script>
<style scoped>
.isActive {
  color: #B88F64 !important;
  background: #FFFFFF;
}
.menuItem {
  widows: 184px;
  height: 118px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: PingFangSC-Light;
  font-size: 30px;
  color: #454545;
  letter-spacing: 0;
  line-height: 30px;
}

</style>
