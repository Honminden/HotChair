<template>
  <div id="Notification">
    <Navbar/>
    <div v-show="alert.isVisible" :class="alert.type">
      {{ alert.content }}
    </div>
    <div class="accordion" id="accordion">
      <div class="card">
        <button class="btn btn-primary" data-toggle="collapse" data-target="#unhandled">
          Unhandled PC Member Invitations
        </button>
        <div id="unhandled" class="collapse show" data-parent="#accordion">
          <div class="card-body">
            <table class="table table-hover form-group" style="margin-top: 30px">
              <tbody>
                <tr class="bg-light">
                  <th scope="col">Conference</th>
                  <th scope="col">Chair</th>
                  <th scope="col"></th>
                </tr>
                <tr v-for="invitation in invitationList.filter(invitation => (invitation.status === 'waiting'))" 
                          :key="invitation.inviter">
                  <td>{{ invitation.conference }}</td>
                  <td>{{ invitation.inviter }}</td>
                  <td>
                    <button class="btn btn-outline-info" 
                              @click="putStatus(invitation.conference, invitation.inviter, 'accepted')">
                      Accept
                    </button>
                    <button class="btn btn-outline-danger ml-2" 
                              @click="putStatus(invitation.conference, invitation.inviter, 'rejected')">
                      Reject
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card">
        <button class="btn btn-primary" data-toggle="collapse" data-target="#unhandled">
          Handled PC Member Invitations
        </button>
        <div id="unhandled" class="collapse" data-parent="#accordion">
          <div class="card-body">
            <table class="table table-hover form-group" style="margin-top: 30px">
              <tbody>
                <tr class="bg-light">
                  <th scope="col">Conference</th>
                  <th scope="col">Chair</th>
                  <th scope="col">Status</th>
                </tr>
                <tr v-for="invitation in invitationList.filter(invitation => (invitation.status !== 'waiting'))" 
                          :key="invitation.inviter">
                  <td>{{ invitation.conference }}</td>
                  <td>{{ invitation.inviter }}</td>
                  <td>
                    <span v-if="invitation.status === 'accepted'" class="badge badge-info">accepted</span>
                    <span v-else-if="invitation.status === 'rejected'" class="badge badge-danger">rejected</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import Navbar from './Navbar'
import Alert from './Message/Alert'
import User from './User/User'

export default {
  name: 'Notification',
  data () {
    return {
      user: new User(),
      alert: new Alert(),
      invitationList: []
    }
  },
  methods: {
    getInvitations () {
      this.$axios.get('/invitation', {
        params: {
          inviter: '',
          receiver: this.user.getUserInfo().username
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
    putStatus(conference, inviter, status)
    {
      this.$axios.put('/invitation', {
          conference: conference,
          inviter: inviter,
          receiver: this.user.getUserInfo().username,
          status: status
      })
      .catch(
        error =>
        {
          this.alert.popDanger('invitation handling error');
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          this.alert.popSuccess('invitation handling success');
          this.$router.go();
        }
      });
    }
  },
  components:
  {
    'Navbar': Navbar
  },
  mounted () {
    this.getInvitations();
  }
}
</script>
