<template>
  <div id="Navbar">
    <header class="nav navbar-expand-sm navbar-dark bg-secondary row">
      <router-link class="navbar-brand bg-primary" to="home">
        <div class="text-center mx-4">
          <h2 class="col" style="margin-left: 10px"><i class="fa fa-fire mr-2"></i>HOTCHAIR</h2>
        </div>
      </router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#toggle"
                aria-controls="toggle" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="toggle">
        <ul class="mr-auto nav navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" to="home"><i class="fa fa-home mx-2"></i>Home</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                      aria-haspopup="true" aria-expanded="false">
              <i class="fa fa-coffee mx-2"></i>Conferences
            </a>
            <div class="dropdown-menu ">
              <router-link class="dropdown-item" to="list"><i class="fa fa-th-list mx-2"></i>List of Conferences</router-link>
              <div v-if="!user.isAdmin()">
                <router-link class="dropdown-item" to="conference"><i class="fa fa-file-o mx-2"></i>New Conference</router-link>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                      aria-haspopup="true" aria-expanded="false">
              <i class="fa fa-user-circle mx-2"></i>User
            </a>
            <div class="dropdown-menu">
              <div v-if="user.isLogined()">
                <span class="dropdown-header">
                  hello, <i :class="(user.isAdmin()) ? 'fa fa-user-secret' : 'fa fa-user'"></i>
                  {{ user.getUserInfo().username }}
                </span>
                <router-link class="dropdown-item" to="userInfo"><i class="fa fa-id-card mx-2"></i>User Info</router-link>
                <div v-if="!user.isAdmin()">
                  <router-link class="dropdown-item" to="notification"><i class="fa fa-envelope mx-2"></i>Notifications</router-link>
                </div>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logout">Logout</a>
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
    <div class="modal fade" id="logout" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="logout"><i class="fa fa-warning mx-2"></i>Logout</h4>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>You are going to logout.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-warning" data-dismiss="modal" @click="logout()">
              Confirm
            </button>
          </div>
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
      user: new User()
    }
  },
  methods: {
    logout () {
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
      );
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
