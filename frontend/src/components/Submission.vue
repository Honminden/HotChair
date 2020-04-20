<template>
  <div id="Submission">
    <Navbar/>
    <div class="row">
      <LeftNav :parent="this"/>
      <div class="container col-sm-10" style="margin-top: 15px">
        <InnerNav :parent="this"/>
        <div v-if="progress.show" class="progress" style="height: 30px">
          <div class="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar" :style="`width: ${progress.value}%`">
            <strong>{{ progress.value }}%</strong>
          </div>
        </div>
        <div>
          <div class="col-sm-3 float-left text-center" v-show="alert.isVisible" :class="alert.type">
            {{ alert.content }}
          </div>
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
            <label for="file">File<small class="ml-2">(up to 10 MB)</small></label>
          <div class="input-group">
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="file" @change="updateFile($event)">
              <label class="custom-file-label" for="file">{{ subForm.fileName }}</label>
            </div>
            <div class="input-group-append">
              <button class="btn btn-primary" @click.prevent="submit()">submit</button>
            </div>
          </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import InnerNav from './InnerNav'
import Alert from './Message/Alert'
import User from './User/User'
import ConfDetail from './Detail/ConfDetail'
import LeftNav from "./LeftNav";

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
      },
      file: null,
      progress: {
        show: false,
        value: 0
      }
    }
  },
  props: ['username', 'fullName', 'abbreviation', 'time', 'location', 'submissionDDL', 'reviewReleaseDate', 'status', 'role'],
  components:
  {
    LeftNav,
    'Navbar': Navbar,
    'InnerNav': InnerNav
  },
  methods: {
    updateFile (event) {
      let files = event.target.files;
      if (files)
      {
        this.subForm.fileName = files[0].name;
        this.file = files[0];
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
          let progress = this.progress;
          progress.show = true;
          let formData = new FormData();
          formData.append('username', this.user.getUserInfo().username);
          formData.append('category', 'paper');
          formData.append('directory', `${this.fullName}/${this.user.getUserInfo().username}`);
          formData.append('file', this.file);

          this.$axios.post('/file', formData, {
            onUploadProgress (event) {
              progress.value = Math.round((event.loaded * 100) / event.total);
            }
          })
          .catch(
            error =>
            {
              if (error.response.status === 403)
              {
                this.alert.popDanger('you are not allowed to upload this file');
              }
              else
              {
                this.alert.popDanger('file upload error');
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
      });
    }
  },
  mounted () {
    document.title += ` - ${this.fullName}`;
  }
}

</script>
