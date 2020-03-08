<template>
  <div class="banners m-auto p-r">
    <el-carousel class="el-banner" :interval="3000" arrow="never">
      <el-carousel-item v-for="(item,index) in bannerObj.panelContents" :key="index">
        <!-- 装图片的盒子 -->
        <div class="cover-image">
          <img class="img cover-1 p-a" :src="item.picUrl" alt />
          <img class="img cover-2 p-a" :src="item.picUrl2" alt v-if="item.picUrl2" />
          <img class="img cover-3 p-a" :src="item.picUrl3" alt v-if="item.picUrl3" />
        </div>
      </el-carousel-item>
    </el-carousel>
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
export default {
  data() {
    return {};
  },

  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {
    ...indexState(["bannerObj"])
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
// 最外层
.banners {
  z-index: 19;
  width: 1220px;
  height: 500px;
  perspective: 3000px;
  cursor: pointer;
  .el-banner {
    margin: 20px auto;
    border-radius: 8px;
    .cover-image {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      .cover-1 {
        z-index: 20;
        border-radius: 8px;
      }
      .cover-2 {
        z-index: 20;
        transform: translateZ(40px);
      }
      .cover-3 {
        z-index: 20;
        transform: translateZ(30px);
      }
    }
  }
}
</style>