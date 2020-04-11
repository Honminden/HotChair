<template>
  <div id="Submission">
    <Navbar/>
    <InnerNav :parent="this"/>
    <div v-show="alert.isVisible" :class="alert.type">
      {{ alert.content }}
    </div>
    <form class="col-sm-6 container" style="margin-top: 35px">
      <legend class="row">
        <span class="col"></span>
        <h2>Paper Submission</h2>
        <span class="col"></span>
      </legend>
      <hr/>
      <div class="form-group row">
        <label for="title">Title<small class="ml-2">(up to 50 characters)</small></label>
        <input type="text" class="form-control" id="title" maxlength="50" v-model="subForm.title">
      </div>
      <div class="form-group row">
        <label for="abstract">Abstract<small class="ml-2">(up to 800 characters)</small></label>
        <textarea class="form-control" id="abstract" rows="10" maxlength="800" v-model="subForm.abs"></textarea>
      </div>
      <div class="form-group row">
        <label for="file">File</label>
        <div class="custom-file">
          <label class="custom-file-label" for="file">{{ subForm.fileName }}</label>
          <input type="file" class="custom-file-input" id="file" @change="updateFile($event)">
        </div>
      </div>
      <div class="row">
        <span class="col"></span>
        <button class="col btn btn-info" @click.prevent="submit()">submit</button>
        <span class="col"></span>
      </div>
    </form>
  </div>

</template>

<script>
import Navbar from './Navbar'
import InnerNav from './InnerNav'
import Alert from './Message/Alert'
import User from './User/User'
import ConfDetail from './Detail/ConfDetail'

export default {
  name: 'Submission',
  data () {
    return {
      user: new User(),
      alert: new Alert(),
      confDetail: new ConfDetail(),
      subForm: {
        title: '',
        abs: '',
        fileName: ''
      }
    }
  },
  props: ['username', 'fullName', 'abbreviation', 'time', 'location', 'submissionDDL', 'reviewReleaseDate', 'status', 'role'],
  components:
  {
    'Navbar': Navbar,
    'InnerNav': InnerNav
  },
  methods: {
    updateFile (event) {
      let files = event.target.files;
      if (files)
      {
        this.subForm.fileName = files[0].name;
      }
    },
    submit () {
      this.$axios.post('/submission', {
        author: this.user.getUserInfo().username,
        conference: this.fullName,
        title: this.subForm.title,
        abs: this.subForm.abs,
        fileName: this.subForm.fileName
      })
      .catch(
        error =>
        {
          if (error.response.status === 403)
          {
            this.alert.popDanger('you are not allowed to submit this paper');
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
          this.alert.popSuccess('paper submitted');
          setTimeout(() => 
          {
            this.$router.replace(this.confDetail.getURI('author', this, 'author'));
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
