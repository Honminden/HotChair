<template>
  <div id="Submission">
    <Navbar/>
    <div class="row">
      <nav class="nav navbar-expand-sm flex-column bg-light navbar-light" style="min-height: 100vh;width: 200px;text-align: center">
        <router-link class="nav-link"  to="userInfo">UserInfo</router-link>
        <router-link class="nav-link bg-white"  to="conferenceList">List</router-link>
        <router-link class="nav-link"  to="conference">Application</router-link>
        <router-link class="nav-link"  to="notification">Notifications</router-link>
      </nav>
      <div class="container col-sm-10">
        <ul class="nav nav-tabs  col-sm-5">
          <li class="nav-item">
            <router-link class="nav-link" to="conferenceList">List</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="detail">Details</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="submission">Submission</router-link>
          </li>
<!--          判断身份，是author才显示mysubmission-->
          <li class="nav-item">
            <router-link class="nav-link" to="mySubmission">My Submission</router-link>
          </li>
        </ul>
        <form class="col-sm-6 container" style="margin-top: 35px">
          <legend class="row">
            <span class="col"></span>
            <h2>Paper Submission</h2>
            <span class="col"></span>
          </legend>
          <hr/>
          <h6 class="text-muted">Submission DDL:
            <!--            改为投稿截止日期-->
            <span></span>
          </h6>
              <div class="form-group">
                <label for="title">Title</label>
                <input type="password" class="form-control" id="title" placeholder="no longer than 50 characters...">
              </div>
              <div class="form-group">
                <label for="exampleTextarea">Abstract</label>
                <textarea class="form-control" id="exampleTextarea" rows="10" placeholder="no longer than 800 characters..."></textarea>
              </div>
          <div class="input-group">
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="inputGroupFile04">
              <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
            </div>
            <div class="input-group-append">
              <button class="btn btn-primary" type="button">submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
  import Navbar from './Navbar'

  export default {
    name: 'Submission',
    data () {
      return {}
    },
    components:
      {
        'Navbar': Navbar
      }

  }

</script>
