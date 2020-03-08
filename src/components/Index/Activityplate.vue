<template>
  <div class="acitivitys-content">
    <!-- 图片内容层 -->
    <div class="image-content fl b-box">
      <!-- 图片模板 -->
      <div
        class="image-model f-1 p-r"
        v-for="(item,index) in activityObj.panelContents"
        :key="index"
      >
        <img class="img model-img" :src="item.picUrl" alt />
        <div class="empty-box p-a"></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  props: {
    activityObj: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.acitivitys-content {
  width: 1220px;
  margin: 20px auto;
  .image-content {
    border: 1px solid rgba(0, 0, 0, 0.14);
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    .image-model {
      height: 200px;
      border-left: 1px solid rgba(0, 0, 0, 0.14);
      .empty-box {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 4;
        &:hover {
          cursor: pointer;
          box-shadow: inset 0 0 38px rgba(0, 0, 0, 0.14);
          transition: all 0.15s ease;
        }
      }
      //   .model-img{
      //       z-index: -1;
      //   }
      &:first-child {
        border-left: none;
      }
    }
  }
}
</style>