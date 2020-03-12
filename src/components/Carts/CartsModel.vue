<template>
  <div class="carts-model p-r">
    <div class="model-item fl">
      <!-- 选择器 -->
      <div class="choose p-a">
        <el-checkbox :checked="cartObj.checked" @change="changeChecked"></el-checkbox>
      </div>
      <!-- 商品图片 -->
      <div class="good-images p-r">
        <img class="img" :src="cartObj.productImageBig" alt />
        <div class="empty-box p-a"></div>
      </div>
      <!-- 商品名 -->
      <div class="good-names t-over m-l-20">{{cartObj.productName}}</div>
      <!-- 删除按钮 -->
      <div class="del-item p-a">
        <div class="del-btns" @click="deleteGood(cartObj._id)"></div>
      </div>
      <!-- 小计 -->
      <div class="subtotal p-a t-center f-w f-s-14">￥{{cartObj.count*cartObj.salePrice}}</div>
      <!-- 计数器 -->
      <div class="counter p-a a-c">
        <el-input-number
          size="mini"
          v-model="cartObj.count"
          @change="changeCount"
          :min="1"
          :max="cartObj.limitNum"
        ></el-input-number>
      </div>
      <!-- 单价 -->
      <div class="unit-price p-a f-s-14 t-center">￥{{cartObj.salePrice}}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    cartObj: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  methods: {
    ...mapActions(["deleteCart", "changeCounts"]),
    // 删除按钮
    deleteGood(p_id) {
      this.deleteCart({ productId: p_id });
    },
    // 点击计数器的方法
    changeCount(currentValue) {
      this.changeCounts({
        productId: this.cartObj._id,
        count: currentValue
      });
    },
    // 复选框change事件
    changeChecked(val) {
      this.cartObj.checked = val;
      // console.log(val);
    }
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.carts-model {
  height: 140px;
  background-color: #fff;
  .model-item {
    height: 100%;
    margin-left: 74px;
    // 复选框
    .choose {
      top: 60px;
      left: 40px;
    }
    .good-images {
      width: 80px;
      height: 80px;
      margin-top: 30px;
      .empty-box {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: 3px;
        border: 0 solid hsla(0, 0%, 100%, 0.1);
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
      }
    }
    .good-names {
      width: 380px;
      line-height: 140px;
      color: #333;
    }
    // 删除按钮
    .del-item {
      width: 137px;
      right: 0;
      .del-btns {
        cursor: pointer;
        width: 20px;
        height: 20px;
        margin: 58px auto 0;
        background: url("../../assets/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png")
          no-repeat;
        background-position: -50px -60px;
        &:hover {
          background-position: -75px -60px;
        }
      }
    }
    // 小计
    .subtotal {
      right: 137px;
      width: 137px;
      line-height: 140px;
      color: #666;
    }
    // 计数器
    .counter {
      right: 274px;
      width: 137px;
      line-height: 140px;
    }
    // 单价
    .unit-price {
      right: 411px;
      width: 137px;
      line-height: 140px;
      color: #666;
    }
  }
}
</style>