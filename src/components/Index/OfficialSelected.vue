<template>
  <div class="common-content w">
    <!-- 头部 -->
    <indexTitle :navTitle="commonObj.name"></indexTitle>
    <!-- 下方具体内容层 -->
    <div class="commons-cont fl fl-w w-100 p-r">
      <!-- 左上方图片 -->
      <div class="leftup-image p-r" v-if="commonArr.length>0">
        <img class="img" :src="commonArr[0].productImageBig" alt />
        <div class="empty-box p-a"></div>
      </div>
      <!-- 商品模板 -->
      <div class="f-1" v-for="(item,index) in commonArr.slice(1)" :key="index">
        <goodmodel :goodmodel="item"></goodmodel>
      </div>
    </div>
  </div>
</template>

<script>
import indexTitle from "../Common/IndexTitle";
import goodmodel from "../Common/IndexGood";
export default {
  data() {
    return {};
  },
  props: {
    commonObj: {
      type: Object,
      default: () => {}
    },
    commonArr: {
      type: Array,
      default: () => []
    }
  },
  components: {
    indexTitle,
    goodmodel
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.common-content {
  margin-bottom: 30px;
  .commons-cont {
    overflow: hidden;
    border-radius: 0 0 8px 8px;
    .leftup-image {
      cursor: pointer;
      width: 50%;
      height: 430px;
      .empty-box {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 4;
        &:hover {
          box-shadow: inset 0 0 38px rgba(0, 0, 0, 0.08);
          transition: all 0.15s ease;
        }
      }
    }
  }
}
</style>