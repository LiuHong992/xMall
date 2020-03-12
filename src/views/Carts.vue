<template>
  <div class="bg-color carts-content">
    <!-- 标准的头部 -->
    <xmheaders :fwcount="fwcount" :specialnum="specialnum"></xmheaders>
    <!-- 具体的购物车内容层 -->
    <div class="fake-content w">
      <!-- 有商品显示的内容层 -->
      <div class="real-content" v-if="changeFlag">
        <!-- 头部标题 -->
        <indexTitle navTitle="购物清单"></indexTitle>
        <!-- 导航栏 -->
        <div class="p-r f-s-12 bar-titles">
          <!-- 此处采用float属性来进行定位,所以就倒着写导航栏 -->
          <!-- 商品信息 -->
          <span class="names">商品信息</span>
          <!-- 操作 -->
          <span>操作</span>
          <!-- 小计 -->
          <span>小计</span>
          <!-- 数量 -->
          <span>数量</span>
          <!-- 单价 -->
          <span>单价</span>
        </div>
        <!-- 下方的商品内容 -->
        <div class="bottom-content p-r">
          <!-- 单个的购物车栏模板 -->
          <div class="cart-gdmodel" v-for="(item,index) in goodsList" :key="index">
            <cartsModel v-if="hackReset" :cartObj="item"></cartsModel>
          </div>
          <!-- 下方的结算框 -->
          <div class="settlement-box p-a w-100 fl s-b b-box">
            <!-- 左边的全选框和删除选中项的按钮 -->
            <div class="left-btns f-s-12 fl">
              <!-- 全选框 -->
              <div class="all-choose">
                <el-checkbox :value="allchecked" @change="changeChecked">全选</el-checkbox>
              </div>
              <!-- 删除选中商品 -->
              <div class="del-checked l-h-20 m-l-20" @click="delChoose">删除选中的商品</div>
            </div>
            <!-- 右边相关商品的信息 -->
            <div class="right-infos fl">
              <!-- 商品件数和总价 -->
              <div class="counts-prices fl m-r-10">
                <!-- 左边的总件数和选中件数 -->
                <div class="c-p counts-item">
                  <h4 class="h-20 l-h-20">
                    已选择
                    <span class="t-center f-w">{{selectCount}}</span>件商品
                  </h4>
                  <h5 class="h-20 l-h-20">
                    共计
                    <span class="f-w">{{cartsNum}}</span>件商品
                  </h5>
                </div>
                <!-- 右边的总价 -->
                <div class="c-p prices-item">
                  <h4 class="h-20 l-h-20">
                    应付总额：
                    <span class="t-center f-w">￥{{selectPrices}}</span>
                  </h4>
                  <h5 class="h-20 l-h-20">应付总额不含运费</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 没有商品时显示的内容 -->
      <div class="none-content" v-else>
        <!-- 头部标题 -->
        <indexTitle navTitle="购物清单"></indexTitle>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import indexTitle from "../components/Common/IndexTitle";
import cartsModel from "../components/Carts/CartsModel";
export default {
  data() {
    return {
      // 字体加粗参数
      fwcount: 0,
      // 控制头部第二部分显示
      specialnum: 0,
      // 子组件重新渲染
      hackReset: true
    };
  },
  components: {
    indexTitle,
    cartsModel
  },
  methods: {
    ...mapActions(["deleteCart"]),
    // 点击全选的方法
    changeChecked(val) {
      this.goodsList.map(item => {
        item.checked = val;
      });
      this.reload();
    },
    // 子组件重新渲染方法
    reload() {
      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true;
      });
    },
    // 删除选中的商品
    delChoose() {
      this.$confirm("您是否删除您选中的商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.goodsList.map(item => {
            if (item.checked) {
              this.deleteCart({ productId: item._id });
            }
          });
          if (this.goodsList.length === 0) {
            this.changeFlag = false;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {},
  watch: {},
  computed: {
    ...mapState(["goodsList", "cartsNum"]),
    // 选中的总件数
    selectCount() {
      let sums = 0;
      this.goodsList.map(item => {
        if (item.checked) {
          sums += item.count;
        }
      });
      return sums;
    },
    // 选中的总价
    selectPrices() {
      let sumprice = 0;
      this.goodsList.map(item => {
        if (item.checked) {
          sumprice += item.count * item.salePrice;
        }
      });
      return sumprice;
    },
    // 全选框状态
    allchecked() {
      let flags = false;
      flags = this.goodsList.every(item => {
        return item.checked === true;
      });
      return flags;
    },
    changeFlag() {
      let flag = true;
      if (this.cartsNum === 0) {
        flag = false;
      }
      return flag
    }
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
.carts-content {
  overflow: hidden;
  .fake-content {
    min-height: 600px;
    padding: 40px 0 25px;
    .real-content {
      margin-bottom: 30px;
      border: 1px solid #dcdcdc;
      border-radius: 8px;
      overflow: hidden;
      .bar-titles {
        height: 38px;
        padding-left: 30px;
        background: #eee;
        border-bottom: 1px solid #dbdbdb;
        border-bottom-color: rgba(0, 0, 0, 0.08);
        line-height: 38px;
        span {
          float: right;
          width: 137px;
          text-align: center;
          color: #838383;
          &:first-child {
            float: left;
            text-align: left;
          }
        }
        .names {
          margin-left: 20px;
        }
      }
      .bottom-content {
        padding-bottom: 91px;
        .settlement-box {
          bottom: 0;
          height: 90px;
          background-position: 50%;
          background: linear-gradient(#fdfdfd, #f9f9f9);
          border-top: 1px solid #e9e9e9;
          box-shadow: 0 -3px 8px rgba(0, 0, 0, 0.04);
          .left-btns {
            padding: 35px 30px;
            .del-checked {
              cursor: pointer;
              color: #bbbbbb;
            }
          }
          .right-infos {
            padding: 20px 30px;
            .counts-prices {
              height: 40px;
              .c-p {
                padding: 0 20px;
                border-left: 1px solid #e1e1e1;
                font-size: 14px;
                span {
                  width: 28px;
                  margin-right: 5px;
                }
                h4 {
                  color: #323232;
                  font-weight: 400;
                  span {
                    color: #d44d44;
                  }
                }
                h5 {
                  text-align: right;
                  color: #959595;
                }
              }
              .counts-item {
                border: none;
              }
            }
          }
        }
      }
    }
    // 没有内容时显示的内容层
    .none-content {
    }
  }
}
</style>