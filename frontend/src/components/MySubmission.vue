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
            <router-link class="nav-link" to="submission">Submission</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="mySubmission">My Submission</router-link>
          </li>
        </ul>
          <div class="row" style="margin-top: 35px">
            <span class="col"></span>
            <h2>Submission Information</h2>
            <span class="col"></span>
          </div>
        <table class="table" style="table-layout: fixed">
          <tbody>
          <tr class="bg-light">
            <th scope="col" style="width: 25%">Title</th>
            <th scope="col" style="width: 45%">Abstract</th>
            <th scope="col" style="width: 20%">Submit time</th>
            <th scope="col">File</th>
          </tr>
          <!--投稿情况-->
          <tr>
<!--            标题-->
            <td></td>
            <td>
<!--              梗概-->
              <p class="abstract"></p>

<!--            投稿时间-->
            <td></td>
<!--            查看文件，这次估计用不上，就先空着吧-->
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
  import Navbar from './Navbar'

  export default {
    name: 'MySubmission',
    data () {
      return {}
    },
    components:
      {
        'Navbar': Navbar
      }

  }

</script>
<style>
  .abstract{
    max-height:80px;
    overflow: auto;
  }
</style>
