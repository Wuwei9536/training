<template>
  <div class="goodList">
    <template v-for="(item,index) in this.goodListItems">
      <GoodListItem
        :img="item.img"
        :name="item.name"
        :detail="item.detail"
        :price="item.price"
        :count="item.count"
        :key="index"
        :index="index"
        @countChange="countChange"
      />
    </template>
  </div>
</template>
<script>
import GoodListItem from "./components/goodListItem";
export default {
  name: "GoodList",
  components: {
    GoodListItem
  },
  props: ["goodListItems"],
  methods:{
    countChange(oper,index){
      this.$emit('countChange',oper,index,1)
    }
  }
};
</script>
<style scoped>
.goodList{
    overflow: scroll;
    margin-bottom: 140px;
}
</style>
