<template>
  <div class="hot-goods w">
    <!-- 头部 -->
    <indexTitle :navTitle="hotgoodsObj.name"></indexTitle>
    <!-- 下方内容层 -->
    <div class="hot-content fl p-r">
      <!-- 商品模板 -->
      <div class="f-1" v-for="(item,index) in hotgoodsObj.panelContents" :key="index">
        <goodmodels :goodmodel="item"></goodmodels>
      </div>
    </div>
  </div>
</template>

<script>
// 引入vuex帮助助手(分模块开发必用)
import { createNamespacedHelpers } from "vuex";
// 传模块名字
const mainIndex = createNamespacedHelpers("mainIndex");
const {
  mapState: indexState,
  mapActions: indexActions,
  mapMutations: indexMutations
} = mainIndex;
import indexTitle from "../Common/IndexTitle";
export default {
  data() {
    return {};
  },
  components: {
    indexTitle
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {
    ...indexState(["hotgoodsObj"])
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
.hot-goods {
  .hot-content {
    margin-bottom: 30px;
    border: 1px solid #dcdcdc;
    overflow: hidden;
    border-radius: 0 0 8px 8px;
  }
}
</style>