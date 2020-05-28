<template>
  <div id="Conference">
    <Navbar/>
    <article>
      <div class="row">
        <LeftNav :parent="this"/>
        <div class="container col-sm-5" style="margin-top: 35px">
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
                <i :class="validAlert.icon"></i>{{ validAlert.content }}
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Abbreviation</label>
              <input type="text"  name="abbreviation" class="col-sm-8 form-control" v-model="confForm.abbreviation"
                        auto-complete="off" placeholder="Abbreviation" @input="validate('abbreviation')">
              <div v-for="validAlert in validAlerts.abbreviation" :class="validAlert.type" :key="validAlert.content">
                <i :class="validAlert.icon"></i>{{ validAlert.content }}
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Date and Time</label>
              <input type="datetime-local" name="time" class="col-sm-8 form-control" v-model="confForm.time"
                        auto-complete="off" placeholder="Date and Time" @input="validate('time')">
              <div v-for="validAlert in validAlerts.time" :class="validAlert.type" :key="validAlert.content">
                <i :class="validAlert.icon"></i>{{ validAlert.content }}
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Location</label>
              <input type="text" name="location" class="col-sm-8 form-control" v-model="confForm.location"
                        auto-complete="off" placeholder="Location" @input="validate('location')">
              <div v-for="validAlert in validAlerts.location" :class="validAlert.type" :key="validAlert.content">
                <i :class="validAlert.icon"></i>{{ validAlert.content }}
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Submission Deadline</label>
              <input type="date" name="submissionDDL" class="col-sm-8 form-control" v-model="confForm.submissionDDL"
                        auto-complete="off" placeholder="Submission Deadline" @input="validate('submissionDDL')">
              <div v-for="validAlert in validAlerts.submissionDDL" :class="validAlert.type" :key="validAlert.content">
                <i :class="validAlert.icon"></i>{{ validAlert.content }}
              </div>
            </div>

            <div class="form-group row ">
              <label class="col-sm-4 col-form-label">Review Release Date</label>
              <input type="date" name="reviewReleaseDate" class=" col-sm-8 form-control" v-model="confForm.reviewReleaseDate"
                        auto-complete="off" placeholder="Review Release Date" @input="validate('reviewReleaseDate')">
              <div v-for="validAlert in validAlerts.reviewReleaseDate" :class="validAlert.type" :key="validAlert.content">
                <i :class="validAlert.icon"></i>{{ validAlert.content }}
              </div>
            </div>

            <div class="form-group row ">
              <label class="col-sm-4 col-form-label">Topics</label>
              <div class="col-sm-8">
                <button v-for="topic in topics" :key="topic" class="btn btn-outline-primary mx-2" data-toggle="tooltip"
                          data-placement="top" :title="'remove ' + topic" @click.prevent="removeTopic(topic)">
                  {{ topic }}
                </button>
                <div class="input-group row ml-5 mt-2">
                  <input type="text" name="topic" class="col-sm-9 form-control" placeholder="Topic" v-model="newTopic">
                  <div class="input-group-append">
                    <button class="btn btn-outline-primary" @click.prevent="addTopic()">+</button>
                  </div>
                </div>
              </div>
              <div v-for="validAlert in validAlerts.topics" :class="validAlert.type" :key="validAlert.content">
                <i :class="validAlert.icon"></i>{{ validAlert.content }}
              </div>
            </div>
            <hr>


            <div class="row mt-3" >
              <span class="col"></span>
              <input class="col-sm-2 btn btn-primary" name="submit" type="submit" value="submit" @click.prevent="submit"/>
            </div>

            <div v-show="alert.isVisible" :class="alert.type">
              <i :class="alert.icon"></i>{{ alert.content }}
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
import Validation from './Form/Validation'
import ValidUtil from './Form/ValidUtil'
import User from './User/User'
import LeftNav from "./LeftNav";

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
      newTopic: '',
      topics: [],
      validation: (new Validation).validateConference(emptyForm, []),
      loading: false,
      alert: new Alert(),
      triggered: {
        fullName: false,
        abbreviation: false,
        time: false,
        location: false,
        submissionDDL: false,
        reviewReleaseDate: false,
        topics: false
      },
      validAlerts: {
        fullName: [],
        abbreviation: [],
        time: [],
        location: [],
        submissionDDL: [],
        reviewReleaseDate: [],
        topics: []
      }
    }
  },
  components:
  {
    LeftNav,
    'Navbar': Navbar
  },
  methods: {
    addTopic () {
      if ((this.newTopic !== '') && (this.topics.indexOf(this.newTopic) === -1))
      {
        this.topics.push(this.newTopic);
      }
      this.newTopic = '';
      this.validate('topics');
    },
    removeTopic (topic) {
      this.topics.splice(this.topics.indexOf(topic), 1);
      this.validate('topics');
    },
    validate (field) {
      this.validation = (new Validation).validateConference(this.confForm, this.topics);
      return (new ValidUtil).validateField(this.triggered, this.validation, this.validAlerts, field);
    },
    submit () {
      for (let field of Object.keys(this.triggered))
      {
        this.triggered[field] = true;
      }
      if (this.validate())
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
            this.$axios.post('/conference-topic', 
            {
              username: (new User()).getUserInfo().username,
              conference: this.confForm.fullName,
              topics: this.topics
            })
            .catch(
              error =>
              {
                if (error.response.status === 403)
                {
                  this.alert.popDanger('topics submission error');
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
                setTimeout(() =>
                {
                  this.$router.replace('list');
                }, 1500);
              }
            });
          }
        });
      }
    }
  }
}

</script>
