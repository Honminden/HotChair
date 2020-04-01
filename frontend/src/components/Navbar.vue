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
                <router-link class="dropdown-item" to="">User Info</router-link>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="/" @click="user.logout()">Logout</a>
              </div>
              <div v-else>
              <router-link class="dropdown-item" to="login">Login</router-link>
              <router-link class="dropdown-item" to="register">Register</router-link>
              </div>
            </div>
          </li>
          <li class="nav-item"><router-link class="nav-link" to="">Help</router-link></li>
        </ul>
        <form class="form-inline">
          <input class="form-control" type="text" placeholder="any keywords...">
          <button class="mx-2 btn btn-info" @click="search()">Search</button>
        </form>
      </div>
    </nav>
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
  methods: {
    search () {
      // TODO: send a GET query to search
    }
  }
}
</script>
