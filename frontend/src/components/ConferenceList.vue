<template>
  <div id="ConferenceList">
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
        <div>
    <div class="card border-light mb-5">
      <div class="card-header">Abbreviation for the conference1 </div>
      <div class="card-body">
        <h5 class="card-title">state:passed</h5>
        <p class="card-text">Some information for the conference.Some information for the conference.Some information for the conference.Some information for the conference.....................................................................................</p>
        <a href="#" class="btn btn-primary">details</a>
      </div>
    </div>
        <div class="card border-light mb-5" >
          <div class="card-header">Abbreviation for the conference2 </div>
          <div class="card-body">
            <h5 class="card-title">state:passed</h5>
            <p class="card-text">Some information for the conference.Some information for the conference.Some information for the conference..</p>
            <a href="#" class="btn btn-primary">details</a>
          </div>
        </div>
          <div class="card border-light mb-5" >
            <div class="card-header">Abbreviation for the conference2 </div>
            <div class="card-body">
              <h5 class="card-title">state:passed</h5>
              <p class="card-text">Some information for the conference.Some information for the conference.Some information for the conference..</p>
              <a href="#" class="btn btn-primary">details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

</template>
<style>
  .card{
    width: 40%;
    height: 30%;
    float: left;
    margin-left: 3%;
  }
  .card-text{
    height: 10%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
<script>
  import Navbar from './Navbar'

  export default {
    name: 'ConferenceList',
    data () {
      return {}
    },
    components:
      {
        'Navbar': Navbar
      }

  }

</script>
