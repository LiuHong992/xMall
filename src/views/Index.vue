<template>
  <div class="bg-color">
    <!-- 头部 -->
    <xmheaders :fwcount="fwcount" :specialnum="specialnum"></xmheaders>
    <!-- 包裹下方内容层的盒子 -->
    <div class="bottom-content">
      <!-- 轮播图 -->
      <banners></banners>
      <!-- 活动板块 -->
      <acitivitys :activityObj="activityObj"></acitivitys>
      <!-- 热门商品 -->
      <hotgoods></hotgoods>
      <!-- 官方精选 -->
      <commons :commonObj="choiceObj" :commonArr="choiceObj.panelContents"></commons>
      <!-- 品牌周边 -->
      <commons :commonObj="hotnearObj" :commonArr="hotnearObj.panelContents"></commons>
      <!-- 品牌精选 -->
      <commons :commonObj="concentrationObj" :commonArr="concentrationObj.panelContents"></commons>
      <!-- 活动板块2 -->
      <acitivitys :activityObj="activetwoObj"></acitivitys>
      <!-- 底部 -->
      <div class="xm-footer">
        <xmfooter></xmfooter>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// 引入vuex帮助助手(分模块开发必用)
import { createNamespacedHelpers } from "vuex";
// 传模块名字
const mainIndex = createNamespacedHelpers("mainIndex");
const {
  mapState: indexState,
  mapActions: indexActions,
  mapMutations: indexMutations,
  mapGetters: indexGetters
} = mainIndex;
import banners from "../components/Index/Banners";
import acitivitys from "../components/Index/Activityplate";
import hotgoods from "../components/Index/HotGoods";
import commons from "../components/Index/OfficialSelected";
import xmfooter from "../components/Common/XmFooter";
export default {
  data() {
    return {
      // 字体加粗参数
      fwcount: 0,
      // 控制头部第二部分显示
      specialnum: -1
    };
  },
  components: {
    banners,
    acitivitys,
    hotgoods,
    commons,
    xmfooter
  },
  methods: {
    ...mapActions(["getCart"]),
    ...indexActions(["getHomeData"])
  },
  mounted() {
    this.getCart();
    this.getHomeData();
  },
  watch: {},
  computed: {
    ...indexState([
      "activityObj",
      "choiceObj",
      "hotnearObj",
      "concentrationObj",
      "activetwoObj"
    ])
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
.bg-color {
  background-color: #ededed;
  .bottom-content {
    overflow: hidden;
  }
  .xm-footer{
    background-color: #fafafa;
  }
}
</style>