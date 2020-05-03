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
              <button class="btn btn-success col-sm-5" @click="openConference()">Open this conference</button>
              <span class="col"></span>
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
    openConference () {
      this.$axios.put('/conference', {
        username: this.user.getUserInfo().username,
        fullName: this.fullName,
        status: 'open'
      })
      .catch(
        error =>
        {
          this.alert.popDanger('status put error');
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          this.alert.popSuccess('open success');
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
                status: 'open',
                role: this.role
              }
            }, () => {
              this.$router.go();
            });
          }, 1500);
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
