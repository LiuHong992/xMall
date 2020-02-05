<template>
  <div ref="vaptcha" style="width: 300pxheight: 36px">
    <div class="vaptcha-init-main">
      <div class="vaptcha-init-loading">
        <a href="/" target="_blank">
          <img src="https://r.vaptcha.com/
public/img/vaptcha-loading.gif" />
        </a>
        <span class="vaptcha-text">VAPTCHA启动中...</span>
      </div>
    </div>
  </div>
</template>

<script>
const extend = function(to, _from) {
  for (const key in _from) {
    to[key] = _from[key];
  }
  return to;
};

export default {
  data() {
    return {};
  },
  components: {},
  props: {
    type: {
      type: String,
      default: "embed"
    },
    scene: {
      type: String,
      default: ""
    },
    vpStyle: {
      type: String,
      default: "dark"
    },
    color: {
      type: String,
      color: "#3C8AFF"
    },
    lang: {
      type: String,
      default: "zh-CN"
    }
  },
  methods: {
    loadV2Script() {
      // console.log("object");
      if (typeof window.vaptcha === "function") {
        //如果已经加载就直接放回
        return Promise.resolve();
      } else {
        return new Promise(resolve => {
          var script = document.createElement("script");
          script.src = "https://cdn.vaptcha.com/v2.js";
          script.async = true;
          script.onload = script.onreadystatechange = function() {
            if (
              !this.readyState ||
              this.readyState == "loaded" ||
              this.readyState == "complete"
            ) {
              resolve();
              script.onload = script.onreadystatechange = null;
            }
          };
          document.getElementsByTagName("head")[0].appendChild(script);
        });
      }
    }
  },
  mounted() {
    let _this = this;
    _this.$emit("is-codes", false);
    this.loadV2Script().then(() => {
      vaptcha({
        vid: "5e39100676cb1970819eab7a",
        container: this.$refs.vaptcha,
        offline_server: "/offline"
      }).then(vaptchaObj => {
        // console.log(vaptchaObj);
        vaptchaObj.render(); //渲染按钮

        //获取token的方式二：
        vaptchaObj.listen("pass", function($) {
          // 验证成功进行后续操作
          _this.$emit("is-codes", true);
          var data = {
            //表单数据
            token: vaptchaObj.getToken()
          };
          // console.log(this.$);
          // $.post("login", data, function(r) {
          //   console.log("object");
          //   if (r.code !== 200) {
          //     console.log("登录失败");
          //     vaptchaObj.reset(); //重置验证码
          //   }
          // });
        });
      });
    });
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.vaptcha-init-main {
  display: table;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}

.vaptcha-init-loading {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.vaptcha-init-loading > a {
  display: inline-block;
  width: 18px;
  height: 18px;
}

.vaptcha-init-loading > a img {
  vertical-align: middle;
}

.vaptcha-init-loading .vaptcha-text {
  font-family: sans-serif;
  font-size: 12px;
  color: #cccccc;
  vertical-align: middle;
}
</style>