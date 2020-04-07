<template>
  <div id="Notification">
    <Navbar/>
    <div class="row">
      <nav class="nav navbar-expand-sm flex-column bg-light navbar-light " style="height: 100vh; width: 200px;text-align: center">
        <router-link class="nav-link"  to="userInfo">UserInfo</router-link>
        <router-link class="nav-link"  to="conferenceList">List</router-link>
        <router-link class="nav-link"  to="conference">Application</router-link>
        <router-link class="nav-link bg-white" to="notification">Notifications</router-link>
      </nav>
    </div>
  </div>

</template>
<script>
  import Navbar from './Navbar'

  export default {
    name: 'Notification',
    data () {
      return {}
    },
    components:
      {
        'Navbar': Navbar
      }

  }

</script>
