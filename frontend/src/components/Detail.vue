<template>
  <div id="Detail">
    <Navbar/>
    <div class="row">
      <LeftNav :parent="this"/>
      <div class="container col-sm-10" style="margin-top: 15px">
        <InnerNav :parent="this"/>
        <div class="row">
          <table class="table table-hover container col-sm-5" >
            <tbody>
            <tr>
              <th scope="row">Abbreviation</th>
              <td>{{ abbreviation }}</td>
            </tr>
            <tr>
              <th scope="row">Chair</th>
              <td>{{ username }}</td>
            </tr>
            <tr>
              <th scope="row">Date and time</th>
              <td>{{ time }}</td>
            </tr>
            <tr>
              <th scope="row">Location</th>
              <td>{{ location }}</td>
            </tr>
            <tr>
              <th scope="row">Submission Deadline</th>
              <td>
                <span>{{ submissionDDL }}</span>
              </td>
            </tr>
            <tr>
              <th scope="row">Review Release Date</th>
              <td>{{ reviewReleaseDate }}</td>
            </tr>
            </tbody>
          </table>
          <div class="col-sm-5 mt-4">
            <div class="row">
            <h4>Topics</h4>
            <ul class="topics">
              <li v-for="topic in topics" :key="topic" >{{ topic }}</li>
            </ul>
            </div>
            <div class="row mt-5" v-if="(role === 'chair') && (status === 'passed')">
              <span class="col"></span>
              <button class="btn btn-outline-success col-sm-5" @click="openConference()">Open This Conference</button>
              <span class="col"></span>
            </div>
            <div class="row mt-5" v-if="(role === 'chair') && (status === 'open')">
              <span class="col"></span>
              <button class="btn btn-outline-secondary col-sm-5" data-toggle="modal" data-target="#modal-review">Start Reviewing</button>
              <span class="col"></span>
            </div>
            <div class="row mt-5" v-if="(role === 'chair') && (status === 'reviewing')">
              <span class="col"></span>
              <button class="btn btn-outline-primary col-sm-5" @click="releaseReview()">Release Reviews</button>
              <span class="col"></span>
            </div>
          </div>
        </div>
        <div class="modal fade" id="modal-review" tabindex="-1" >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Choose Distribution Mode</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <button class="col m-4 p-4 btn btn-outline-danger" @click="startReview('relative')" data-dismiss="modal">
                    <h5>Relative</h5>
                    <p>PC Members will be assigned to relative submissions with regard to topics.</p>
                  </button>
                  <button class="col m-4 p-4 btn btn-outline-info" @click="startReview('average')" data-dismiss="modal">
                    <h5>Average</h5>
                    <p>PC Members will be assigned to submissions averagely with no regard to topics.</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="col-sm-3 float-right text-center" v-show="alert.isVisible" :class="alert.type">
            <i :class="alert.icon"></i>{{ alert.content }}
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
  name: 'Detail',
  data () {
    return {
      user: new User(),
      alert: new Alert(),
      topics: []
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
    putStatus (status, onRes, onError) {
      this.$axios.put('/conference', {
        username: this.user.getUserInfo().username,
        fullName: this.fullName,
        status: status
      })
      .catch(
        error =>
        {
          onError(error);
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          onRes(res);
          setTimeout(() =>
          {
            this.$router.replace({
              path: 'detail',
              query: {
                username: this.username,
                fullName: this.fullName,
                abbreviation: this.abbreviation,
                time: this.time,
                location: this.location,
                submissionDDL: this.submissionDDL,
                reviewReleaseDate: this.reviewReleaseDate,
                status: status,
                role: this.role
              }
            }, () => {
              this.$router.go();
            });
          }, 1500);
        }
      });
    },
    openConference () {
      this.putStatus('open', res => {
          this.alert.popSuccess('open success');
        }, error => {
          this.alert.popDanger('status put error');
        });
    },
    startReview (mode) {
      this.putStatus('reviewing', res => {
          this.$axios.post('/distribution', {
            conference: this.fullName,
            username: this.user.getUserInfo().username,
            mode: mode
          })
          .catch(
            error =>
            {
              this.alert.popDanger('distribution error');
            }
          )
          .then(res =>
          {
            this.alert.popSuccess('Start reviewing success.');
          });
        }, error => {
          if (error.response.status === 403)
          {
            this.alert.popDanger('Not allowed to start reviewing. Try to get enough PC Members.');
          }
          else
          {
            this.alert.popDanger('server error');
          }
        });
    },
    releaseReview () {
      this.putStatus('review over', res => {
          this.alert.popSuccess('release reviews success');
        }, error => {
          if (error.response.status === 403)
          {
            this.alert.popDanger('Not allowed to release reviews. Maybe some PC Member has not reviewed some submissions.');
          }
          else
          {
            this.alert.popDanger('server error');
          }
        });
    },
    getConfTopics () {
      this.$axios.get('/conference-topic', {
        params: {
          username: this.user.getUserInfo().username,
          conference: this.fullName
        }
      })
      .catch(
        error =>
        {
          this.alert.popDanger('fetch topics error');
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          this.topics = res.data.topics;
        }
      });
    }
  },
  mounted () {
    document.title += ` - ${this.fullName}`;
    this.getConfTopics();
  }
}

</script>
<style>
  .topics li{
    list-style-type: decimal;
    font-size: larger;
  }
</style>
