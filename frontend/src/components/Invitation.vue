<template>
  <div id="Invitaion">
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
              <router-link class="nav-link active" to="invitation">Invitation</router-link>
            </li>
          </ul>
<!--        搜索用户-->
        <form class="form-inline col-sm-5" style="margin-top:25px">
          <legend>Invite PCmembers</legend>
          <input class="form-control" type="search" placeholder="Search User..." aria-label="Search">
          <button class="btn btn-primary" type="submit">Search</button>
        </form>

        <table class="table table-hover form-group" style="margin-top: 30px">
          <tbody>
          <tr class="bg-light">
            <th scope="col">
              <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="checkAll">
                <label class="custom-control-label" for="checkAll">Choose</label>
            </div>
            </th>
            <th scope="col">Username</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Organization</th>
            <th scope="col">Region</th>
            <th scope="col">State</th>
          </tr>
<!--          搜索结果-->
          <tr>
            <td>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1"></label>
              </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          </tbody>
        </table>
          <div>
            <button class="btn btn-primary float-right" type="button" style="margin-right: 50px">Invite</button>
          </div>



      </div>
    </div>
  </div>

</template>

<script>
  import Navbar from './Navbar'

  export default {
    name: 'Invitation',
    data () {
      return {}
    },
    components:
      {
        'Navbar': Navbar
      }

  }

</script>
