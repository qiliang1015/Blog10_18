<template>
  <div id="loginBox">
    <div class="leftPic">
      <img src="@/assets/inspic/left.png" alt="" />
    </div>
    <div class="loginForm">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="registerLink">
            <el-link :underline="false" type="default">
              <router-link to="register" class="routerLink"
                >Not Count? ,Let's Register!</router-link
              >
            </el-link>
          </div>
          <el-button type="primary" @click="submitForm('loginForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>



<script>
export default {
  name: "login",
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };

    return {
      loginForm: {
        password: "",
        username: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .get("/login", {
              params: {
                username: this.loginForm.username,
                password: this.loginForm.password,
              },
            })
            .then((res) => {
              if (res.data.status == "200") {
                this.loginMessageBox(res.data.message,"success");
                this.$router.push("/");
              } else {
                this.loginMessageBox(res.data.message, "error");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    loginMessageBox(loginMessage, type) {
      this.$message({
        message: loginMessage,
        type: type,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#loginBox {
  background-color: #019ef9;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .leftPic {
    img {
      width: 700px;
      height: 600px;
    }
  }
  .login-box {
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 50px;

    border-radius: 50px;
    background: #ffffff;
    box-shadow: -20px -20px 60px #0186d4, 20px 20px 60px #01b6ff;
    justify-content: space-around;
    input {
      background-color: transparent;
      border: none;
      border-bottom: #019ef9 3px solid;
      outline: none;
      font-size: 18px;
      height: 22px;
      padding: 5px;
      width: 100%;
    }
    .loginTitle {
      display: flex;
      justify-content: center;
      font-size: 30px;
      margin-bottom: 5px;
    }
    .icon {
      font-size: 40px;
      margin: 10px;
      color: #019ef9;
    }
    .userName {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .userInput::-webkit-input-placeholder {
        color: #47444450;
      }
    }
    .userPassword {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .passwordInput::-webkit-input-placeholder {
        color: #47444450;
      }
    }
    .formButton {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .routerLink {
        text-decoration: none;
        color: rgb(199, 199, 204);
      }
      :hover {
        color: #019ef9;
      }
    }
  }
}
</style>
