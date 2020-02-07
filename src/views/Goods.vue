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
      fwcount: 1,
      // 控制头部第二部分显示
      specialnum: -1
    };
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
</style>