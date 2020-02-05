<template>
  <div class="registers">
    <!-- 具体内容层 -->
    <div class="register-content">
      <!-- 标题 -->
      <h4>注册 XMall 账号</h4>
      <!-- 具体注册相关组件 -->
      <div class="register-mains">
        <!-- 账号密码验证码 -->
        <div class="common-form">
          <Form ref="formCustom" :model="formCustom" :rules="ruleCustom">
            <FormItem prop="username">
              <Input placeholder="账号" v-model="formCustom.username" />
            </FormItem>
            <FormItem prop="passwd">
              <Input type="password" placeholder="密码" v-model="formCustom.passwd" />
            </FormItem>
            <FormItem prop="passwdCheck">
              <Input type="password" placeholder="重复密码" v-model="formCustom.passwdCheck" />
            </FormItem>
            <!-- 验证码 -->
            <vaptcha class="vapt" @is-codes="isCodes" v-if="hackReset"></vaptcha>
            <!-- 声明和隐私条款 -->
            <div class="agree flex">
              <Checkbox v-model="single">
                <span class="agree-sp">
                  我已阅读并同意遵守
                  <a href="#">法律声明</a>和
                  <a href="#">隐私条款</a>
                </span>
              </Checkbox>
            </div>
            <!-- 注册按钮 -->
            <div class="reg">
              <input
                class="register-btn"
                type="button"
                value="注册"
                @click="registers('formCustom')"
                :disabled="btnFlag"
                :class="{discolor:btnFlag}"
              />
            </div>
          </Form>
          <!-- 横线 -->
          <div class="borders"></div>
          <!-- 去登录 -->
          <div class="gologin">
            <span>如果您已拥有 XMall 账号，则可在此</span>
            <span class="logins" @click="$goto('/login')">登陆</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vaptcha from "../components/Common/Vaptcha";
export default {
  name: "register",
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
    // 确认密码
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
      } else if (value !== this.formCustom.passwd) {
        this.$Message.warning("两次输入的密码不相同");
      } else {
        callback();
      }
    };
    return {
      formCustom: {
        passwd: "",
        passwdCheck: "",
        username: ""
      },
      // 验证码
      isCode: false,
      // 验证码的渲染操作
      hackReset: true,
      // 隐私条款
      single: false,
      ruleCustom: {
        passwd: [{ validator: validatePass, trigger: "click" }],
        passwdCheck: [{ validator: validatePassCheck, trigger: "click" }],
        username: [{ validator: validateUsername, trigger: "click" }]
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
    // 注册按钮
    registers(name) {
      this.$refs[name].validate(valid => {
        if (valid && this.isCode && this.single) {
          this.$api
            .register({
              username: this.formCustom.username,
              password: this.formCustom.passwd
            })
            .then(res => {
              if (res.code === 200) {
                this.$Message.success(res.msg);
              } else {
                this.$Message.error(res.msg);
                this.reload();
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else if (valid && !this.isCode && this.single) {
          this.$Message.error("请完成验证!");
        } else if (valid && this.isCode && !this.single) {
          this.$Message.error("您未勾选同意我们的相关注册协议!");
        } else {
          this.$Message.error("请完成验证并且勾选相关注册协议");
        }
      });
    },
    // 重新渲染验证码子组件
    reload() {
      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true;
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
.registers {
  min-height: 800px;
  min-width: 630px;
  background: url("../assets/images/bg_9b9dcb65ff.png");
  .register-content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 450px;
    margin-left: -225px;
    margin-top: -180px;
    border: 1px solid #dadada;
    border-radius: 10px;
    box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
      0 18px 20px -10px rgba(0, 0, 0, 0.04),
      0 18px 20px -10px rgba(0, 0, 0, 0.04),
      0 10px 20px -10px rgba(0, 0, 0, 0.04);
    background: url("../assets/images/dialog-gray-bg.png") #fff bottom repeat-x;
    // 标题
    h4 {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #dcdcdc;
      text-align: center;
      font-size: 20px;
      font-weight: 700;
      color: #666;
    }
    // 具体相关组件
    .register-mains {
      margin-top: 20px;
      padding: 0 40px 22px;
      // 账号密码验证码
      .common-form {
        .vapt {
          margin-bottom: 24px;
        }
        // 隐私条款
        .agree {
          margin-bottom: 30px;
          color: #999;
          .agree-sp {
            margin-left: 4px;
          }
        }
        // 注册按钮
        .reg {
          margin-bottom: 30px;
          // 注册按钮禁用
          .discolor {
            background-color: #a9a9a9 !important;
            border: 1px solid #a9a9a9 !important;
            &:hover {
              cursor: not-allowed !important;
            }
          }
          .register-btn {
            width: 100%;
            height: 48px;
            background-color: #678ee7;
            border: 1px solid #678ee7;
            border-radius: 4px;
            font-size: 18px;
            color: #fff;
            line-height: 48px;
            text-align: center;
            &:hover {
              cursor: pointer;
              background-color: #6c8cd4;
            }
          }
        }
        // 横线
        .borders {
          margin: 10px 0;
          border-bottom: 1px solid #ccc;
        }
        // 去登录
        .gologin {
          height: 48px;
          font-size: 12px;
          line-height: 48px;
          color: rgb(153, 153, 153);
          text-align: center;
          .logins {
            margin-left: 5px;
            color: #5079d9;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>