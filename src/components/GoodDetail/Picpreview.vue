<template>
  <div class="images-preview fl" v-if="pics.length>0">
    <!-- 最左边的小图(可点击切换大图预览图) -->
    <div class="left-small">
      <ul>
        <li
          class="b-box m-t-10"
          :class="[borderNum===index?'crude-b':'']"
          v-for="(item,index) in pics"
          :key="index"
          @click="changeImgs(index)"
        >
          <img class="img" :src="item" alt />
        </li>
      </ul>
    </div>
    <!-- 右边的大图预览图 -->
    <div class="right-big">
      <!-- 外层包裹的div -->
      <div class="pre-image m-l-20">
        <img class="pre-img" :src="pics[borderNum]" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 给小图框添加边框的参数
      borderNum: 0
    };
  },
  props: {
    pics: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {
    // 点击图片时添加类名并改变展示的大图
    changeImgs(idx) {
      this.borderNum = idx;
    }
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.images-preview {
  .left-small {
    ul {
      li {
        width: 80px;
        height: 80px;
        padding: 12px;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.06);
        &:first-child {
          margin-top: 0;
        }
      }
      // 粗边框
      .crude-b {
        padding: 10px;
        border: 3px solid rgba(0, 0, 0, 0.2);
      }
    }
  }
  // 右边的预览图
  .right-big {
    .pre-image {
      .pre-img {
        width: 440px;
        height: 440px;
      }
    }
  }
}
</style>