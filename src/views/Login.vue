<template>
  <div class="logins">
    <!-- 具体内容层 -->
    <div class="login-content">
      <!-- 标题和LOGO -->
      <div class="title-logo">
        <!-- LOGO -->
        <div class="logos">
          <img src="../assets/images/smartisan_4ada7fecea.png" alt />
        </div>
        <h4>使用 XMall 账号 登录官网</h4>
      </div>
      <!-- 登录表单 -->
      <div class="content">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom">
          <FormItem prop="username">
            <Input v-model="formCustom.username" placeholder="账号" />
          </FormItem>
          <FormItem prop="passwd">
            <Input type="password" v-model="formCustom.passwd" placeholder="密码" />
          </FormItem>
          <!-- 验证码 -->
          <vaptcha class="vapt" @is-codes="isCodes" v-if="hackReset"></vaptcha>
          <!-- 记住密码 -->
          <div class="rem flex">
            <div class="remenber">
              <Checkbox v-model="rember">
                <span>记住密码</span>
              </Checkbox>
            </div>
            <!-- 去注册 -->
            <div class="goregister" @click="$goto('/register')">
              <span>注册 XMall 账号</span>
            </div>
            <!-- 忘记密码？ -->
            <div class="goregister forget">
              <span @click="toastMsg(false)">忘记密码？</span>
            </div>
          </div>
          <!-- 登录按钮 -->
          <div class="log">
            <input
              class="btns loginbtn"
              type="button"
              value="登录"
              @click="logins('formCustom')"
              :disabled="btnFlag"
              :class="{discolor:btnFlag}"
            />
          </div>
          <!-- 返回按钮 -->
          <div class="backto log">
            <input class="btns backbtn" type="button" value="返回" @click="$router.go(-1)" />
          </div>
        </Form>
      </div>
      <!-- 横线 -->
      <div class="borders"></div>
      <!-- 其他方式登录 -->
      <div class="other-footer flex">
        <div class="others">其它账号登录：</div>
        <div class="other-content">
          <img src="../assets/images/other-login.png" alt @click="toastMsg(false)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vaptcha from "../components/Common/Vaptcha";
export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
      } else {
        callback();
      }
    };
    return {
      // 验证码的渲染操作
      hackReset: true,
      // 验证码
      isCode: false,
      // 记住密码
      rember: true,
      formCustom: {
        username: "",
        passwd: ""
      },
      ruleCustom: {
        username: [{ validator: validateUsername, trigger: "click" }],
        passwd: [{ validator: validatePass, trigger: "click" }]
      }
    };
  },
  components: {
    vaptcha
  },
  methods: {
    // 事件分发
    isCodes(flags) {
      this.isCode = flags;
    },
    // 登录按钮
    logins(name) {
      this.$refs[name].validate(valid => {
        if (valid && this.isCode) {
          this.$api
            .login({
              username: this.formCustom.username,
              password: this.formCustom.passwd
            })
            .then(res => {
              if (res.code === 200) {
                this.$Message.success(res.msg);
                if (localStorage.getItem("xmUser")) {
                  localStorage.setItem("xmUser", JSON.stringify(res.data.user));
                } else {
                  localStorage.setItem("xmUser", JSON.stringify(res.data.user));
                }
                this.$goto("/");
              } else {
                this.$Message.warning(res.msg);
                this.reload();
                this.$refs[name].resetFields();
              }
            })
            .catch(err => {});
        } else {
          this.$Message.error("请完成验证！");
        }
      });
    },
    // 重新渲染验证码子组件
    reload() {
      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true;
      });
    },
    // 其他方式登录
    toastMsg(nodesc) {
      this.$Notice.info({
        title: "待开发",
        desc: nodesc ? "" : "此功能开发中..."
      });
    }
  },
  mounted() {},
  watch: {},
  computed: {
    // 注册按钮状态
    btnFlag() {
      let flagss = true;
      if (
        this.formCustom.passwd !== "" &&
        this.formCustom.passwdCheck !== "" &&
        this.formCustom.username !== ""
      ) {
        flagss = false;
      }
      return flagss;
    }
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
.logins {
  min-height: 800px;
  min-width: 630px;
  background: url("../assets/images/bg_9b9dcb65ff.png");
  // 具体内容层
  .login-content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 450px;
    margin-left: -225px;
    margin-top: -200px;
    padding: 0 40px 22px;
    border: 1px solid #dadada;
    border-radius: 10px;
    box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
      0 18px 20px -10px rgba(0, 0, 0, 0.04),
      0 18px 20px -10px rgba(0, 0, 0, 0.04),
      0 10px 20px -10px rgba(0, 0, 0, 0.04);
    background: url("../assets/images/dialog-gray-bg.png") #fff bottom repeat-x;
    // 标题和LOGO
    .title-logo {
      margin: 20px 0 40px;
      .logos {
        width: 145px;
        height: 145px;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      // 标题
      h4 {
        text-align: center;
        color: #333;
        font-size: 20px;
        font-weight: 400;
      }
    }
    // 登录表单
    .content {
      .vapt {
        margin-bottom: 15px;
      }
      // 忘记密码
      .rem {
        // 记住密码
        .remenber {
          color: #999;
        }
        // 去注册
        .goregister {
          margin-left: 80px;
          border-right: 1px solid #ccc;
          span {
            color: #5079d9;
            padding: 1px 10px 0;
            &:hover {
              cursor: pointer;
            }
          }
        }
        // 忘记密码
        .forget {
          margin-left: 0;
          border: none;
          span {
            padding-right: 0;
          }
        }
      }
      // 登录按钮
      .log {
        // 注册按钮禁用
        .discolor {
          background-color: #a9a9a9 !important;
          border: 1px solid #a9a9a9 !important;
          &:hover {
            cursor: not-allowed !important;
          }
        }
        // 登录按钮和返回按钮公共样式
        .btns {
          width: 100%;
          height: 48px;
          border-radius: 4px;
          font-size: 18px;
          line-height: 48px;
          text-align: center;
        }
        // 登录按钮
        .loginbtn {
          margin-top: 25px;
          background-color: #678ee7;
          border: 1px solid #678ee7;
          color: #fff;
          &:hover {
            cursor: pointer;
            background-color: #6c8cd4;
          }
        }
        // 返回按钮
        .backbtn {
          margin-top: 10px;
          margin-bottom: 15px;
          background-color: #f9f9f9;
          background-image: linear-gradient(180deg, #fff, #f9f9f9);
          border: 1px solid #e1e1e1;
          color: #646464;
          &:hover {
            cursor: pointer;
            background-color: #eeeeee;
            background-image: linear-gradient(180deg, #f5f5f5, #eee);
          }
        }
      }
    }
    // 横线
    .borders {
      margin: 10px 0 0;
      border-bottom: 1px solid #ccc;
    }
    // 其他方式登录
    .other-footer {
      .others {
        margin: 20px 5px 0 0;
        color: #999;
        font-size: 12px;
      }
      .other-content {
        width: auto;
        margin-top: 20px;
        img {
          width: 100%;
          height: 17px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>