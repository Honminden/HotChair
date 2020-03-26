<template>
  <div>
    <nav class="navbar-inverse">
      <div class="container">
        <div class="collapse navbar-collapse" >
          <span id="title">Conference</span>
          <ul class="nav navbar-nav">
            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="">Help<span class="caret"></span></a>
            </li>
            <li class="dropdown"><a href=""><router-link to="conference">Conference Submission</router-link></a></li>
            <li><a href="">Conferences</a></li>
            <li><a href="" class="signup_menu"><span class="glyphicon glyphicon glyphicon-user">User</span></a></li>
            <li><a href=""><span class="glyphicon glyphicon glyphicon-user" @click="logOut"><router-link to="login">logout</router-link></span></a></li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import User from './User/User'
const user = User();

export default {
  name: 'Home',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    logOut () {
      user.logOut();
    }
  }
}
</script>

<style>
  @import url("https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css");
  @import url("http://www.zaarapp.com/assets/css/style.css");
  body{
    background: url("~../assets/background/double-bubble-outline.png") repeat;
  }
  #title{
    font-size: 30px;
    font-family: "MV Boli";
    -webkit-text-fill-color: slategrey;
    font-style: italic;
  }
</style>