<template>
  <div id="Login">
    <Navbar/>
    <div class="row" style="height: 35px"></div>
    <div class="row">
      <span class="col"></span>
      <form class="col">
        <legend class="row">
          <span class="col"></span>
          <h2 class="col">Login</h2>
          <span class="col"></span>
        </legend>
        <hr/>
        <div class="form-group row">
          <label for="username" class="col-sm-3 col-form-label">Username</label>
          <input id="username" class="col-sm-9 form-control" v-model="loginForm.username"
                    type="text" auto-complete="off" placeholder="username">
        </div>
        <div class="form-group row">
          <label for="password" class="col-sm-3 col-form-label">Password</label>
          <input id="password" class="col-sm-9 form-control" v-model="loginForm.password"
                    type="password" auto-complete="off" placeholder="password">
        </div>
        <div class="row">
          <span class="col"></span>
          <button class="col btn btn-info" @click.prevent="login()">login</button>
          <span class="col"></span>
        </div>
        <div v-show="alert.isVisible" :class="alert.type">
          {{ alert.content }}
        </div>
        <hr/>
        <span>create a new account</span>
        <router-link to="register">
          <button class="btn btn-outline-primary">register</button>
        </router-link>
      </form>
      <span class="col"></span>
    </div>
    <!--<div class="row"></div>-->
  </div>
</template>

<script>
import Navbar from './Navbar'
import Alert from './Message/Alert'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false,
      alert: new Alert()
    }
  },
  components:
  {
    'Navbar': Navbar
  },
  methods: {
    login () {
      this.$axios.post('/login', this.loginForm)
      .catch(
        error => 
        {
          if (error.response.status === 404)
          {
            this.alert.popDanger('user does not exist');
          }
          else if (error.response.status === 403)
          {
            this.alert.popDanger('password incorrect');
          }
          else
          {
            this.alert.popDanger('login error');
          }
        }
      )
      .then(res => 
      {
        if(res.status === 200 && res.data.hasOwnProperty("token"))
        {
          this.alert.popSuccess('login success');
          setTimeout(() => 
          {
            this.$store.commit('login', res.data)
            this.$router.replace({path: '/'})
          }, 1500);
        }
      });
    }
  }
}
</script>
