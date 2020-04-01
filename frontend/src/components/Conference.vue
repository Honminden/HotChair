<template>
  <div id="Conference">
    <Navbar/>
    <article>
      <div class="row">
        <span class="col"></span>
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
            <span class="col-7"></span>
            <span class="col"></span>
            <input class="col btn btn-info" name="submit" type="submit" value="submit" @click.prevent="submit"/>
            <alert v-show="alert.isVisible" :type="alert.type" :closable="false" show-icon>
              {{ alert.content }}
            </alert>
          </div>

        </form>
        <span class="col"></span>
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
