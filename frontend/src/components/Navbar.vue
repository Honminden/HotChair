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
              User
            </a>
            <div class="dropdown-menu">
              <div v-if="user.isLogined()">
                <span class="dropdown-header">hello, {{ user.getUserInfo().username }}</span>
                <router-link class="dropdown-item" to="userInfo">User Info</router-link>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="/" @click="user.logout()">Logout</a>
              </div>
              <div v-else>
              <router-link class="dropdown-item" to="login">Login</router-link>
              <router-link class="dropdown-item" to="register">Register</router-link>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown">
            <router-link class="nav-link" to="conferenceList">Conferences</router-link>
          </li>
          <li class="divright">
<!--            改为接受到的信息的个数-->
            <router-link to="notification" style="color: white;text-decoration: none">5</router-link>
          </li>
        </ul>
      </div>

    </header>
  </div>
</template>

<script>
import User from './User/User'

export default {
  name: 'Navbar',
  data () {
    return {
      user: new User()
    }
  },
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
