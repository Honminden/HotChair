<template>
  <div id="List">
    <Navbar/>
    <div class="row">
      <LeftNav :parent="this"/>
      <div class="container col-sm-10" style="margin-top: 15px">
        <div class="accordion" id="accordion">
          <div v-if="user.isAdmin()">
            <div class="card">
              <button class="btn btn-primary" data-toggle="collapse" data-target="#AdminConf">
                <i class="fa fa-legal mx-2"></i>Admin Panel
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
                      </tr>
                    </thead>
                    <tbody>
                      <tr  v-for="conf in this.confLists.adminConfList" :key="conf.fullName">
                        <th scope="row">{{ conf.fullName }}</th>
                        <td>{{ conf.abbreviation }}</td>
                        <td>{{ conf.username }}</td>
                        <td>{{ conf.time }}</td>
                        <td>{{ conf.location }}</td>
                        <td>{{ conf.submissionDDL }}</td>
                        <td>{{ conf.reviewReleaseDate }}</td>
                        <td><button class="btn btn-outline-success" @click="putStatus(conf.fullName, 'passed')">Pass</button></td>
                        <td><button class="btn btn-outline-danger" @click="putStatus(conf.fullName, 'rejected')">Reject</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
          <div v-else>
            <div class="card  border-light">
              <button class="btn btn-light text-left card-header"  data-toggle="collapse" data-target="#AllConf">
                <i class="fa fa-users mx-2"></i>All Conferences <i class="fa fa-bars float-right"> </i>
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
            <div class="card  border-light">
              <button class="btn btn-light text-left card-header" data-toggle="collapse" data-target="#YourConf">
                <i class="fa fa-user mx-2"></i>Your Conferences<i class="fa fa-bars float-right"> </i>
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
import LeftNav from './LeftNav'
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
      confDetail: new ConfDetail(),
      topics: {'computer science': false, 'tetris': false, 'digital tennis': false} // for display
    }
  },
  components:
  {
    'Navbar': Navbar,
    'LeftNav':LeftNav
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
