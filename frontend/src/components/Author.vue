<template>
  <div id="Author">
    <Navbar/>
    <InnerNav :parent="this"/>
    <div v-show="alert.isVisible" :class="alert.type">
      {{ alert.content }}
    </div>
    <table class="table table-hover">
      <tbody>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Abstract</th>
        </tr>
        <tr v-for="submission in submissionList" :key="submission.title">
          <td><h4>{{ submission.title }}</h4></td>
          <td><p>{{ submission.abs }}</p></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Navbar from './Navbar'
import InnerNav from './InnerNav'
import Alert from './Message/Alert'
import User from './User/User'

export default {
  name: 'Author',
  data () {
    return {
      user: new User(),
      alert: new Alert(),
      submissionList: []
    }
  },
  props: ['username', 'fullName', 'abbreviation', 'time', 'location', 'submissionDDL', 'reviewReleaseDate', 'status', 'role'],
  components:
  {
    'Navbar': Navbar,
    'InnerNav': InnerNav
  },
  methods: {
    getSubmission () {
      this.$axios.get('/submission', {
        params: {
          username: this.user.getUserInfo().username,
          author: this.user.getUserInfo().username,
          conference: this.fullName
        }
      })
      .catch(
        error =>
        {
          this.parent.alert.popDanger('get submissions error');
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          this.submissionList = res.data.submissionList;
          console.log(this.submissionList);
        }
      });
    }
  },
  mounted () {
    document.title += ` - ${this.fullName}`;
    this.getSubmission();
  }
}

</script>