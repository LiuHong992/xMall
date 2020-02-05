<template>
  <div class="xm-header">
    <!-- 头部第一部分 -->
    <div class="xm-header-one flex bt">
      <!-- LOGO -->
      <a href="/">
        <div class="header-navone"></div>
      </a>
      <!-- 搜索框等 -->
      <div class="right-box flex">
        <!-- 搜索框 -->
        <div class="searchinpt">
          <Input suffix="ios-search" v-model="Svalue" placeholder="请输入商品信息" style="width: 305px" />
        </div>
        <!-- 全部商品 -->
        <div class="allgoods common-box">
          <span>全部商品</span>
        </div>
        <!-- 捐赠 -->
        <div class="donation common-box">
          <span>捐赠</span>
        </div>
        <!-- 竖线 -->
        <div class="vertical-line"></div>
        <!-- 右边用户信息和购物车图标 -->
        <div class="user-carts flex">
          <div class="users bac"></div>
          <div class="shopcarts flex">
            <div class="carts bac"></div>
            <!-- 购物车内商品件数 -->
            <div class="cartsnum">
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Svalue: ""
    };
  },
  components: {},
  methods: {
    getCarts() {
      this.$api
        .getCart()
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
    this.getCarts();
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.xm-header {
  background-color: #050505;
  // 头部上半部分
  .xm-header-one {
    position: relative;
    max-width: 1220px;
    height: 100px;
    margin: 0 auto;
    align-items: center;
    .header-navone {
      width: 50px;
      height: 40px;
      background: url("../../assets/images/global-logo-red@2x.png") no-repeat;
      background-size: 100%;
      background-position: 0 0;
    }
    .right-box {
      // 公共样式
      .common-box {
        width: 110px;
        text-align: center;
        line-height: 32px;
        color: #c8c8c8;
        transition: all 0.15s ease-out;
        &:hover {
          cursor: pointer;
          color: #fff;
        }
      }
      .allgoods {
        margin-left: 10px;
      }
      .donation {
        margin-left: -10px;
      }
      // 竖线
      .vertical-line {
        width: 1px;
        height: 13px;
        margin-left: 10px;
        margin-top: 10px;
        background-color: #373737;
      }
      // 用户信息和购物车
      .user-carts {
        .bac {
          background: url("../../assets/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png")
            no-repeat;
        }
        .users {
          width: 36px;
          margin-bottom: 5px;
          margin-left: 41px;
          background-position: -60px 6px;
          &:hover {
            cursor: pointer;
            background-position: 0 6px;
          }
        }
        .shopcarts {
          width: 61px;
          margin-left: 21px;
          .carts {
            width: 28px;
            margin-top: 4px;
            background-position: -64px -19px;
            &:hover {
              height: 25px;
              cursor: pointer;
              background-position: -4px -19px;
            }
          }
          .cartsnum {
            width: 20px;
            height: 20px;
            margin-top: 6px;
            border-radius: 50%;
            background-color: #969696;
            color: #fff;
            text-align: center;
            line-height: 20px;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>