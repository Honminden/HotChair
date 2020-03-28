<template>
  <div id="Conference">
    <Navbar/>
    <article>
      <div class="center-block">
        <h1>Application</h1>

        <form :model="confForm" class="form-horizontal">
          <div class="form-group row">
            <div class="col-sm-2 col-sm-offset-3">
              <label class="control-label">Full Name</label>
            </div>
            <div class="col-sm-4 ">
              <input type="text" name="fullName" class="form-control" v-model="confForm.fullName" 
                    auto-complete="off" placeholder="Full Name" required>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-2 col-sm-offset-3">
                <label class="control-label">Abbreviation</label>
            </div>
            <div class="col-sm-4">
              <input type="text"  name="abbreviation" class="form-control" v-model="confForm.abbreviation" 
                    auto-complete="off" placeholder="Abbreviation" required>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-2 col-sm-offset-3">
              <label class="control-label">Date and Time</label>
            </div>
            <div class="col-sm-4">
              <input type="datetime-local" name="time" class="form-control" v-model="confForm.time" 
                auto-complete="off" placeholder="Date and Time" required>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-2 col-sm-offset-3">
              <label class="control-label">Location</label>
            </div>
            <div class="col-sm-4">
              <input type="text" name="location" class="form-control" v-model="confForm.location" 
                  auto-complete="off" placeholder="Location" required>
            </div>
          </div>

          <div class="form-group row">
          <div class="col-sm-2 col-sm-offset-3">
            <label class="control-label">Submission Deadline</label>
          </div>
          <div class="col-sm-4">
            <input type="date" name="submissionDDL" class="form-control" v-model="confForm.submissionDDL" 
                auto-complete="off" placeholder="Submission Deadline" required>
          </div>
          </div>

          <div class="form-group row ">
          <div class="col-sm-2 col-sm-offset-3">
            <label class="control-label">Review Release Date</label>
          </div>
          <div class="col-sm-4">
            <input type="date" name="reviewReleaseDate" class="form-control" v-model="confForm.reviewReleaseDate" 
                auto-complete="off" placeholder="Review Release Date" required>
          </div>
          </div>

          <div class="form-group row ">
            <input class="button btn btn-success col-md-1 col-sm-offset-8" name="submit" style="margin-bottom:20px" 
                type="submit" value="submit" @click.prevent="submit"/>
            <el-alert v-show="alert.isVisible" :type="alert.type" :closable="false" show-icon>
              {{ alert.content }}
            </el-alert>
          </div>

        </form>
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