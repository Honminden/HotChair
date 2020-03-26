<template>
  <div id="base_login">
    <el-form :model="loginForm" :rules="rules" class="login_container" label-position="left"
              label-width="100px" v-loading="loading">
      <h3 class="login_title">Login</h3>
      <el-form-item label="username" prop="username">
        <el-input type="text" v-model="loginForm.username" 
                  auto-complete="off" placeholder="username"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input type="password" v-model="loginForm.password" 
                  auto-complete="off" placeholder="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="login">login</el-button>
      </el-form-item>
      <hr/>
      <el-form-item>
        <span>create a new account</span>
      </el-form-item>
      <el-form-item>
        <router-link to="register">
          <el-button type="round">register</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{required: true, message: '', trigger: 'input'}],
        password: [{required: true, message: '', trigger: 'input'}]
      },
      loading: false
    }
  },
  methods: {
    login () {
      this.$axios.post('/login', this.loginForm)
      .catch(
        error => 
        {
          if (error.response.status === 404)
          {

            alert('user does not exist');
          }
          else if (error.response.status === 403)
          {
            alert('password incorrect');
          }
          else
          {
            alert('login error');
          }
        }
      )
      .then(res => 
      {
        if(res.status === 200 && res.data.hasOwnProperty("token"))
        {
          this.$store.commit('login', res.data)
          this.$router.replace({path: '/'})
        }
        else
        {
          alert('login error');
        }
      });
    }
  }
}
</script>

<style scoped>
  #base_login{
    background: url("~../assets/background/checkerboard-cross.png") repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
    padding: 0px;
  }
  .login_container{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #494e8f;
  }
</style>