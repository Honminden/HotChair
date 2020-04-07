<template>
  <div id="List">
    <Navbar/>
    <div v-show="alert.isVisible" :class="alert.type">
      {{ alert.content }}
    </div>
    <div class="accordation" id="accordtion">
      <div v-if="user.isAdmin()">
        <div class="card">
          <button class="btn btn-primary" data-toggle="collapse" data-target="#YourConf">
            Admin Panel
          </button>
          <div id="YourConf" class="collapse show" data-parent="#accordtion">
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
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">International Conference of Digital Table Tennis</th>
                    <td>ICDTT</td>
                    <td>2020-04-10T16:52:00.000</td>
                    <td>中华人民共和国 上海</td>
                    <td>2020-04-07</td>
                    <td>2020-04-09</td>
                    <td><button class="btn btn-info">Pass</button></td>
                    <td><button class="btn btn-danger">Reject</button></td>
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
          <div id="YourConf" class="collapse" data-parent="#accordtion">
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
                  <tr>
                    <th scope="row">
                      <router-link to="detail">
                        International Conference of Tetris
                      </router-link>
                    </th>
                    <td>ICT</td>
                    <td>2020-04-10T16:52:00.000</td>
                    <td>中华人民共和国 上海</td>
                    <td>2020-04-07</td>
                    <td>2020-04-09</td>
                    <td><span class="badge badge-pill badge-info">passed</span></td>
                  </tr>
                  <tr>
                    <th scope="row">International Conference of Digital Tennis</th>
                    <td>ICDT</td>
                    <td>2020-04-10T16:52:00.000</td>
                    <td>中华人民共和国 上海</td>
                    <td>2020-04-07</td>
                    <td>2020-04-09</td>
                    <td><span class="badge badge-danger">rejected</span></td>
                  </tr>
                  <tr>
                    <th scope="row">International Conference of Digital Table Tennis</th>
                    <td>ICDTT</td>
                    <td>2020-04-10T16:52:00.000</td>
                    <td>中华人民共和国 上海</td>
                    <td>2020-04-07</td>
                    <td>2020-04-09</td>
                    <td><span class="badge badge-warning">waitng</span></td>
                  </tr>
                  <tr>
                    <th scope="row">International Conference of Digital Tennis and Table Tennis</th>
                    <td>ICDTTT</td>
                    <td>2020-04-10T16:52:00.000</td>
                    <td>中华人民共和国 上海</td>
                    <td>2020-04-07</td>
                    <td>2020-04-09</td>
                    <td><span class="badge badge-success">open</span></td>
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
          <div id="AllConf" class="collapse show" data-parent="#accordtion">
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
                  <tr>
                    <th scope="row">
                      <router-link to="detail">
                        International Conference of Tetris
                        <span class="badge badge-info">not open</span>
                      </router-link>
                    </th>
                    <td>ICT</td>
                    <td>fdsoft1024</td>
                    <td>2020-04-10T16:52:00.000</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <router-link to="detail">
                        International Conference of Digital Tennis and Table Tennis
                        <span class="badge badge-success">open</span>
                      </router-link>
                    </th>
                    <td>ICDTTT</td>
                    <td>fdsoft1024</td>
                    <td>2020-04-10T16:52:00.000</td>
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

export default {
  name: 'List',
  data () {
    return {
      user: new User(),
      alert: new Alert()
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
          username: (new User()).getUserInfo().username
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
          console.log(res);
        }
      });
    }
  },
  mounted () {
    this.getList();
  }
}

</script>
