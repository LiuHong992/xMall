<template>
  <div class="index-title w-100 f-s-18 b-box p-r">
    <h3>{{navTitle}}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    navTitle: {
      type: String,
      default: ""
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
.index-title {
  z-index: 10;
  height: 60px;
  padding: 0 10px 0 24px;
  border-bottom: 1px solid #d4d4d4;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.06);
  background: linear-gradient(#fbfbfb, #ececec);
  color: #626262;
  line-height: 60px;
  font-weight: 400;
}
</style>