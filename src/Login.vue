<template xmlns="http://www.w3.org/1999/html">
  <div id="login"
       v-bind:style="{backgroundImage:'url('+backgroundImg+')',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%'}">
    <div class="loginForm"
         v-bind:style="{backgroundImage:'url('+loginFormBackground+')',backgroundSize: '205px 210px'}">
      <form>
        <label>
          <input class="username" type="text" v-model="loginForm.username" placeholder="用户名">
        </label>
        <br>
        <label>
          <input class="password" type="password" v-model="loginForm.password" placeholder="密码">
        </label>
        <div class="loginButton">
          <label class="loginErrInfo">{{ message }}</label>
          <a href="#" @click="doLogin" title="登录"><img v-bind:src="loginButton" width="70px" height="30px"></a>
          <a href="#" @click="resetForm" title="重置"><img v-bind:src="resetButton" width="70px" height="30px"></a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      backgroundImg: require("@/assets/img/fotile.jpg"),
      loginFormBackground: require('@/assets/img/loginForm.png'),
      loginButton: require('@/assets/img/login.png'),
      resetButton: require('@/assets/img/reset.png'),
      loginForm: {
        username: '',
        password: ''
      },
      message: ''
    }
  },
  methods: {
    //登录方法
    doLogin() {
      this.$axios.post('/login', this.loginForm).then(res => {
        if (res.data.code === 1) {
          this.$store.commit("putUser", res.data.data)
          this.$router.push('/orderList')
        }
        if (res.data.code === 2) {
          this.message = res.data.message;
        }

      })
    },
    //重置表单
    resetForm() {
      this.loginForm.username = ''
      this.loginForm.password = ''
    },
  }

}
</script>

<style scoped>
#login {
  width: 100%;
  height: 100%;
}

.loginForm {
  position: absolute;
  width: 205px;
  height: 210px;
  font-size: 16px;
  margin-top: 20%;
  margin-left: 75%;
}

form {
  margin-top: 40px;
  width: 100%;
  height: 100%;
}

.username, .password {
  background-color: transparent;
  position: absolute;
  margin-left: 50px;
  border: none;
  outline: none;
  color: #fff;
  height: 20px;
}

.password {
  margin-top: 17px;
}

.loginButton {
  margin-top: 60px;
  margin-left: 35px;
}

.loginErrInfo {
  color: red;
}
</style>