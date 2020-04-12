<template>
  <div class="row">
    <div class="d-flex bg-primary" style="width:80vh;">
      <div id="carousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carousel" data-slide-to="0" class="active"></li>
          <li data-target="#carousel" data-slide-to="1"></li>
          <li data-target="#carousel" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner" >
          <div class="carousel-item active">
            <img src="https://www.pcrm.org/sites/default/files/ICNM2018.jpg"
                 class="d-block w-100" alt="conference photo 1">
          </div>
          <div class="carousel-item" >
            <img src="https://cdn.meetingsbooker.com/images/venues/Edinburgh-International-Conference-Centre-14.jpg"
                 class="d-block w-100" alt="conference photo 2">
          </div>
          <div class="carousel-item">
            <img src="https://www.hkafcn.hk/wp-content/uploads/2013/03/time2017_1.jpg"
                 class="d-block w-100" alt="conference photo 3">
          </div>
        </div>
        <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    <div class="col">
      <div class="container col-sm-9" style="margin-top:20vh">
        <span class="col"></span>
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
            {{ alert.content }}
          </div>


        </form>
        <span class="col"></span>
      </div>
    </div>
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
<style>
  .carousel-item{
    height: 100vh;
    width:auto;
    overflow: hidden;
  }
  img{
    width:100%;
    transition: 1s filter;
    filter:opacity(60%);
  }
  img:hover{
    filter:none;
  }
</style>
