<template>
  <div id="ConferenceList">
    <Navbar/>
    <div class="row">
      <nav class="nav navbar-expand-sm flex-column bg-light navbar-light" style="min-height: 100vh; width: 200px;text-align: center">
        <router-link class="nav-link"  to="userInfo">UserInfo</router-link>
        <router-link class="nav-link bg-white"  to="conferenceList">List</router-link>
        <router-link class="nav-link"  to="conference">Application</router-link>
        <router-link class="nav-link"  to="notification">Notifications</router-link>
      </nav>
      <div class="container col-sm-10" style="margin-top: 35px">
        <div>
          <div class="card border-light mb-5">
<!--            改为会议简称-->
            <div class="card-header">Abbreviation for the conference</div>
            <div class="card-body">
              <h5 class="card-title">state:
<!--                改为会议状态-->
                <span>waiting</span>
              </h5>
<!--              可以加一些会议信息-->
              <p class="card-text">
                Some information for the conference.Some information for the conference.Some information for the conference.
              </p>
              <form>
                <div class="input-group col-sm-12">
                  <select class="custom-select">
                    <option selected>Choose your identity...</option>
                    <option>Chair</option>
                    <option>PCmember</option>
                    <option>Author</option>
                  </select>
                  <div class="input-group-append">
                    <router-link class="btn btn-primary" to="detail" type="button">Details</router-link>
                  </div>
                </div>
              </form>
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
