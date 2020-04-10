<template>
  <div id="List">
    <Navbar/>
    <div v-show="alert.isVisible" :class="alert.type">
      {{ alert.content }}
    </div>
    <div class="accordion" id="accordion">
      <div v-if="user.isAdmin()">
        <div class="card">
          <button class="btn btn-primary" data-toggle="collapse" data-target="#AdminConf">
            Admin Panel
          </button>
          <div id="AdminConf" class="collapse show" data-parent="#accordion">
            <div class="card-body">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">Abbreviation</th>
                    <th scope="col">Chair</th>
                    <th scope="col">Date and Time</th>
                    <th scope="col">Location</th>
                    <th scope="col">Submission Deadline</th>
                    <th scope="col">Review Release Date</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="conf in this.confLists.adminConfList" :key="conf.fullName">
                    <th scope="row">{{ conf.fullName }}</th>
                    <td>{{ conf.abbreviation }}</td>
                    <td>{{ conf.username }}</td>
                    <td>{{ conf.time }}</td>
                    <td>{{ conf.location }}</td>
                    <td>{{ conf.submissionDDL }}</td>
                    <td>{{ conf.reviewReleaseDate }}</td>
                    <td><button class="btn btn-outline-info" @click="putStatus(conf.fullName, 'passed')">Pass</button></td>
                    <td><button class="btn btn-outline-danger" @click="putStatus(conf.fullName, 'rejected')">Reject</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="card">
          <button class="btn btn-primary" data-toggle="collapse" data-target="#YourConf">
            Your Conferences
          </button>
          <div id="YourConf" class="collapse" data-parent="#accordion">
            <div class="card-body">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">Abbreviation</th>
                    <th scope="col">Date and Time</th>
                    <th scope="col">Location</th>
                    <th scope="col">Submission Deadline</th>
                    <th scope="col">Review Release Date</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="conf in this.confLists.yourConfList" :key="conf.fullName">
                    <th scope="row">
                      <div v-if="conf.isPassed">
                        <router-link :to="confDetail.getURI('detail', conf, '')">
                          {{ conf.fullName }}
                        </router-link>
                      </div>
                      <div v-else>
                        {{ conf.fullName }}
                      </div>
                    </th>
                    <td>{{ conf.abbreviation }}</td>
                    <td>{{ conf.time }}</td>
                    <td>{{ conf.location }}</td>
                    <td>{{ conf.submissionDDL }}</td>
                    <td>{{ conf.reviewReleaseDate }}</td>
                    <td><span :class="conf.badge.class">{{ conf.badge.status }}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="card">
          <button class="btn btn-primary" data-toggle="collapse" data-target="#AllConf">
            All Conferences
          </button>
          <div id="AllConf" class="collapse show" data-parent="#accordion">
            <div class="card-body">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Fullname</th>
                    <th scope="col">Abbreviation</th>
                    <th scope="col">Chair</th>
                    <th scope="col">Date and Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="conf in this.confLists.allConfList" :key="conf.fullName">
                    <th scope="row">
                      <router-link :to="confDetail.getURI('detail', conf, '')">
                        {{ conf.fullName }}
                        <span :class="conf.badge.class">{{ conf.badge.content }}</span>
                      </router-link>
                    </th>
                    <td>{{ conf.abbreviation }}</td>
                    <td>{{ conf.username }}</td>
                    <td>{{ conf.time }}</td>
                  </tr>
                </tbody>
              </table>
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
import ConfLists from './List/ConfLists'
import ConfDetail from './Detail/ConfDetail'

export default {
  name: 'List',
  data () {
    return {
      user: new User(),
      alert: new Alert(),
      confLists: new ConfLists(),
      confDetail: new ConfDetail()
    }
  },
  components:
  {
    'Navbar': Navbar
  },
  methods: {
    getList()
    {
      this.$axios.get('/conference', {
        params: {
          username: this.user.getUserInfo().username
        }
      })
      .catch(
        error =>
        {
          this.alert.popDanger('fetch list error');
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          this.confLists.update(res.data.confList);
        }
      });
    },
    putStatus(fullName, status)
    {
      this.$axios.put('/conference', {
          username: this.user.getUserInfo().username,
          fullName: fullName,
          status: status
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
          this.alert.popSuccess('status update success');
          this.$router.go();
        }
      });
    }
  },
  mounted () {
    this.confLists.adapt(this.user.getUserInfo().username, this.user.isAdmin());
    this.getList();
  }
}

</script>
