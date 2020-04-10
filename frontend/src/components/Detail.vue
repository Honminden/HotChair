<template>
  <div id="Detail">
    <Navbar/>
    <InnerNav :parent="this"/>
    <div v-show="alert.isVisible" :class="alert.type">
      {{ alert.content }}
    </div>
    <div class="row mt-4">
      <div class="col-2"></div>
      <div class="col-8">
        <table class="table table-hover">
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
          <tr v-if="(role === 'chair') && (status === 'passed')">
            <th scope="row"></th>
            <td><button class="btn btn-success" @click="openConference()">Open this conference</button></td>
          </tr>
          </tbody>
        </table>
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
  name: 'Detail',
  data () {
    return {
      user: new User(),
      alert: new Alert()
    }
  },
  props: ['username', 'fullName', 'abbreviation', 'time', 'location', 'submissionDDL', 'reviewReleaseDate', 'status', 'role'],
  components:
  {
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
    }
  },
  mounted () {
    document.title += ` - ${this.fullName}`;
  }
}

</script>
