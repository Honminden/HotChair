<template>
  <div id="Conference">
    <Navbar/>
    <article>

      <div class="row">
        <nav class="nav navbar-expand-sm flex-column bg-light navbar-light" style="height: 100vh; width: 200px;text-align: center">
          <router-link class="nav-link"  to="userInfo">UserInfo</router-link>
          <router-link class="nav-link"  to="conferenceList">List</router-link>
          <router-link class="nav-link bg-white"  to="conference">Application</router-link>
          <router-link class="nav-link"  to="notification">Notifications</router-link>
        </nav>
      <div class="container col-sm-5">
        <div class ="row" style="height: 35px"></div>
        <form :model="confForm" class="col">
          <legend class="row">
            <span class="col"></span>
            <h2>Application</h2>
            <span class="col"></span>
          </legend>
          <hr/>

          <div class="form-group row">
              <label class="col-sm-4 col-form-label">Full Name</label>
              <input type="text" name="fullName" class="col-sm-8 form-control" v-model="confForm.fullName"
                    auto-complete="off" placeholder="Full Name" required>
          </div>

          <div class="form-group row">
                <label class="col-sm-4 col-form-label">Abbreviation</label>
              <input type="text"  name="abbreviation" class="col-sm-8 form-control" v-model="confForm.abbreviation"
                    auto-complete="off" placeholder="Abbreviation" required>
          </div>

          <div class="form-group row">
              <label class="col-sm-4 col-form-label">Date and Time</label>
              <input type="datetime-local" name="time" class="col-sm-8 form-control" v-model="confForm.time"
                auto-complete="off" placeholder="Date and Time" required>
          </div>

          <div class="form-group row">
              <label class="col-sm-4 col-form-label">Location</label>
              <input type="text" name="location" class="col-sm-8 form-control" v-model="confForm.location"
                  auto-complete="off" placeholder="Location" required>
          </div>

          <div class="form-group row">
            <label class="col-sm-4 col-form-label">Submission Deadline</label>
            <input type="date" name="submissionDDL" class="col-sm-8 form-control" v-model="confForm.submissionDDL"
                auto-complete="off" placeholder="Submission Deadline" required>
          </div>

          <div class="form-group row ">
            <label class="col-sm-4 col-form-label">Review Release Date</label>
            <input type="date" name="reviewReleaseDate" class=" col-sm-8 form-control" v-model="confForm.reviewReleaseDate"
                auto-complete="off" placeholder="Review Release Date" required>
          </div>

          <div class="row ">
           <span class="col"></span>
            <input class="col-sm-2 btn btn-primary" name="submit" type="submit" value="submit" @click.prevent="submit"/>
            <el-alert v-show="alert.isVisible" :type="alert.type" :closable="false" show-icon>
              {{ alert.content }}
            </el-alert>
          </div>

        </form>
      </div>
      </div>
    </article>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Alert from './Message/Alert'

export default {
  name: 'Conference',
  data () {
    return {
      confForm: {
        fullName: '',
        abbreviation: '',
        time: '',
        location: '',
        submissionDDL: '',
        reviewReleaseDate: ''
      },
      loading: false,
      alert: new Alert()
    }
  },
  components:
  {
    'Navbar': Navbar
  },
  methods: {
    logOut () {
      user.logOut();
    },
    submit () {
      this.$axios.post('/conference', this.confForm)
      .catch(
        error =>
        {
          this.alert.popDanger('submit error');
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          this.alert.popSuccess('form submitted');
        }
      });
    }
  }
}

</script>
