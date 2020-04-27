<template>
  <div id="Notification">
    <Navbar/>
    <div class="row">
      <LeftNav :parent="this"/>
      <div class="container col-sm-10" style="margin-top: 15px">
        <div class="accordion" id="accordion">
          <div class="card border-light">
            <button class="btn btn-light card-header text-left" data-toggle="collapse" data-target="#unhandled">
              <i class="fa fa-envelope mx-2"></i>Unhandled PC Member Invitations<i class="fa fa-bars float-right"> </i>
            </button>
            <div id="unhandled" class="collapse show" data-parent="#accordion">
              <div class="card-body">
                <table class="table table-hover form-group" >
                  <tbody>
                  <tr>
                    <th scope="col">Conference</th>
                    <th scope="col">Chair</th>
                    <th scope="col"></th>
                  </tr>
                  <tr v-for="invitation in invitationList.filter(invitation => (invitation.status === 'waiting'))"
                      :key="invitation.inviter">
                    <td>{{ invitation.conference }}</td>
                    <td>{{ invitation.inviter }}</td>
                    <td>
                      <button class="btn btn-outline-success" data-toggle="modal" data-target="#topic">
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
          <div class="card border-light">
            <button class="btn btn-light card-header text-left" data-toggle="collapse" data-target="#handled">
              <i class="fa fa-envelope-open mx-2"></i>Handled PC Member Invitations<i class="fa fa-bars float-right"> </i>
            </button>
            <div id="handled" class="collapse" data-parent="#accordion">
              <div class="card-body">
                <table class="table table-hover form-group" >
                  <tbody>
                  <tr>
                    <th scope="col">Conference</th>
                    <th scope="col">Chair</th>
                    <th scope="col">Status</th>
                  </tr>
                  <tr v-for="invitation in invitationList.filter(invitation => (invitation.status !== 'waiting'))"
                      :key="invitation.inviter">
                    <td>{{ invitation.conference }}</td>
                    <td>{{ invitation.inviter }}</td>
                    <td>
                      <span v-if="invitation.status === 'accepted'" class="badge badge-success">accepted</span>
                      <span v-else-if="invitation.status === 'rejected'" class="badge badge-danger">rejected</span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="col-sm-3 float-right text-center" v-show="alert.isVisible" :class="alert.type">
            <i :class="alert.icon"></i>{{ alert.content }}
          </div>
        </div>
        <div class="modal fade" id="topic" tabindex="-1">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title"><i class="fa fa-check-square-o mx-1"></i>Choose Topics</h4>
                <button type="button" class="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              <div class="modal-body form-group">
                <div v-for="topic in Object.keys(topics)" :key="topic">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" :id="'T' + topic" v-model="topics[topic]">
                    <label class="custom-control-label" :for="'T' + topic">{{ topic }}</label>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success" data-dismiss="modal"
                        @click="putStatus(invitation.conference, invitation.inviter, 'accepted')">
                  Confirm
                </button>
              </div>
            </div>
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
  import LeftNav from "./LeftNav";

  export default {
    name: 'Notification',
    data () {
      return {
        user: new User(),
        alert: new Alert(),
        invitationList: [],
        topics: {'computer science': false, 'tetris': false, 'digital tennis': false} // for display
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
        LeftNav,
        'Navbar': Navbar
      },
    mounted () {
      this.getInvitations();
    }
  }
</script>
