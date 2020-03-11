<template>
  <div class="bg-color detail-cont">
    <!-- 标准的头部 -->
    <xmheaders :fwcount="fwcount" :specialnum="specialnum"></xmheaders>
    <!-- 商品购买的详情盒子 -->
    <div class="buygood-content w" v-if="goodDetail.success">
      <!-- 详情盒子 -->
      <div class="maininfo-content fl">
        <!-- 左边的图片预览盒子 -->
        <picpreview :pics="goodDetail.result.productImageSmall"></picpreview>
        <!-- 右边的各种按钮 -->
        <div class="right-content m-l-10">
          <!-- 商品名和详情以及单价 -->
          <div class="first-box p-r">
            <!-- 商品名 -->
            <h4 class="good-name">{{goodDetail.result.productName}}</h4>
            <!-- 商品详情和商品单价 -->
            <div class="info-price fl s-b">
              <!-- 商品详情 -->
              <span class="info-item f-s-14">{{goodDetail.result.subTitle}}</span>
              <!-- 商品单价 -->
              <div class="price-item fl">
                <span class="f-s-14 sp-y f-w">￥</span>
                <span class="sp-price f-w">{{goodDetail.result.salePrice | prices}}</span>
              </div>
            </div>
          </div>
          <!-- 改变购买个数(步进器) -->
          <div class="sec-box a-c fl">
            <!-- 数量文字 -->
            <div class="num-text m-r-20 f-s-14">数量</div>
            <el-input-number
              v-model="num"
              @change="handleChange"
              :min="1"
              :max="goodDetail.result.limitNum"
              label="描述文字"
            ></el-input-number>
          </div>
          <!-- 按钮 -->
          <div class="third-box">
            <!-- 加入购物车 -->
            <el-button type="primary" @click="addToCart(goodDetail.result.productId)">加入购物车</el-button>
            <!-- 现在购买 -->
            <el-button class="m-l-10">现在购买</el-button>
          </div>
        </div>
      </div>
      <!-- 下方的商品详情 -->
      <div class="good-infos">
        <!-- 小标题 -->
        <indexTitle navTitle="产品信息"></indexTitle>
        <!-- 信息 -->
        <div class="main-info" v-html="goodDetail.result.detail"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import picpreview from "../components/GoodDetail/Picpreview";
import indexTitle from "../components/Common/IndexTitle";
export default {
  data() {
    return {
      // 字体加粗参数
      fwcount: 2,
      // 控制头部第二部分显示
      specialnum: -1,
      // 步进器数据
      num: 1
    };
  },
  components: {
    picpreview,
    indexTitle
  },
  methods: {
    ...mapActions(["getGoodInfo", "addCart", "getCart"]),
    // 步进器方法
    handleChange(value) {
      this.num = value;
      console.log(this.num);
    },
    // 加入购物车按钮
    addToCart(pid) {
      this.addCart({
        productId: pid,
        count: this.num
      });
    }
  },
  mounted() {
    this.getGoodInfo(this.$route.query.items);
  },
  watch: {},
  computed: {
    ...mapState(["goodDetail"])
  },
  filters: {
    prices(val) {
      return val.toFixed(2);
    }
  }
};
</script>

<style scoped lang='scss'>
.detail-cont {
  .buygood-content {
    min-height: 600px;
    padding: 0 0 25px;
    .maininfo-content {
      padding: 60px;
      margin: 20px 0;
      border-radius: 8px;
      background-color: #fff;
      // 右边的各种按钮
      .right-content {
        width: 450px;
        .first-box {
          overflow: hidden;
          padding: 8px 6px 18px;
          .good-name {
            font-size: 24px;
            color: #000;
            font-weight: 400;
            line-height: 1.25;
            margin-bottom: 13px;
          }
          .info-price {
            .info-item {
              line-height: 1.5;
              color: #bdbdbd;
            }
            .price-item {
              color: #d44d44;
              .sp-y {
                line-height: 32px;
              }
              .sp-price {
                font-size: 24px;
              }
            }
          }
        }
        // 购买个数(步进器)
        .sec-box {
          padding: 29px 0 18px 10px;
          border-top: 1px solid #ebebeb;
          .num-text {
            color: #8d8d8d;
          }
        }
        .third-box {
          border-top: 1px solid #ebebeb;
          padding: 30px 0 0 10px;
        }
      }
    }
    .good-infos {
      .main-info {
        background-color: #fff;
        border-radius: 0 0 8px 8px;
      }
    }
  }
}
</style>