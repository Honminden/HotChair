<template>
  <div id="Invitaion">
    <Navbar/>
    <InnerNav :parent="this"/>
    <div v-show="alert.isVisible" :class="alert.type">
      {{ alert.content }}
    </div>
    <div class="row mt-4">
      <div class="col-2"></div>
      <div class="col-8">
        <form class="form-inline" style="margin-top:25px">
          <legend>Invite PC Members</legend>
          <input class="form-control" type="search" placeholder="Search User..." v-model="userFullName">
          <button class="btn btn-outline-primary ml-2" @click.prevent="getList()">Search</button>
        </form>

        <table class="table table-hover form-group" style="margin-top: 30px">
          <tbody>
            <tr class="bg-light">
              <th scope="col">
              </th>
              <th scope="col">Username</th>
              <th scope="col">Full Name</th>
              <th scope="col">Email</th>
              <th scope="col">Organization</th>
              <th scope="col">Region</th>
            </tr>
            <tr v-for="user in userList" :key="user.username">
              <td>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" :id="'U' + user.username" v-model="user.checked">
                  <label class="custom-control-label" :for="'U' + user.username"></label>
                </div>
              </td>
              <td>{{ user.username }}</td>
              <td>{{ user.fullName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.organization }}</td>
              <td>{{ user.region }}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <button class="btn btn-outline-primary float-right" type="button" style="margin-right: 50px">Invite</button>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import InnerNav from './InnerNav'
import Alert from './Message/Alert'
import User from './User/User'

export default {
  name: 'Invitation',
  data () {
    return {
      user: new User(),
      alert: new Alert(),
      userFullName: '',
      userList: []
    }
  },
  props: ['username', 'fullName', 'abbreviation', 'time', 'location', 'submissionDDL', 'reviewReleaseDate', 'status', 'role'],
  components:
  {
    'Navbar': Navbar,
    'InnerNav': InnerNav
  },
  methods: {
    getList()
    {
      this.$axios.get('/user', {
        params: {
          conference: this.conference,
          inviter: this.user.getUserInfo().username,
          fullName: this.userFullName
        }
      })
      .catch(
        error =>
        {
          //this.alert.popDanger('fetch list error');
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          this.userList = res.data.userList;
          this.userList.forEach(user => {
            user.checked = false;
          });
          console.log(this.userList);
        }
      });
    }
  }
}

</script>
