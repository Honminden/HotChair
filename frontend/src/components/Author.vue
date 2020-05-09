<template>
  <div id="Author">
    <Navbar/>
    <div class="row">
      <LeftNav :parent="this"/>
      <div class="container col-sm-10" style="margin-top: 15px">
        <InnerNav :parent="this" class="mb-3"/>
        <div class="accordion" id="accordion">
        <div v-for="submission in submissionList" :key="submission.title" class="card  border-light">
          <button class="btn btn-light text-left card-header"  data-toggle="collapse" :data-target="'#Sub'+submission.title.replace(/[ :]/g, '-')"
                    @click="toggle(submission)">
            {{ submission.title }}
            <i class="fa fa-angle-down float-right"> </i>
          </button>
          <div :id="'Sub' + submission.title.replace(/[ :]/g, '-')" class="collapse" data-parent="#accordion">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-8 thingsleft">
                  <div>
                    <h3 class="text-center"><i class="fa fa-file-pdf-o mr-3"></i>File</h3>
                    <table class="table table-hover container col-sm-10" style="table-layout: fixed">
                      <tbody>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col" width="200px">Abstract</th>
                        <th scope="col">File</th>
                      </tr>
                      <tr>
                        <td>{{ submission.title }}</td>
                        <td>{{ submission.abs }}</td>
                        <td>
                          {{ submission.fileName }}
                          <hr/>
                          <button class="btn btn-info rounded-pill" data-toggle="modal"
                                  :data-target="'#preview'+submission.title.replace(/[ :]/g, '-')">
                          Preview<i class="fa fa-eye ml-1"></i>
                          </button>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                  <h3 class="text-center"><i class="fa fa-mortar-board mr-3"></i>Authors</h3><table class="table table-hover container col-sm-10" >
                  <tbody>
                  <tr>
                    <th scope="col">Order</th>
                    <th scope="col">Name</th>
                    <th scope="col">Organization</th>
                    <th scope="col">Region</th>
                    <th scope="col">Email</th>
                  </tr>
                  <tr v-for="author in authors" :key="author.order">
                    <th scope="row">{{ author.order }}</th>
                    <td>{{ author.fullName }}</td>
                    <td>{{ author.organization }}</td>
                    <td>{{ author.region }}</td>
                    <td>{{ author.email }}</td>
                  </tr>
                  </tbody>
                </table>
                  </div>
                </div>
                <div class="col-sm-4">
                  <div>
                    <h3 class="text-center"><i class="fa fa-comments-o mr-3"></i>Topics</h3>
                    <ul class="topics">
                      <li v-for="topic in topics" :key="topic">{{ topic }}</li>
                    </ul>
                    <div class="row mt-5" v-if="(role === 'author') && (status === 'open')">
                      <span class="col"></span>
                      <button class="btn btn-success col-sm-3" data-toggle="modal"
                                :data-target="'#update'+submission.title.replace(/[ :]/g, '-')">Update</button>
                      <span class="col"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="status === 'review over'">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Reviewer</th>
                      <th scope="col">Rating</th>
                      <th scope="col">Confidence</th>
                      <th scope="col">Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(review, index) in reviewsOf(submission)" :key="index">
                      <th scope="row">{{ index + 1 }}</th>
                      <td>{{ review.rating }}</td>
                      <td>{{ review.confidence }}</td>
                      <td>
                        <textarea class="form-control" rows="10" v-model="review.text" disabled></textarea>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!--          preview-->
          <div class="modal fade" :id="'preview'+submission.title.replace(/[ :]/g, '-')" tabindex="-1">
            <div class="modal-dialog modal-lg">
              <div class="modal-content"  style="height: 90vh">
                <div class="modal-header">
                  <h4 class="modal-title"><i class="fa fa-file-pdf-o mr-3"></i>Preview</h4>
                  <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <iframe :src="src" frameborder="0" style="width: 100%; height: 100%"></iframe>
                </div>
              </div>
            </div>
          </div>

          <!--          update-->
          <div class="modal fade" :id="'update'+submission.title.replace(/[ :]/g, '-')" tabindex="-1">
            <div class="modal-dialog modal-lg">
              <div class="modal-content"  style="height: 90vh">
                <div class="modal-header">
                  <h4 class="modal-title"><i class="fa fa-cloud-upload mr-3"></i>Update</h4>
                  <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                  </button>
                </div>
                <div class="modal-body" style="overflow-y: scroll">
                  <form class="col-sm-8 container">
                    <h3 class="text-center"><i class="fa fa-file-pdf-o mr-3"></i>File</h3>
                    <div class="form-group row">
                      <label for="title">Title<small class="ml-2">(up to 50 characters)</small></label>
                      <input type="text" class="form-control" id="title" maxlength="50" v-model="subForm.title"
                                @input="validate('title')">
                      <div v-for="validAlert in validAlerts.title" :class="validAlert.type" :key="validAlert.content">
                        <i :class="validAlert.icon"></i>{{ validAlert.content }}
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="abstract">Abstract<small class="ml-2">(up to 800 characters)</small></label>
                      <textarea class="form-control" id="abstract" rows="10" maxlength="800" v-model="subForm.abs"
                                @input="validate('abs')"></textarea>
                      <div v-for="validAlert in validAlerts.abs" :class="validAlert.type" :key="validAlert.content">
                        <i :class="validAlert.icon"></i>{{ validAlert.content }}
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="file">File<small class="ml-2">(up to 10 MB)</small></label>
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" id="file" @change="updateFile($event)">
                        <label class="custom-file-label" for="file">{{ subForm.fileName }}</label>
                      </div>
                      <div v-for="validAlert in validAlerts.fileName" :class="validAlert.type" :key="validAlert.content">
                        <i :class="validAlert.icon"></i>{{ validAlert.content }}
                      </div>
                    </div>
                    <div class="form-group mt-5">
                      <h3 class="text-center"><i class="fa fa-comments-o mr-3"></i>Topics</h3>
                      <div>
                        <div v-for="topic in Object.keys(newTopics)" :key="topic">
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" :id="'T' + topic" v-model="newTopics[topic]"
                                      @change='validate()'>
                            <label class="custom-control-label" :for="'T' + topic">{{ topic }}</label>
                          </div>
                        </div>
                        <div v-show="topicAlert.isVisible" :class="topicAlert.type">
                          <i :class="topicAlert.icon"></i>{{ topicAlert.content }}
                        </div>
                      </div>
                    </div>


                    <div>
                      <div class="mt-5">
                        <h3 class="text-center"><i class="fa fa-mortar-board mr-3"></i>Authors</h3>
                      </div>
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
                        <tr v-for="(author, index) in newAuthors" :key="index">
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
                      <div v-for="validAlert in validAlerts.authors" :class="validAlert.type" :key="validAlert.content">
                        <i :class="validAlert.icon"></i>{{ validAlert.content }}
                      </div>
                    </div>
                  </form>
                  <div v-if="progress.show" class="progress" style="height: 15px">
                    <div class="progress-bar progress-bar-striped progress-bar-animated"
                         role="progressbar" :style="`width: ${progress.value}%`">
                      <strong>{{ progress.value }}%</strong>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  <button class="btn btn-primary" @click.prevent="submit()">Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>
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
import LeftNav from "./LeftNav";
import Detail from "./Detail";

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
  name: 'Author',
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
      validation: (new Validation).validateSubmission(emptyForm, []),
      submissionList: [],
      reviews: [],
      subForm: emptyForm,
      file: null,
      progress: {
        show: false,
        value: 0
      },
      // pdf预览链接
      src: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
      title: '',
      confTopics: [],
      topics: [],
      newTopics: {},
      authors: [],
      newAuthors: [],
      newAuthor: emptyAuthor
    }

  },
  props: ['username', 'fullName', 'abbreviation', 'time', 'location', 'submissionDDL', 'reviewReleaseDate', 'status', 'role'],
  components:
  {
    Detail,
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
      if (this.newAuthors.findIndex(author => (author.fullName === this.newAuthor.fullName)) === -1)
      {
        this.newAuthors.push(Object.assign({}, this.newAuthor));
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
      this.newAuthors.splice(this.newAuthors.indexOf(author), 1);
      this.validate('authors');
    },
    moveUpAuthor (author) {
      let index = this.newAuthors.indexOf(author);
      if (index > 0)
      {
        let above = this.newAuthors[index - 1];
        this.newAuthors[index - 1] = author;
        this.newAuthors[index] = above;
      }
      this.$forceUpdate();
    },
    moveDownAuthor (author) {
      let index = this.newAuthors.indexOf(author);
      if (index !== -1 && index < this.newAuthors.length - 1)
      {
        let below = this.newAuthors[index + 1];
        this.newAuthors[index + 1] = author;
        this.newAuthors[index] = below;
      }
      this.$forceUpdate();
    },
    getSubmission () {
      this.$axios.get('/submission', {
        params: {
          username: this.user.getUserInfo().username,
          author: this.user.getUserInfo().username,
          conference: this.fullName
        }
      })
      .catch(
        error =>
        {
          this.alert.popDanger('get submissions error');
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          this.submissionList = res.data.submissionList;
        }
      });
    },
    toggle (submission) {
      this.getAuthors(submission);
      this.getSubTopics(submission);
      this.title = submission.title;
      this.subForm = {
        title: submission.title,
        abs: submission.abs,
        fileName: ''
      }
    },
    getAuthors (submission) {
      this.$axios.get('/author', {
        params: {
          conference: this.fullName,
          username: this.user.getUserInfo().username,
          title: submission.title
        }
      })
      .catch(
        error =>
        {
          this.alert.popDanger('get authors error');
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          this.authors = res.data.authors;
          this.newAuthors = this.authors.slice();
        }
      });
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
          this.confTopics = res.data.topics;
        }
      });
    },
    getSubTopics (submission) {
      this.$axios.get('/submission-topic', {
        params: {
          conference: this.fullName,
          author: submission.author,
          title: submission.title
        }
      })
      .catch(
        error =>
        {
          this.alert.popDanger('get topics error');
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          this.topics = res.data.topics;
          this.newTopics = {};
          for (let i = 0; i < this.confTopics.length; i++)
          {
            let topic = this.confTopics[i];
            this.newTopics[topic] = (this.topics.indexOf(topic) >= 0);
          }
        }
      });
    },
    validate (field) {
      this.triggered[field] = true;
      this.validation = (new Validation).validateSubmission(this.subForm, this.newAuthors);
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
        for (let topic in this.newTopics)
        {
          if (this.newTopics[topic])
          {
            topics.push(topic);
          }
        }
        if (Object.keys(topics).length > 0)
        {
          this.topicAlert.popSuccess("Valid.");
          return true;
        }
        else
        {
          this.topicAlert.popWarning('Choose at least one topic.');
          return false;
        }
      }
    },
    putSubmission (callbacks) {
      this.$axios.put('/submission', {
        author: this.user.getUserInfo().username,
        conference: this.fullName,
        oldTitle: this.title,
        newTitle: this.subForm.title,
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
    putTopic (callbacks) {
      let topics = [];
      for (let topic in this.newTopics)
      {
        if (this.newTopics[topic])
        {
          topics.push(topic);
        }
      }
      this.$axios.put('/submission-topic',
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
    putAuthor (callbacks) {
      let authors = [];
      for (let i = 0; i < this.newAuthors.length; i++)
      {
        let author = Object.assign({}, this.newAuthors[i]);
        author.order = i + 1; // start from 1
        authors.push(author);
      }
      this.$axios.put('/author',
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
    putFile () {
      let progress = this.progress;
      progress.show = true;
      let formData = new FormData();
      formData.append('username', this.user.getUserInfo().username);
      formData.append('category', 'paper');
      formData.append('directory', `${this.fullName}/${this.user.getUserInfo().username}/${this.subForm.title}`);
      formData.append('file', this.file);

      this.$axios.put('/file', formData, {
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
              this.$router.go();
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
        callbacks.push(this.putFile);
        callbacks.push(this.putAuthor);
        callbacks.push(this.putTopic);
        callbacks.push(this.putSubmission);
        let callback = callbacks.pop();
        callback(callbacks);
      }
    },
    getReviews () {
      this.$axios.get('/review', {
        params: {
          conference: this.fullName,
          author: this.user.getUserInfo().username
        }
      })
      .catch(
        error =>
        {
          this.alert.popDanger('get reviews error');
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          this.reviews = res.data.submissions;
        }
      });
    },
    reviewsOf (submission) {
      let reviews = [];
      for (let idx in this.reviews)
      {
        let review = this.reviews[idx];
        if ((submission.conference === review.conference) && 
          (submission.author === review.author) && 
          (submission.title === review.title))
        {
          reviews.push(review);
        }
      }
      return reviews;
    }
  },

  mounted () {
    document.title += ` - ${this.fullName}`;
    this.getSubmission();
    this.getConfTopics();
    this.getReviews();
  }
}

</script>
<style>
  .topics li{
    list-style-type: decimal;
    font-size: larger;
  }
  .thingsleft{
    max-height: 400px;
    overflow-y: scroll;
  }
</style>
