<template>
  <div id="UserInfo">
    <Navbar/>
    <div class="row">
      <div class="container col-sm-5">
        <div class ="row" style="height: 35px"></div>
          <div class="row">
            <span class="col"></span>
            <h2>Your Information</h2>
            <span class="col"></span>
          </div>
          <table class="table">
            <tbody>
              <tr>
                <th scope="row">Username</th>
                <td>{{ user.getUserInfo().username }}</td>
              </tr>
              <tr>
                <th scope="row">Full Name</th>
                <td>{{ user.getUserInfo().fullName }}</td>
              </tr>
              <tr>
                <th scope="row">Email</th>
                <td>{{ user.getUserInfo().email }}</td>
              </tr>
              <tr>
                <th scope="row">Organization</th>
                <td>{{ user.getUserInfo().organization }}</td>
              </tr>
              <tr>
                <th scope="row">Region</th>
                <td>{{ user.getUserInfo().region }}</td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import User from './User/User'

export default {
  name: 'UserInfo',
  data () {
    return {
      user: new User()
    }
  },
  components:
  {
    'Navbar': Navbar
  }
}
</script>
