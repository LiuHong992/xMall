<template>
  <div class="bg-color">
    <!-- 头部 -->
    <xmheaders :fwcount="fwcount" :specialnum="specialnum"></xmheaders>
    <!-- 排序方式 -->
    <div class="nav">
      <div class="w fl c999">
        <!-- 综合排序按钮 -->
        <div
          class="common-rank multiple"
          :class="[colorNum===0?'skyblues':'']"
          @click="changeColor(0)"
        >综合排序</div>
        <div
          class="common-rank lowup"
          :class="[colorNum===1?'skyblues':'']"
          @click="changeColor(1)"
        >价格从低到高</div>
        <div
          class="common-rank uplow"
          :class="[colorNum===2?'skyblues':'']"
          @click="changeColor(2)"
        >价格从高到低</div>
        <!-- 价格区间 -->
        <div class="pricechange common-rank fl j-c a-c">
          <!-- 最低价框 -->
          <div class="ipt lowest">
            <input
              class="price-ipt t-center"
              v-model="priceGt"
              type="number"
              placeholder="价格"
              min="0"
              max="999999"
            />
          </div>
          <span class="margins">-</span>
          <!-- 最高价框 -->
          <div class="ipt upest">
            <input
              class="price-ipt t-center"
              v-model="priceLte"
              type="number"
              placeholder="价格"
              min="0"
              max="999999"
            />
          </div>
          <!-- 确定按钮 -->
          <div class="sure-btn b-box t-center m-l-10" @click="changePriceRank">确定</div>
        </div>
      </div>
    </div>
    <!-- 排序显示的内容和分页组件 -->
    <div class="ranked-content">
      <!-- 排序之后显示的内容层 -->
      <div class="ranked w fl fl-w b-box p-r">
        <!-- 商品模板 -->
        <div class="good-models" v-for="(item,index) in allDataArr" :key="index">
          <goodmodels :goodmodel="item"></goodmodels>
        </div>
      </div>
      <!-- 分页组件 -->
      <div class="paging-nav w p-r b-box">
        <div class="real-content i-block p-a">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[8, 20, 40, 80]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// 引入vuex帮助助手(分模块开发必用)
import { createNamespacedHelpers } from "vuex";
const goods = createNamespacedHelpers("goods");
const {
  mapState: goodsState,
  mapActions: goodsActions,
  mapMutations: goodsMutations,
  mapGetters: goodsGetters
} = goods;
export default {
  data() {
    return {
      // 字体加粗参数
      fwcount: 1,
      // 控制头部第二部分显示
      specialnum: -1,
      // 排序方式添加字体颜色类名参数
      colorNum: 0,
      // 全部页数据
      // 请求页数
      page: 1,
      // 组件中每页条数
      pageSize: 20,
      // 每页条数
      size: 30,
      // 排序方式 1为升序 -1为降序
      sort: 1,
      // priceGt: 价格区间 从多少开始
      priceGt: null,
      // priceLte: 价格区间 到哪结束
      priceLte: null
    };
  },
  components: {},
  methods: {
    ...mapActions(["getCart"]),
    ...goodsActions(["getGoodsData"]),
    // 点击排序方法相同的结构
    commonFuc() {
      if (this.priceGt !== null && this.priceLte !== null) {
        this.getGoodsData({
          page: this.page,
          size: this.size,
          sort: this.sort,
          priceGt: this.priceGt * 1,
          priceLte: this.priceLte * 1
        });
      } else {
        this.getGoodsData({
          page: this.page,
          size: this.pageSize,
          sort: this.sort,
          priceGt: 0,
          priceLte: 99999
        });
      }
    },
    changeColor(nums) {
      this.colorNum = nums;
      if (this.colorNum === 1) {
        this.sort = 1;
        this.commonFuc();
      } else if (this.colorNum === 2) {
        this.sort = -1;
        this.commonFuc();
      } else {
        this.sort = 1;
        this.commonFuc();
      }
    },
    // 改变页面最大条数
    handleSizeChange(val) {
      this.size = val;
      this.commonFuc();
    },
    // 改变当前页数
    handleCurrentChange(val) {
      this.page = val;
      this.commonFuc();
    },
    // 改变价格区间之后点击确定按钮的操作
    changePriceRank() {
      this.page = 1;
      if (
        this.priceGt !== null &&
        this.priceLte !== null &&
        this.priceGt.trim() !== "" &&
        this.priceLte.trim() !== ""
      ) {
        this.getGoodsData({
          page: this.page,
          size: this.size,
          sort: this.sort,
          priceGt: this.priceGt * 1,
          priceLte: this.priceLte * 1
        });
      } else if (
        (this.priceGt === null && this.priceLte === null) ||
        (this.priceGt.trim() === "" && this.priceLte.trim() === "")
      ) {
        this.getGoodsData({
          page: this.page,
          size: this.pageSize,
          sort: this.sort,
          priceGt: 0,
          priceLte: 99999
        });
      } else {
        this.$message.warning("请输入完整的价格区间~");
      }
    }
  },
  mounted() {
    this.getCart();
    this.getGoodsData({
      page: this.page,
      size: this.pageSize,
      sort: this.sort,
      priceGt: 0,
      priceLte: 99999
    });
  },
  watch: {},
  computed: {
    ...goodsState(["allDataArr", "total"])
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
.nav {
  height: 60px;
  line-height: 60px;
  // 点击变色
  .skyblues {
    color: #5683ea;
  }
  .common-rank {
    cursor: pointer;
    font-size: 12px;
    padding: 0 15px;
    &:hover {
      color: #5683ea;
    }
  }
  // 价格区间
  .pricechange {
    .margins {
      margin: 0 5px;
    }
    .ipt {
      .price-ipt {
        width: 80px;
        height: 30px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background: none;
        outline: none;
      }
    }
    .sure-btn {
      width: 80px;
      height: 30px;
      line-height: 30px;
      border-radius: 4px;
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
.ranked-content {
  .ranked {
    overflow: hidden;
    .good-models {
      width: 25%;
    }
  }
  // 分页组件
  .paging-nav {
    height: 90px;
    overflow: hidden;
    .real-content {
      right: 0;
      margin: 30px 0;
    }
  }
}
</style>