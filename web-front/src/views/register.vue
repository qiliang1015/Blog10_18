<template lang="">
    <div id="registerBox">
        <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="registerForm">
            <el-form-item label="用户名" prop="username">
                <el-input type="username" v-model="registerForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="registerForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model="registerForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
                <el-button @click="resetForm('registerForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("用户名不能为空"));
      }else{
        callback()
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("邮箱不能为空"));
      }else{
        callback()
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        pass: "",
        checkPass: "",
        email: "",
        username: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }],
      },
    };
  },
  methods: {

    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios
            .post("/register", {
                username: this.registerForm.username,
                password: this.registerForm.pass,
            })
            // sf sap
            .then((res) => {
              if (res.data.status == "200") {

                this.$router.push("/login");
              } else {
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    // submitForm() {
    //       
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
#registerBox {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .registerForm {
    width: 600px;
  }
}
</style>