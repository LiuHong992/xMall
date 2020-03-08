<template>
  <div class="xm-carts-content p-r">
    <!-- 顶上的三角 -->
    <div class="triangle p-a"></div>
    <!-- 显示的内容层(购物车内没有商品的时候显示) -->
    <div class="nogoods-content" v-if="cartsNum === 0"></div>
    <!-- 购物车内有数据时显示的内容 -->
    <div class="goods-content" v-else>
      <!-- 上方的商品展示栏 -->
      <div class="carts-cont">
        <!-- 商品模板 -->
        <div class="good-model p-20 fl p-r" v-for="(item,index) in goodsList" :key="index">
          <!-- 左边的商品图片 -->
          <div class="left-image">
            <img class="img left-img" :src="item.productImageBig" alt />
          </div>
          <!-- 中间的商品名价格和数量 -->
          <div class="center-infos">
            <!-- 商品名 -->
            <div class="good-name t-over f-s-14">{{item.productName}}</div>
            <!-- 商品价格和数量 -->
            <div class="good-prnum fl m-t-20 f-s-12 f-w">
              <!-- 价格 -->
              <div class="prices">￥ {{item.salePrice}}</div>
              <!-- 数量 -->
              <div class="count m-l-10">x {{item.count}}</div>
            </div>
          </div>
          <!-- 右边的删除按钮 -->
          <div class="delete-btn p-a"></div>
        </div>
      </div>
      <!-- 下方的结算信息 -->
      <div class="account-infos p-20 p-r">
        <!-- 商品件数 -->
        <div class="total-count f-s-12">共 {{cartsNum}} 件商品</div>
        <!-- 总价 -->
        <div class="total-price f-s-14 l-h-20">
          合计：
          <span class="sp-color f-s-12">￥</span>
          <span class="sp-color f-s-18">{{cartsSum}}</span>
        </div>
        <!-- 跳转购物车按钮 -->
        <div class="goto-carts p-a t-center f-s-14">去购物车</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {
    ...mapState(["goodsList", "cartsSum", "cartsNum"])
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
.xm-carts-content {
  position: relative;
  width: 100%;
  max-height: 620px !important;
  // 顶部三角形
  .triangle {
    right: 11.5%;
    top: -12px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-bottom-color: #fff;
  }
  // 购物车内没有商品时显示的内容
  .nogoods-content {
    height: 313px;
  }
  // 购物车内有商品时显示的内容
  .goods-content {
    .carts-cont {
      overflow-x: hidden;
      overflow-y: auto;
      .good-model {
        transition: all 0.15s ease-out;
        &:hover {
          background-color: #fcfcfc;
          border-radius: 8px;
          .delete-btn {
            display: block;
            &:hover {
              background-position: -75px -60px;
            }
          }
        }
        .left-image {
          width: 80px;
          height: 80px;
          border: 1px solid #ccc;
          border-radius: 3px;
          .left-img {
            border-radius: 3px;
          }
        }
        // 中间内容层
        .center-infos {
          width: 205px;
          margin-left: 14px;
          padding: 12px 0;
          .good-name {
            color: #5079d9;
          }
          .good-prnum {
            .prices {
              color: #d44d44;
            }
            .count {
              color: #cacaca;
            }
          }
        }
        // 删除按钮
        .delete-btn {
          display: none;
          top: 40%;
          right: 20px;
          width: 20px;
          height: 20px;
          background: url("../../assets/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png")
            no-repeat;
          background-position: -50px -60px;
        }
      }
    }
    // 结算信息
    .account-infos {
      height: 40px;
      border-top: 1px solid #f0f0f0;
      border-radius: 0 0 8px 8px;
      box-shadow: inset 0 -1px 0 hsla(0, 0%, 100%, 0.5),
        0 -3px 8px rgba(0, 0, 0, 0.04);
      background: linear-gradient(#fafafa, #f5f5f5);
      &:hover {
        cursor: default;
      }
      .total-count {
        color: #c1c1c1;
        margin-bottom: 4px;
      }
      .total-price {
        color: #6f6f6f;
        .sp-color {
          font-weight: 700;
          color: #de4037;
          margin-right: 5px;
        }
      }
      // 跳转去购物车
      .goto-carts {
        top: 20px;
        right: 20px;
        height: 40px;
        padding: 0 26px;
        border-radius: 4px;
        line-height: 40px;
        color: #fff;
        background-color: #6087e4;
        &:hover {
          cursor: pointer;
          background-color: #6c8cd4;
          background-image: linear-gradient(180deg, #6c8cd4, #4769c2);
        }
      }
    }
  }
}
</style>