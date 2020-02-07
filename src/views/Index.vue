<template>
  <div>
    <!-- 头部 -->
    <xmheaders :fwcount="fwcount" :specialnum="specialnum"></xmheaders>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 字体加粗参数
      fwcount: 0,
      // 控制头部第二部分显示
      specialnum: -1
    };
  },
  components: {},
  methods: {
    // 获取购物车数据
    getHomes() {
      this.$api
        .getHome()
        .then(res => {
          if (res.code === 200) {
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getHomes();
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
</style>