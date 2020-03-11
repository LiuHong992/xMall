<template>
  <div class="good-model">
    <!-- 商品图片 -->
    <div class="good-cover" @click="$goto('/details',goodmodel.productId)">
      <img class="img" :src="goodmodel.productImageBig" alt />
    </div>
    <!-- 商品名 -->
    <h6 class="good-name t-center">{{goodmodel.productName}}</h6>
    <!-- 商品描述 -->
    <h3 class="good-desc t-center f-s-12 p-10 t-over">{{goodmodel.subTitle}}</h3>
    <!-- 商品价格(两个按钮) -->
    <div class="good-price h-30 l-h-30 t-center f-w f-s-18">
      <!-- 两个按钮 -->
      <div class="two-btns a-c f-center f-s-12">
        <!-- 查看详情按钮 -->
        <div class="look-info c-btn" @click="$goto('/details',goodmodel.productId)">查看详情</div>
        <!-- 加入购物车按钮 -->
        <div class="add-cart c-btn" @click="addCarts(goodmodel.productId)">加入购物车</div>
      </div>
      <!-- 价格 -->
      <p class="prices">￥{{goodmodel.salePrice | fixedTwo}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    goodmodel: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  methods: {
    ...mapActions(["addCart"]),
    // 加入购物车
    addCarts(pid) {
      this.addCart({ productId: pid, count: 1 });
    }
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {
    fixedTwo(value) {
      return value.toFixed(2);
    }
  }
};
</script>

<style scoped lang='scss'>
.good-model {
  height: 430px;
  background-color: #fff;
  overflow: hidden;
  transition: all 0.5s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 1px 1px 20px #999;
    .good-price {
      .prices {
        display: none;
      }
      .two-btns {
        display: block;
        display: flex;
      }
    }
  }
  .good-cover {
    width: 206px;
    height: 206px;
    margin: 50px auto 10px;
    cursor: pointer;
  }
  .good-name {
    line-height: 1.2;
    padding: 0 14px;
    color: #424242;
    overflow: hidden;
  }
  .good-desc {
    line-height: 1.2;
    color: #d0d0d0;
  }
  .good-price {
    margin: 15px 0;
    color: #d44d44;
    .prices {
      display: block;
    }
    .two-btns {
      display: none;
      // 公共样式
      .c-btn {
        cursor: pointer;
        margin: 0 5px;
        padding: 0 25px;
        border-radius: 4px;
        font-weight: normal;
      }
      .look-info {
        border: 1px solid #e1e1e1;
        color: #646464;
        background-color: #f9f9f9;
        background-image: linear-gradient(180deg, #fff, #f9f9f9);
        &:hover {
          background-color: #eee;
          background-image: linear-gradient(180deg, #f5f5f5, #eee);
        }
      }
      .add-cart {
        border: 1px solid #5c81e3;
        color: #fff;
        background-color: #678ee7;
        background-image: linear-gradient(180deg, #678ee7, #5078df);
        &:hover {
          background-color: #6c8cd4;
          background-image: linear-gradient(180deg, #6c8cd4, #4769c2);
        }
      }
    }
  }
}
</style>