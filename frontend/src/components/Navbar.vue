<template>
  <div id="Navbar">
    <header class="nav navbar-expand-sm navbar-dark bg-secondary row">
      <router-link class="navbar-brand bg-primary" style="width: 200px" to="home">
        <div class="col-sm-2 text-center">
          <h2 class="col" style="margin-left: 10px">HOTCHAIR</h2>
        </div>
      </router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#toggle"
                aria-controls="toggle" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="toggle">
        <ul class="mr-auto nav navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" to="home">Home</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                      aria-haspopup="true" aria-expanded="false">
              Conferences
            </a>
            <div class="dropdown-menu ">
              <router-link class="dropdown-item" to="list">List of Conferences</router-link>
              <div v-if="!user.isAdmin()">
                <router-link class="dropdown-item" to="conference">New Conference</router-link>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                      aria-haspopup="true" aria-expanded="false">
              User
            </a>
            <div class="dropdown-menu">
              <div v-if="user.isLogined()">
                <span class="dropdown-header">hello, {{ user.getUserInfo().username }}</span>
                <router-link class="dropdown-item" to="userInfo">User Info</router-link>
                <div v-if="!user.isAdmin()">
                  <router-link class="dropdown-item" to="notification">Notifications</router-link>
                </div>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" @click="showAlert = true">Logout</a>
              </div>
              <div v-else>
                <router-link class="dropdown-item" to="login">Login</router-link>
                <router-link class="dropdown-item" to="register">Register</router-link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </header>
    <div v-if="showAlert" class="position: relative">
      <div class="alert alert-warning" role="alert" style="position: absolute; top: 40%; left: 40%; z-index:9">
        <h4 class="alert-heading">Logout
        <button type="button" class="ml-2 mb-1 close" @click="showAlert = false" aria-label="Close">&times;</button></h4>
        <p>You are going to logout.</p>
        <div class="d-flex justify-content-center align-items-center">
        <button type="button" class="btn btn-warning" @click="logout()">
          Confirm
        </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from './User/User'

export default {
  name: 'Navbar',
  data () {
    return {
      showAlert: false,
      user: new User()
    }
  },
  methods: {
    logout () {
      this.popConfirm = false;
      this.user.logout();
      this.$router.replace('/login');
    },
    checkToken()
    {
      this.$axios.head('/token')
      .catch(
        error =>
        {
          console.log("token expired or invalid");
          setTimeout(() => {
            this.logout();
          }, 1500);
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          this.confLists.update(res.data.confList);
        }
      });
    }
  },
  mounted () {
    this.checkToken();
  }
}
</script>
<style>
  .divright{
    font-size: 1em;
    background-color: darkorange;
    width: 1.5em;
    height: 1.5em;
    text-align: center;
    -webkit-border-radius: 2.75em;
    border-radius: 2.75em;
    }
  .divright:hover{
    background-color: orangered;

  }
</style>
