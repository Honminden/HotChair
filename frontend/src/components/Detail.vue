<template>
  <div id="Detail">
    <Navbar/>
    <div class="row">
      <nav class="nav navbar-expand-sm flex-column bg-light navbar-light" style="min-height: 100vh;width: 200px;text-align: center">
        <router-link class="nav-link"  to="userInfo">UserInfo</router-link>
        <router-link class="nav-link bg-white"  to="conferenceList">List</router-link>
        <router-link class="nav-link"  to="conference">Application</router-link>
        <router-link class="nav-link"  to="notification">Notifications</router-link>
      </nav>

      <div class="container col-sm-10">
        <ul class="nav nav-tabs col-sm-5">
          <li class="nav-item">
            <router-link class="nav-link" to="conferenceList">List</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="detail">Details</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="submission">Submission</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="invitation">Invitation</router-link>
          </li>
        </ul>
        <div class="container col-sm-7">
          <div class="row" style="margin-top: 35px">
            <span class="col"></span>
            <h2>Conference Information</h2>
            <span class="col"></span>
          </div>
<!--加上接受到的会议的信息-->
          <table class="table">
            <tbody>
            <tr>
              <th scope="row">Full Name</th>
              <td></td>
            </tr>
            <tr>
              <th scope="row">Abbreviation</th>
              <td></td>
            </tr>
            <tr>
              <th scope="row">Date and time</th>
              <td></td>
            </tr>
            <tr>
              <th scope="row">Location</th>
              <td></td>
            </tr>
            <tr>
              <th scope="row">Submission Deadline</th>
              <td>
                <span></span>
                <button class="btn btn-outline-primary col-sm-5" type="button" style="margin-left: 50px">Start Submission</button>
              </td>
            </tr>
            <tr>
              <th scope="row">Review Release Date</th>
              <td></td>
            </tr>
            </tbody>
          </table>
        </div>
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
