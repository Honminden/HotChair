<template>
  <div id="Navbar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="home">
        <h1>CONFERENCE</h1>
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
              <router-link class="dropdown-item" to="">List of Conferences</router-link>
              <router-link class="dropdown-item" to="conference">New Conference</router-link>
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
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" @click="jquery('.toast').toast('show')">Logout</a>
              </div>
              <div v-else>
              <router-link class="dropdown-item" to="login">Login</router-link>
              <router-link class="dropdown-item" to="register">Register</router-link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <div class="position: relative">
      <div class="toast" role="alert" style="position: absolute; top: 40%; left: 40%; z-index:9" 
                aria-live="assertive" aria-atomic="true" data-autohide="false">
        <div class="toast-header">
          <strong class="mr-auto">Logout</strong>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">&times;</button>
        </div>
        <div class="toast-body">
          You are going to logout.
        </div>
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
const jquery = require('jquery');
jquery.noConflict();

export default {
  name: 'Navbar',
  data () {
    return {
      jquery: jquery,
      user: new User()
    }
  },
  methods: {
    logout () {
      this.popConfirm = false;
      this.user.logout();
      this.$router.replace('/login');
    }
  }
}
</script>
