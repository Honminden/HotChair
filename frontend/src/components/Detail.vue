<template>
  <div id="Submission">
    <Navbar/>
    <div class="row">
      <nav class="nav navbar-expand-sm flex-column bg-light navbar-light" style="height: 100vh; width: 200px;text-align: center">
        <router-link class="nav-link"  to="userInfo">UserInfo</router-link>
        <router-link class="nav-link bg-white"  to="conferenceList">List</router-link>
        <router-link class="nav-link"  to="conference">Application</router-link>
        <router-link class="nav-link"  to="notification">Notifications</router-link>
      </nav>
      <div class="container col-sm-10">
        <div class ="row" style="height: 35px"></div>
      </div>
    </div>
  </div>

</template>

<script>
  import Navbar from './Navbar'

  export default {
    name: 'Detail',
    data () {
      return {}
    },
    components:
      {
        'Navbar': Navbar
      }

  }

</script>
