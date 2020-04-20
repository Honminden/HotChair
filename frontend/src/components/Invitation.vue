<template>
  <div id="Invitation">
    <Navbar/>
    <div class="row">
      <LeftNav :parent="this"/>
      <div class="container col-sm-10" style="margin-top: 15px">
        <InnerNav :parent="this"/>
        <div class="accordion" id="accordion">
          <div class="card" style="margin-top: 15px">
            <button class="btn btn-primary" data-toggle="collapse" data-target="#invitations">
              <i class="fa fa-envelope mx-2"></i>Previous Invitations
            </button>
            <div id="invitations" class="collapse show" data-parent="#accordion">
              <div class="card-body">
                <table class="table table-hover form-group">
                  <tbody>
                    <tr>
                      <th scope="col">Receiver</th>
                      <th scope="col">Status</th>
                    </tr>
                    <tr v-for="invitation in invitationList" :key="invitation.receiver">
                      <td>{{ invitation.receiver }}</td>
                      <td>
                        <span v-if="invitation.status === 'waiting'" class="badge badge-warning">waiting</span>
                        <span v-else-if="invitation.status === 'accepted'" class="badge badge-info">accepted</span>
                        <span v-else-if="invitation.status === 'rejected'" class="badge badge-danger">rejected</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="card">
            <button class="btn btn-primary" data-toggle="collapse" data-target="#invite">
              <i class="fa fa-pencil-square-o mx-2"></i>Send New Invitations
            </button>
            <div id="invite" class="collapse" data-parent="#accordion">
              <div class="card-body row mt-4">
                <div class="col-2"></div>
                <div class="col-8">
                  <form class="form-inline">
                    <legend>Invite PC Members</legend>
                    <input class="form-control" type="search" placeholder="Search User..." v-model="userFullName">
                    <button class="btn btn-outline-primary ml-2" @click.prevent="getUsers()">
                      <i class="fa fa-search mr-2"></i>Search
                    </button>
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
                    <button class="btn btn-primary float-right mr-2" type="button" @click="postInvitations()">
                      Invite
                      </button>
                  </div>
                </div>
                <div class="col-2"></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="col-sm-3 float-right text-center" v-show="alert.isVisible" :class="alert.type">
            {{ alert.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import InnerNav from './InnerNav'
import Alert from './Message/Alert'
import User from './User/User'
import LeftNav from "./LeftNav";

export default {
  name: 'Invitation',
  data () {
    return {
      user: new User(),
      alert: new Alert(),
      userFullName: '',
      userList: [],
      invitationList: [],
      alertCounter: {
        total: 0,
        successCount: 0,
        failureCount: 0
      }
    }
  },
  props: ['username', 'fullName', 'abbreviation', 'time', 'location', 'submissionDDL', 'reviewReleaseDate', 'status', 'role'],
  components:
  {
    LeftNav,
    'Navbar': Navbar,
    'InnerNav': InnerNav
  },
  methods: {
    getUsers()
    {
      this.$axios.get('/user', {
        params: {
          conference: this.fullName,
          inviter: this.user.getUserInfo().username,
          fullName: this.userFullName
        }
      })
      .catch(
        error =>
        {
          this.alert.popDanger('fetch users error');
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
        }
      });
    },
    getInvitations () {
      this.$axios.get('/invitation', {
        params: {
          inviter: this.user.getUserInfo().username,
          receiver: ''
        }
      })
      .catch(
        error =>
        {
          this.alert.popDanger('fetch invitations error');
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          this.invitationList = res.data.invitationList;
        }
      });
    },
    postInvitations () {
      let receivers = this.userList.filter(user => (user.checked))
      this.alertCounter.total = receivers.length;
      for (let receiver of receivers)
      {
        this.$axios.post('/invitation', {
            conference: this.fullName,
            inviter: this.user.getUserInfo().username,
            receiver: receiver.username
          })
          .catch(
            error =>
            {
              this.alertCounter.failureCount++;
              this.updateAlert();
            }
          )
          .then(res =>
          {
            if(res && res.status === 200)
            {
              this.alertCounter.successCount++;
              this.updateAlert();
            }
          });
      }
    },
    updateAlert () {
      let total = this.alertCounter.total;
      let successCount = this.alertCounter.successCount;
      let failureCount = this.alertCounter.failureCount;
      if ((total != 0) && ((successCount + failureCount) === total))
      {
        if (failureCount > 0)
        {
          this.alert.popDanger(`${successCount} invitations sent, ${failureCount} invitations failed`);
        }
        else
        {
          this.alert.popSuccess(`${successCount} invitations sended`);
          setTimeout(() =>
          {
            this.$router.go();
          }, 1500);
        }
      }
    }
  },
  mounted () {
    document.title += ` - ${this.fullName}`;
    this.getInvitations();
  }
}

</script>
