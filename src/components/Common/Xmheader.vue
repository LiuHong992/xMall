<template>
  <div class="xm-header b-box">
    <!-- 头部第一部分 -->
    <div class="xm-header-one fl s-b">
      <!-- LOGO -->
      <a href="/">
        <div class="header-navone"></div>
      </a>
      <!-- 搜索框等 -->
      <div ref="xmone" class="right-box fl">
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
        <div ref="ucarts" class="user-carts fl p-r">
          <div class="users bac" @mouseenter="changeCount" @mouseleave="changeCounts" @click="goTo"></div>
          <!-- 隐藏的盒子 -->
          <div
            class="hidden-users"
            @mouseenter="changeCount"
            @mouseleave="changeCounts"
            v-if="username!=='' && count === 1"
          >
            <div class="hidden-content">
              <!-- 顶上的三角 -->
              <div class="triangle"></div>
              <!-- 头像用户名 -->
              <div class="common-hidden-image">
                <!-- 头像 -->
                <div class="portrait">
                  <img src="../../assets/images/user-avatar.png" alt />
                </div>
                <!-- 用户名 -->
                <p>{{username}}</p>
              </div>
              <!-- 我的订单 -->
              <div class="common-hiddens myorder" @click="goTo">
                <p>我的订单</p>
              </div>
              <!-- 账号资料 -->
              <div class="common-hiddens moreinfo" @click="goTo">
                <p>账号资料</p>
              </div>
              <!-- 收货地址 -->
              <div class="common-hiddens address" @click="goTo">
                <p>收货地址</p>
              </div>
              <!-- 售后服务 -->
              <div class="common-hiddens aftersale" @click="goTo">
                <p>售后服务</p>
              </div>
              <!-- 我的优惠 -->
              <div class="common-hiddens discount" @click="goTo">
                <p>我的优惠</p>
              </div>
              <!-- 退出按钮 -->
              <div class="common-hiddens editout" @click="editout">
                <p>退出</p>
              </div>
            </div>
          </div>
          <div class="shopcarts flex">
            <div class="carts bac"></div>
            <!-- 购物车内商品件数 -->
            <div class="cartsnum" :class="cartsNum>0?'cart-num-red':''">
              <span>{{cartsNum}}</span>
            </div>
            <div class="hidden-carts p-a z-999">
              <shopcart class="xm-carts p-r"></shopcart>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 头部第二部分 -->
    <div class="xm-header-two w-100" :class="[ sTop>=100 ? 'h-stick':'']" v-if="specialnum === -1">
      <div ref="xmtwo" class="xm-two-content fl s-b" :class="[ sTop>=100 ? 'h-60':'']">
        <div class="xm-content-left fl">
          <div class="crumbs fl" v-for="(item,index) in crumbArr" :key="index">
            <div class="dotted"></div>
            <a href="javascript:void(0)" @click="changeFont(item.paths)">
              <span :class="{fw:fwcount === index}">{{item.title}}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import shopcart from "./Xmcarts";
export default {
  data() {
    return {
      // 搜索关键词
      Svalue: "",
      // 控制页面添加dom元素的参数
      flag: false,
      // 面包屑数组
      crumbArr: [
        {
          title: "首页",
          paths: "/"
        },
        {
          title: "全部",
          paths: "goods"
        },
        {
          title: "品牌周边",
          paths: ""
        },
        {
          title: "捐赠名单",
          paths: ""
        },
        {
          title: "后台管理系统",
          paths: ""
        },
        {
          title: "XPay支付系统",
          paths: ""
        },
        {
          title: "XBoot开发平台",
          paths: ""
        },
        {
          title: "宣传视频",
          paths: ""
        },
        {
          title: "Github",
          paths: ""
        },
        {
          title: "商用授权",
          paths: ""
        }
      ],
      // 接收存储在localstorage中的用户名
      username: "",
      // 控制隐藏的盒子的显示
      count: 0,
      // 接收页面滚动距离
      sTop: 0
    };
  },
  props: {
    fwcount: {
      type: Number,
      default: 0
    },
    specialnum: {
      type: Number,
      default: 0
    }
  },
  components: {
    shopcart
  },
  methods: {
    ...mapActions(["getCart"]),
    // 监听页面滚动
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.sTop = scrollTop;
      if (scrollTop >= 100) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    // 改变字体
    changeFont(pa) {
      if (pa !== "") {
        this.$router.push(pa);
      } else {
        this.$message({
          message: "该功能暂未开发！",
          type: "warning"
        });
      }
      // this.fwcount = idx;
      // console.log(this.count);
    },
    // 控制盒子的显示隐藏
    changeCount() {
      this.count = 1;
    },
    // 控制盒子的隐藏
    changeCounts() {
      this.count = 0;
    },
    // 退出登录
    editout() {
      localStorage.removeItem("xmUser");
      if (this.fwcount === 0 && this.specialnum === -1) {
        this.$router.go(0);
      } else {
        this.$goto("/");
      }
    },
    // 跳转登录页或者跳转订单页
    goTo() {
      if (this.username === "") {
        this.$router.push("/login");
      } else {
        this.$router.push("/order");
      }
    }
  },
  mounted() {
    this.getCart();
    window.addEventListener("scroll", this.handleScroll);
    if (localStorage.getItem("xmUser")) {
      this.username = JSON.parse(localStorage.getItem("xmUser")).username;
    }
  },
  watch: {
    flag(val) {
      if (this.$refs.xmtwo) {
        if (val) {
          this.$refs.xmtwo.append(this.$refs.ucarts);
        } else {
          this.$refs.xmone.append(this.$refs.ucarts);
        }
      }
    },
    $router(val) {
      if (val.path === "/carts" || val.path === "/payment") {
        this.$refs.xmone.append(this.$refs.ucarts);
      }
    }
  },
  computed: {
    ...mapState(["cartsNum"])
  },
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
    }
  }
  // 用户信息和购物车
  .user-carts {
    .bac {
      position: relative;
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
    // 隐藏的用户信息盒子
    .hidden-users {
      position: absolute;
      top: 24px;
      right: 14px;
      z-index: 30;
      padding-top: 18px;
      &:hover {
        cursor: default;
      }
      .hidden-content {
        width: 168px;
        position: relative;
        padding-top: 20px;
        background: #fff;
        border: 1px solid #d6d6d6;
        border-color: rgba(0, 0, 0, 0.08);
        border-radius: 8px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        text-align: center;
        // 顶部三角形
        .triangle {
          position: absolute;
          left: 45%;
          top: -12px;
          width: 0;
          height: 0;
          border: 6px solid transparent;
          border-bottom-color: #fff;
        }
        // 头像用户名
        .common-hidden-image {
          .portrait {
            width: 46px;
            height: 46px;
            margin: 0 auto 8px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          p {
            margin-bottom: 16px;
            font-size: 12px;
            color: #757575;
            line-height: 1.5;
          }
        }
        // 公共样式
        .common-hiddens {
          height: 44px;
          border-top: 1px solid #f5f5f5;
          line-height: 44px;
          font-size: 12px;
          color: #616161;
          &:hover {
            cursor: pointer;
            background: #fafafa;
          }
        }
      }
    }
    .shopcarts {
      position: relative;
      width: 61px;
      margin-left: 21px;
      &:hover {
        cursor: pointer;
        .carts {
          height: 25px;
          background-position: -4px -19px;
        }
        .hidden-carts {
          display: block;
        }
      }
      .carts {
        width: 28px;
        margin-top: 4px;
        background-position: -64px -19px;
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
      .cart-num-red {
        background-color: #eb746b !important;
      }
      // 隐藏的购物车盒子
      .hidden-carts {
        display: none;
        top: 20px;
        right: 0;
        width: 360px;
        padding-top: 18px;
        .xm-carts {
          border-radius: 8px;
          background-color: #fff;
          border: 1px solid #d6d6d6;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
      }
    }
  }
  // 头部下半部分
  .xm-header-two {
    z-index: 20;
    background: #f7f7f7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    .xm-two-content {
      max-width: 1220px;
      height: 100%;
      padding: 31px 0;
      margin: 0 auto;
      .xm-content-left {
        .crumbs {
          position: relative;
          .dotted {
            position: absolute;
            top: 13px;
            width: 2px;
            height: 2px;
            border-radius: 50%;
            background-color: #bdbdbd;
          }
          &:first-child {
            span {
              margin: 0 20px;
            }
          }
          span {
            line-height: 28px;
            margin: 0 10px 0 12px;
            font-weight: 400;
            color: #666;
            &:hover {
              cursor: pointer;
              color: #5683ea;
            }
          }
          .fw {
            font-weight: 700;
          }
        }
      }
      .user-carts {
        .users {
          background-position: -145px 3px;
          margin-bottom: 0;
          &:hover {
            background-position: -205px 2px;
          }
        }
        .hidden-users {
          top: 20px;
          right: 11px;
        }
        .carts {
          height: 23px;
          background-position: -150px -20px;
          margin-top: 1px;
          &:hover {
            background-position: -210px -20px;
          }
        }
        .cartsnum {
          margin-top: 3px;
        }
      }
    }
  }
  .h-stick {
    position: fixed;
    top: 0;
    height: 60px;
    .h-60 {
      padding: 0;
      align-items: center;
    }
  }
}
</style>