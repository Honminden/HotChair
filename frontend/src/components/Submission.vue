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
            <i :class="alert.icon"></i>{{ alert.content }}
          </div>
        </div>
        <form class="col-sm-6 container" style="margin-top: 35px">
          <legend class="row">
            <span class="col"></span>
            <h2>Paper Submission</h2>
            <span class="col"></span>
          </legend>
          <hr/>
          <h3 class="text-center"><i class="fa fa-file-pdf-o mr-3"></i>File</h3>
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
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="file" @change="updateFile($event)">
              <label class="custom-file-label" for="file">{{ subForm.fileName }}</label>
          </div>
          </div>
          <div class="form-group mt-5">
            <h3 class="text-center"><i class="fa fa-comments-o mr-3"></i>Topics</h3>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="customCheck1">
              <label class="custom-control-label" for="customCheck1">some topics</label>
            </div>
          </div>


          <div class="row mt-5">
            <span class="col"></span>
            <h3 class="col-sm-5"><i class="fa fa-user-plus mr-3"></i>Authors</h3>
            <button class="btn btn-outline-primary rounded-pill" >Add author<i class="fa fa-plus ml-1"></i></button>
          </div>

          <div>
            <div class="row">
          <div class="form-group col-sm-6">
            <label for="name" class="col-form-label">Name</label>
            <input id="name" class="form-control"
                   type="text" auto-complete="off" placeholder="username" >
          </div>
          <div class="form-group col-sm-6">
            <label for="organization" class="col-form-label">Organization</label>
            <input id="organization" class="form-control"
                   type="organization" auto-complete="off" placeholder="organization" >
          </div>
            </div>
            <div class="row">
          <div class="form-group col-sm-6">
            <label for="region" class="col-form-label">Region</label>
            <input type="text" id="region" class="form-control"
                    auto-complete="off" placeholder="region/country">
          </div>

          <div class="form-group col-sm-6">
            <label for="email" class="col-form-label">Email</label>
            <input id="email" class="form-control"
                   type="email" auto-complete="off" placeholder="email" >
          </div>
            </div>
            <div class="row">
              <span class="col"></span>
              <button class="col-sm-2 float-right btn btn-outline-danger rounded-pill" >Delete<i class="fa fa-close ml-1"></i> </button>
            </div>
            <hr>
          </div>
          <div class="row">
            <span class="col"></span>
          <button class="btn btn-primary my-3 col-sm-2" @click.prevent="submit()">submit</button>
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
