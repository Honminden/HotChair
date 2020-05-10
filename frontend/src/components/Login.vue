<template>
  <div id="Login">
  <div class="row-cols-sm-1">
    <Carousel/>
      <div class="container col-sm-5 float-right" style="margin-right: 15vh;margin-top: 20vh">
        <form>
          <legend class="row">
            <h1 class="col" style="font-family: 'MV Boli';   text-shadow: 5px 5px 5px rgba(75,0,130,0.4); ">Hotchair</h1>
          </legend>
          <h6>
            Welcome back,<br/>
            Please sign in to your account.
          </h6>
          <span>No account?</span>
          <router-link to="register" style="-webkit-text-fill-color: 	#4169E1">
           Sign up now
          </router-link>
          <hr/>
          <div class="row">
          <div class="form-group col-sm-6" >
            <label for="username" class="col-form-label">Username</label>
            <input id="username" class=" form-control" v-model="loginForm.username"
                    type="text" auto-complete="off" placeholder="username">
          </div>
          <div class="form-group col-sm-6">
            <label for="password" class="col-form-label">Password</label>
            <input id="password" class=" form-control" v-model="loginForm.password"
                    type="password" auto-complete="off" placeholder="password">
          </div>
          </div>
          <hr/>
          <div class="row">
            <span class="col-sm-9"></span>
            <button class="col-sm-3 btn btn-primary" @click.prevent="login()">login</button>
          </div>
          <div v-show="alert.isVisible" :class="alert.type">
            <i :class="alert.icon"></i>{{ alert.content }}
          </div>
          <hr/>
          <div class="row">
            <small class="mt-6">
              <h4><i class="fa fa-user-secret mr-2"></i>administrator account(test)</h4>
              <p>Username: admin</p>
              <p>Password: password</p>
            </small>
          </div>

        </form>
      </div>
    </div>
    </div>
</template>


<script>
  import Navbar from './Navbar'
  import Alert from './Message/Alert'
  import Carousel from "./Carousel";

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
        Carousel,
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
<style scoped>
  .carousel-outer{
    left: 0;
    top: 0;
  }
</style>
