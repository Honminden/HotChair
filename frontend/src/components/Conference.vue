<template>
  <div id="Conference">
    <Navbar/>
    <div class="row" style="height: 35px"></div>
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
                  auto-complete="off" placeholder="Full Name" @input="validate('fullName')">
            <div v-for="validAlert in validAlerts.fullName" :class="validAlert.type" :key="validAlert.content">
              {{ validAlert.content }}
            </div>
        </div>

        <div class="form-group row">
              <label class="col-sm-4 col-form-label">Abbreviation</label>
            <input type="text"  name="abbreviation" class="col-sm-8 form-control" v-model="confForm.abbreviation"
                  auto-complete="off" placeholder="Abbreviation" @input="validate('abbreviation')">
            <div v-for="validAlert in validAlerts.abbreviation" :class="validAlert.type" :key="validAlert.content">
              {{ validAlert.content }}
            </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-4 col-form-label">Date and Time</label>
            <input type="datetime-local" name="time" class="col-sm-8 form-control" v-model="confForm.time"
              auto-complete="off" placeholder="Date and Time" @input="validate('time')">
            <div v-for="validAlert in validAlerts.time" :class="validAlert.type" :key="validAlert.content">
              {{ validAlert.content }}
            </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-4 col-form-label">Location</label>
            <input type="text" name="location" class="col-sm-8 form-control" v-model="confForm.location"
                auto-complete="off" placeholder="Location" @input="validate('location')">
            <div v-for="validAlert in validAlerts.location" :class="validAlert.type" :key="validAlert.content">
              {{ validAlert.content }}
            </div>
        </div>

        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Submission Deadline</label>
          <input type="date" name="submissionDDL" class="col-sm-8 form-control" v-model="confForm.submissionDDL"
              auto-complete="off" placeholder="Submission Deadline" @input="validate('submissionDDL')">
          <div v-for="validAlert in validAlerts.submissionDDL" :class="validAlert.type" :key="validAlert.content">
            {{ validAlert.content }}
          </div>
        </div>

        <div class="form-group row ">
          <label class="col-sm-4 col-form-label">Review Release Date</label>
          <input type="date" name="reviewReleaseDate" class=" col-sm-8 form-control" v-model="confForm.reviewReleaseDate"
              auto-complete="off" placeholder="Review Release Date" @input="validate('reviewReleaseDate')">
          <div v-for="validAlert in validAlerts.reviewReleaseDate" :class="validAlert.type" :key="validAlert.content">
            {{ validAlert.content }}
          </div>
        </div>

        <div class="row">
          <span class="col"></span>
          <button class="col btn btn-info" @click.prevent="submit()">submit</button>
          <span class="col"></span>
        </div>
        <div v-show="alert.isVisible" :class="alert.type">
          {{ alert.content }}
        </div>

      </form>
      <span class="col"></span>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Alert from './Message/Alert'
import Validation from './Form/Validation'
import User from './User/User'

const emptyForm = {
  fullName: '',
  abbreviation: '',
  time: '',
  location: '',
  submissionDDL: '',
  reviewReleaseDate: ''
}

export default {
  name: 'Conference',
  data () {
    return {
      confForm: emptyForm,
      validation: (new Validation).validateConference(emptyForm),
      loading: false,
      alert: new Alert(),
      triggered: {
        fullName: false,
        abbreviation: false,
        time: false,
        location: false,
        submissionDDL: false,
        reviewReleaseDate: false
      },
      validAlerts: {
        fullName: [],
        abbreviation: [],
        time: [],
        location: [],
        submissionDDL: [],
        reviewReleaseDate: []
      }
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
    validate (field) {
      this.triggered[field] = true;
      this.validation = (new Validation).validateConference(this.confForm);
      /* update validation alerts */
      for (let field of Object.keys(this.validAlerts))
      {
        if (this.triggered[field])
        {
          this.validAlerts[field] = [];
          if (this.validation[field].isValid)
          {
            let validAlert = new Alert();
            validAlert.popSuccess("Valid input.");
            this.validAlerts[field].push(validAlert);
          }
          else
          {
            for (let message of this.validation[field].messages)
            {
              let validAlert = new Alert();
              validAlert.popWarning(message);
              this.validAlerts[field].push(validAlert);
            }
          }
        }
      }
    },
    submit () {
      for (let field of Object.keys(this.triggered))
      {
        this.triggered[field] = true;
      }
      this.validate();
      if (Object.values(this.validation).every(field => (field.isValid === true)))
      {
        this.$axios.post('/conference', {
          username: (new User()).getUserInfo().username,
          fullName: this.confForm.fullName,
          abbreviation: this.confForm.abbreviation,
          time: this.confForm.time,
          location: this.confForm.location,
          submissionDDL: this.confForm.submissionDDL,
          reviewReleaseDate: this.confForm.reviewReleaseDate
        })
        .catch(
          error =>
          {
            if (error.response.status === 403)
            {
              this.alert.popDanger('this conference already exists');
            }
            else
            {
              this.alert.popDanger('submission error');
            }
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
}

</script>
