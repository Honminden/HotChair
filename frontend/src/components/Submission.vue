<template>
  <div id="Submission">
    <Navbar/>
    <div class="row">
      <LeftNav :parent="this"/>
      <div class="container col-sm-10" style="margin-top: 15px">
        <InnerNav :parent="this"/>
        <div>
          <div class="col-sm-3 float-left" v-show="alert.isVisible" :class="alert.type">
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
            <input type="text" class="form-control" id="title" maxlength="50" v-model="subForm.title"
                      @input="validate('title')">
            <div class="col-sm-4" v-for="validAlert in validAlerts.title" :class="validAlert.type" :key="validAlert.content">
              <i :class="validAlert.icon"></i>{{ validAlert.content }}
            </div>
          </div>
          <div class="form-group row">
            <label for="abstract">Abstract<small class="ml-2">(up to 800 characters)</small></label>
            <textarea class="form-control" id="abstract" rows="10" maxlength="800" v-model="subForm.abs"
                      @input="validate('abs')"></textarea>
            <div class="col-sm-4" v-for="validAlert in validAlerts.abs" :class="validAlert.type" :key="validAlert.content">
              <i :class="validAlert.icon"></i>{{ validAlert.content }}
            </div>
          </div>
          <div class="form-group row">
            <label for="file">File<small class="ml-2">(up to 10 MB)</small></label>
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="file" @change="updateFile($event)">
              <label class="custom-file-label" for="file">{{ subForm.fileName }}</label>
            </div>
            <div class="col-sm-4" v-for="validAlert in validAlerts.fileName" :class="validAlert.type" :key="validAlert.content">
              <i :class="validAlert.icon"></i>{{ validAlert.content }}
            </div>
          </div>
          <div class="form-group mt-5">
            <h3 class="text-center"><i class="fa fa-comments-o mr-3"></i>Topics</h3>
            <div>
              <div v-for="topic in Object.keys(topics)" :key="topic">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" :id="'T' + topic" v-model="topics[topic]"
                            @change='validate()'>
                  <label class="custom-control-label" :for="'T' + topic">{{ topic }}</label>
                </div>
              </div>
              <div class="col-sm-4" v-show="topicAlert.isVisible" :class="topicAlert.type">
                <i :class="topicAlert.icon"></i>{{ topicAlert.content }}
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
                <td>{{ author.fullName }}</td>
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
            <div class="row mt-2 container ml-2">
              <div class="row">
                <div class="form-group col-sm-6">
                  <label for="name" class="col-form-label">Name</label>
                  <input id="name" class="form-control"
                         type="text" auto-complete="off" placeholder="username" v-model="newAuthor.fullName">
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
              <span class="col"></span>
              <button class="col-sm-4 btn btn-outline-primary rounded-pill" @click.prevent="addAuthor()">
                Add author<i class="fa fa-plus ml-1"></i>
              </button>
              <span class="col"></span>
            </div>
            <div class="row mt-2">
              <span class="col"></span>
              <button class="col-sm-5 btn btn-outline-info rounded-pill" @click.prevent="addSelf()">
                Add yourself as author<i class="fa fa-plus ml-1"></i>
              </button>
              <span class="col"></span>
            </div>
            <div class="col-sm-4" v-for="validAlert in validAlerts.authors" :class="validAlert.type" :key="validAlert.content">
              <i :class="validAlert.icon"></i>{{ validAlert.content }}
            </div>
          </div>
          <hr>
          <div v-if="progress.show" class="progress" style="height: 15px">
            <div class="progress-bar progress-bar-striped progress-bar-animated"
                 role="progressbar" :style="`width: ${progress.value}%`">
              <strong>{{ progress.value }}%</strong>
            </div>
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
  import Validation from './Form/Validation'
  import User from './User/User'
  import ConfDetail from './Detail/ConfDetail'
  import LeftNav from "./LeftNav";

  const emptyForm =
  {
    title: '',
    abs: '',
    fileName: ''
  }

  const emptyAuthor =
    {
      fullName: '',
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
        triggered: {
          title: false,
          abs: false,
          fileName: false,
          authors: false
        },
        validAlerts: {
          title: [],
          abs: [],
          fileName: [],
          authors: []
        },
        topicAlert: new Alert(),
        confDetail: new ConfDetail(),
        validation: (new Validation).validateSubmission(emptyForm, []),
        subForm: emptyForm,
        file: null,
        progress: {
          show: false,
          value: 0
        },
        topics: {},
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
        if (files && files[0])
        {
          this.subForm.fileName = files[0].name;
          this.file = files[0];
        }
        this.validate('fileName');
      },
      addAuthor () {
        for (let field in this.newAuthor)
        {
          if (this.newAuthor[field] === '')
          {
            return;
          }
        }
        if (this.authors.findIndex(author => (author.fullName === this.newAuthor.fullName)) === -1)
        {
          this.authors.push(Object.assign({}, this.newAuthor));
        }
        this.newAuthor = emptyAuthor;
        this.validate('authors');
      },
      addSelf () {
        this.newAuthor =
        {
          fullName: this.user.getUserInfo().username,
          organization: this.user.getUserInfo().organization,
          region: this.user.getUserInfo().region,
          email: this.user.getUserInfo().email
        };
        this.addAuthor();
      },
      removeAuthor (author) {
        this.authors.splice(this.authors.indexOf(author), 1);
        this.validate('authors');
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
      validate (field) {
        this.triggered[field] = true;
        this.validation = (new Validation).validateSubmission(this.subForm, this.authors);
        /* update validation alerts */
        for (let field of Object.keys(this.validAlerts))
        {
          if (this.triggered[field])
          {
            this.validAlerts[field] = [];
            if (this.validation[field].isValid)
            {
              let validAlert = new Alert();
              validAlert.popSuccess("Valid.");
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

        if (field === undefined)
        {
          let topics = [];
          for (let topic in this.topics)
          {
            if (this.topics[topic])
            {
              topics.push(topic);
            }
          }
          if (Object.keys(topics).length > 0)
          {
            if (this.file !== null)
            {
              this.topicAlert.popSuccess("Valid.");
              return true;
            }
            else
            {
              let alert = new Alert();
              this.validAlerts['fileName'] = [];
              this.validAlerts['fileName'].push(alert);
              alert.popWarning('File cannot be empty.');
              return false;
            }
          }
          else
          {
            this.topicAlert.popWarning('Choose at least one topic.');
            return false;
          }
        }
      },
      postSubmission (callbacks) {
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
            if (res && res.status === 200)
            {
              let callback = callbacks.pop();
              callback(callbacks);
            }
          });
      },
      postTopic (callbacks) {
        let topics = [];
        for (let topic in this.topics)
        {
          if (this.topics[topic])
          {
            topics.push(topic);
          }
        }
        this.$axios.post('/submission-topic',
        {
          conference: this.fullName,
          author: this.user.getUserInfo().username,
          title: this.subForm.title,
          topics: topics
        })
        .catch(
          error =>
          {
            if (error.response.status === 403)
            {
              this.alert.popDanger('invalid topics');
            }
            else
            {
              this.alert.popDanger('topics upload error');
            }
          }
        )
        .then(res =>
        {
          if(res && res.status === 200)
          {
            let callback = callbacks.pop();
            callback(callbacks);
          }
        });
      },
      postAuthor (callbacks) {
        let authors = [];
        for (let i = 0; i < this.authors.length; i++)
        {
          let author = Object.assign({}, this.authors[i]);
          author.order = i + 1; // start from 1
          authors.push(author);
        }
        this.$axios.post('/author',
        {
          conference: this.fullName,
          username: this.user.getUserInfo().username,
          title: this.subForm.title,
          authors: authors
        })
        .catch(
          error =>
          {
            if (error.response.status === 403)
            {
              this.alert.popDanger('invalid authors');
            }
            else
            {
              this.alert.popDanger('authors upload error');
            }
          }
        )
        .then(res =>
        {
          if(res && res.status === 200)
          {
            let callback = callbacks.pop();
            callback(callbacks);
          }
        });
      },
      postFile () {
        let progress = this.progress;
        progress.show = true;
        let formData = new FormData();
        formData.append('username', this.user.getUserInfo().username);
        formData.append('category', 'paper');
        formData.append('directory', `${this.fullName}/${this.user.getUserInfo().username}/${this.subForm.title}`);
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
      },
      submit () {
        for (let field of Object.keys(this.triggered))
        {
          this.triggered[field] = true;
        }
        this.validate();
        if (Object.values(this.validation).every(field => (field.isValid === true)))
        {
          let callbacks = [];
          callbacks.push(this.postFile);
          callbacks.push(this.postAuthor);
          callbacks.push(this.postTopic);
          callbacks.push(this.postSubmission);
          let callback = callbacks.pop();
          callback(callbacks);
        }
      },
      getConfTopics () {
        this.$axios.get('/conference-topic', {
          params: {
            username: this.user.getUserInfo().username,
            conference: this.fullName
          }
        })
        .catch(
          error =>
          {
            this.alert.popDanger('fetch topics error');
          }
        )
        .then(res =>
        {
          if(res && res.status === 200)
          {
            this.topics = {};
            for (let i = 0; i < res.data.topics.length; i++)
            {
              let topic = res.data.topics[i];
              this.topics[topic] = false;
            }
          }
        });
      }
    },
    mounted () {
      document.title += ` - ${this.fullName}`;
      this.getConfTopics();
    }
  }

</script>
