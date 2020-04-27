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
            <div v-for="topic in Object.keys(topics)" :key="topic">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" :id="'T' + topic" v-model="topics[topic]">
                <label class="custom-control-label" :for="'T' + topic">{{ topic }}</label>
              </div>
            </div>
          </div>


          <div class="mt-5">
            <h3 class="text-center"><i class="fa fa-user-plus mr-3"></i>Authors</h3>
          </div>
          
          <div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Order</th>
                  <th scope="col">Name</th>
                  <th scope="col">Organization</th>
                  <th scope="col">Region</th>
                  <th scope="col">Email</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(author, index) in authors" :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ author.name }}</td>
                  <td>{{ author.organization }}</td>
                  <td>{{ author.region }}</td>
                  <td>{{ author.email }}</td>
                  <td>
                    <span class="text-primary" style="cursor: pointer" title="move up" @click.prevent="moveUpAuthor(author)">
                      <i class="fa fa-arrow-circle-up"></i>
                    </span>
                    <span class="text-primary" style="cursor: pointer" title="move down" @click.prevent="moveDownAuthor(author)">
                      <i class="fa fa-arrow-circle-down"></i>
                    </span>
                    <span class="text-danger" style="cursor: pointer" title="remove" @click.prevent="removeAuthor(author)">
                      <i class="fa fa-close"></i>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="row mt-2">
              <div class="row">
                <div class="form-group col-sm-6">
                  <label for="name" class="col-form-label">Name</label>
                  <input id="name" class="form-control"
                        type="text" auto-complete="off" placeholder="username" v-model="newAuthor.name">
                </div>
                <div class="form-group col-sm-6">
                  <label for="organization" class="col-form-label">Organization</label>
                  <input id="organization" class="form-control"
                        type="organization" auto-complete="off" placeholder="organization" v-model="newAuthor.organization">
                </div>
              </div>
              <div class="row">
                <div class="form-group col-sm-6">
                  <label for="region" class="col-form-label">Region</label>
                  <input type="text" id="region" class="form-control"
                          auto-complete="off" placeholder="region/country" v-model="newAuthor.region">
                </div>

                <div class="form-group col-sm-6">
                  <label for="email" class="col-form-label">Email</label>
                  <input id="email" class="form-control"
                        type="email" auto-complete="off" placeholder="email" v-model="newAuthor.email">
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <span class="col-sm-4"></span>
              <button class="col-sm-4 btn btn-outline-primary rounded-pill" @click.prevent="addAuthor()">
                Add author<i class="fa fa-plus ml-1"></i>
              </button>
              <span class="col-sm-4"></span>
            </div>
          </div>
          <hr>
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

const emptyAuthor = 
{
  name: '',
  organization: '',
  region: '',
  email: ''
}

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
      },
      topics: {'computer science': false, 'tetris': false, 'digital tennis': false}, // for display
      authors: [],
      newAuthor: emptyAuthor
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
    addAuthor () {
      if (this.authors.findIndex(author => (author.name === this.newAuthor.name)) === -1)
      {
        this.authors.push(Object.assign({}, this.newAuthor));
      }
      this.newAuthor = emptyAuthor;
    },
    removeAuthor (author) {
      this.authors.splice(this.authors.indexOf(author), 1);
    },
    moveUpAuthor (author) {
      let index = this.authors.indexOf(author);
      if (index > 0)
      {
        let above = this.authors[index - 1];
        this.authors[index - 1] = author;
        this.authors[index] = above;
      }
      this.$forceUpdate();
    },
    moveDownAuthor (author) {
      let index = this.authors.indexOf(author);
      if (index !== -1 && index < this.authors.length - 1)
      {
        let below = this.authors[index + 1];
        this.authors[index + 1] = author;
        this.authors[index] = below;
      }
      this.$forceUpdate();
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
