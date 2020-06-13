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
            <div class="card-body row">

                <div class="col-sm-8 thingsleft">
<!--                  评审结果-->
                  <div v-if="status === 'review over'">
                    <h3 class="text-center"><i class="fa fa-files-o mr-3"></i>Review</h3>
                    <div class="col-sm-10 container">
                      <div class="row">
                        <h5>result: <span>{{ reviewUtil.acceptanceOf(submission) }}</span></h5>
                      </div>
                      <div v-if="reviewUtil.acceptanceOf(submission) === 'rejected'" class="row">
                        <div v-if="rebuttalOf(submission) === ''">
                          <button class="btn btn-danger rounded-pill mb-2"
                            data-toggle="modal" :data-target="'#Rebuttal' + submission.title.replace(/[ :]/g, '-')">
                          <i class="fa fa-share mr-1"></i>rebut</button>
                        </div>
                        <div v-else>
                          <span>Rebuttal Submitted</span>
                        </div>
                      </div>
                      <div class="row ">
                        <div class="modal fade" :id="'Rebuttal' + submission.title.replace(/[ :]/g, '-')" tabindex="-1">
                          <div class="modal-dialog modal-md">
                            <div class="modal-content"  style="height: 500px">
                              <div class="modal-header">
                                <h4 class="modal-title"><i class="fa fa-pencil-square-o mr-3"></i>Rebuttal</h4>
                                <button type="button" class="close" data-dismiss="modal">
                                  <span>&times;</span>
                                </button>
                              </div>
                              <div class="modal-body col-sm-11 container">
                                <div class="form-group">
                                  <textarea class="form-control" id="rebut" rows="10" maxlength="800" v-model='newRebuttal'></textarea>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button class="btn btn-primary" @click.prevent="postRebuttal(submission)">
                                  Confirm
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <table class="table table-hover container col-sm-10" style="table-layout: fixed">
                      <thead>
                      <tr>
                        <th scope="col">Reviewer</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Confidence</th>
                        <th scope="col" width="200px">Remark</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(review, index) in reviewUtil.reviewsOf(submission)" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ review.rating.substring(1) }}</td>
                        <td>{{ review.confidence }}</td>
                        <td>
                          <textarea class="form-control" rows="6" v-model="review.text" disabled></textarea>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>

<!--                  文件-->
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
                          <a :href="src" :download="submission.fileName" class="btn rounded-pill btn-primary mt-1">Download<i class="fa fa-download ml-1"></i></a>
                        </td>
                      </tr>
                      </tbody>
                    </table>
<!--                  作者-->
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
<!--                topics-->
                <div class="col-sm-4">
                    <h3 class="text-center"><i class="fa fa-comments-o mr-3"></i>Topics</h3>
                    <ul class="topics">
                      <li v-for="topic in topics" :key="topic">{{ topic }}</li>
                    </ul>
                    <div class="row mt-5" v-if="(role === 'author') && (status === 'open')">
                      <span class="col"></span>
                      <button class="btn btn-success rounded-pill col-sm-3" data-toggle="modal"
                              :data-target="'#update'+submission.title.replace(/[ :]/g, '-')">
                        Update<i class="fa fa-upload ml-1"></i></button>
                      <span class="col"></span>
                    </div>
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
                  <object :data="src" type="application/pdf" style="width: 100%; height: 100%">pdf plugin not supported</object>
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
                      <input type="text" class="form-control" id="title" maxlength="50" v-model="subUtil.subForm.title"
                                @input="validate('title')">
                      <div v-for="validAlert in validAlerts.title" :class="validAlert.type" :key="validAlert.content">
                        <i :class="validAlert.icon"></i>{{ validAlert.content }}
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="abstract">Abstract<small class="ml-2">(up to 800 characters)</small></label>
                      <textarea class="form-control" id="abstract" rows="10" maxlength="800" v-model="subUtil.subForm.abs"
                                @input="validate('abs')"></textarea>
                      <div v-for="validAlert in validAlerts.abs" :class="validAlert.type" :key="validAlert.content">
                        <i :class="validAlert.icon"></i>{{ validAlert.content }}
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="file">File<small class="ml-2">(up to 10 MB)</small></label>
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" id="file" @change="subUtil.updateFile($event)">
                        <label class="custom-file-label" for="file">{{ subUtil.subForm.fileName }}</label>
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
                                      @change="validate('topics')">
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
                        <tr v-for="(author, index) in subUtil.authors" :key="index">
                          <th scope="row">{{ index + 1 }}</th>
                          <td>{{ author.fullName }}</td>
                          <td>{{ author.organization }}</td>
                          <td>{{ author.region }}</td>
                          <td>{{ author.email }}</td>
                          <td>
                            <span class="text-primary" style="cursor: pointer" title="move up" 
                                      @click.prevent="subUtil.moveUpAuthor(author)">
                              <i class="fa fa-arrow-circle-up"></i>
                            </span>
                            <span class="text-primary" style="cursor: pointer" title="move down" 
                                      @click.prevent="subUtil.moveDownAuthor(author)">
                              <i class="fa fa-arrow-circle-down"></i>
                            </span>
                            <span class="text-danger" style="cursor: pointer" title="remove" 
                                      @click.prevent="subUtil.removeAuthor(author)">
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
                                   type="text" auto-complete="off" placeholder="username" 
                                   v-model="subUtil.newAuthor.fullName">
                          </div>
                          <div class="form-group col-sm-6">
                            <label for="organization" class="col-form-label">Organization</label>
                            <input id="organization" class="form-control"
                                   type="organization" auto-complete="off" placeholder="organization" 
                                   v-model="subUtil.newAuthor.organization">
                          </div>
                        </div>
                        <div class="row">
                          <div class="form-group col-sm-6">
                            <label for="region" class="col-form-label">Region</label>
                            <input type="text" id="region" class="form-control"
                                   auto-complete="off" placeholder="region/country" 
                                   v-model="subUtil.newAuthor.region">
                          </div>
                          <div class="form-group col-sm-6">
                            <label for="email" class="col-form-label">Email</label>
                            <input id="email" class="form-control"
                                   type="email" auto-complete="off" placeholder="email" 
                                   v-model="subUtil.newAuthor.email">
                          </div>
                        </div>
                      </div>
                      <div class="row mt-2">
                        <span class="col"></span>
                        <button class="col-sm-4 btn btn-outline-primary rounded-pill" @click.prevent="subUtil.addAuthor()">
                          Add author<i class="fa fa-plus ml-1"></i>
                        </button>
                        <span class="col"></span>
                      </div>
                      <div class="row mt-2">
                        <span class="col"></span>
                        <button class="col-sm-5 btn btn-outline-info rounded-pill" @click.prevent="subUtil.addSelf()">
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
                  <button class="btn btn-primary" @click.prevent="subUtil.submitPut()">Confirm</button>
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
import ValidUtil from './Form/ValidUtil'
import SubUtil from './Submission/SubUtil'
import ReviewUtil from './Review/ReviewUtil'
import User from './User/User'
import LeftNav from "./LeftNav";
import Detail from "./Detail";

const emptyForm = (new SubUtil(null, null, null, this)).getEmptyForm();

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
      subUtil: new SubUtil(null, null, null, this),
      reviewUtil: new ReviewUtil(this),
      submissionList: [],
      progress: {
        show: false,
        value: 0
      },
      src: '',
      title: '',
      confTopics: [],
      topics: [],
      newTopics: {},
      authors: [],
      rebuttals: [],
      newRebuttal: ''
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
      this.loadInfo(submission);
      this.title = submission.title;
      this.getSrc(submission);
      this.rebuttal = '';
    },
    loadInfo (submission) {
      let callbacks = [];
      callbacks.push(this.updateSubUtil);
      callbacks.push(this.getSubTopics);
      callbacks.push(this.getAuthors);
      let callback = callbacks.pop();
      callback(submission, callbacks);
    },
    getAuthors (submission, callbacks) {
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
          this.subUtil.authors = this.authors.slice();
          
          let callback = callbacks.pop();
          callback(submission, callbacks);
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
    getSubTopics (submission, callbacks) {
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
          
          let callback = callbacks.pop();
          callback(submission, callbacks);
        }
      });
    },
    updateSubUtil (submission) {
      this.subUtil = new SubUtil(this.alert, this.progress, this.newTopics, this);
      this.subUtil.subForm = {
        title: submission.title,
        abs: submission.abs,
        fileName: ''
      };
      this.subUtil.authors = this.authors.slice();
    },
    validate (field) {
      this.triggered[field] = true;
      this.validation = (new Validation()).validateSubmission(this.subUtil.subForm, this.subUtil.authors);
      if (field === undefined)
      {
        return ((new ValidUtil()).validateField(this.triggered, this.validation, this.validAlerts, field) & 
          (new ValidUtil()).validateTopics(this.newTopics, this.topicAlert) & 
          (new ValidUtil()).validateFile(this.subUtil.file, this.validAlerts));
      }
      else if (field === 'topics')
      {
        return ((new ValidUtil()).validateField(this.triggered, this.validation, this.validAlerts, field) & 
          (new ValidUtil()).validateTopics(this.newTopics, this.topicAlert))
      }
      else
      {
        return (new ValidUtil()).validateField(this.triggered, this.validation, this.validAlerts, field);
      }
    },
    getSrc (submission) {
      this.$axios.get('/file', {
        responseType: 'blob',
        params: {
          username: this.user.getUserInfo().username,
          category: 'paper',
          directory: `${submission.conference}/${submission.author}/${submission.title}`
        }
      })
      .catch(
        error =>
        {
          this.alert.popDanger('get file error');
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          let blob = new Blob([res.data], {type: 'application/pdf'});
          this.src = URL.createObjectURL(blob);
        }
      });
    },
    postRebuttal (submission) {
      this.$axios.post('/rebuttal', {
          conference: this.fullName,
          author: this.user.getUserInfo().username,
          title: submission.title,
          text: this.newRebuttal
      })
      .catch(
        error =>
        {
          this.alert.popDanger('rebuttal submission error');
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          this.$router.go();
        }
      });
    },
    getRebuttals () {
      this.$axios.get('/rebuttal', {
        params: {
          conference: this.fullName
        }
      })
      .then(res =>
      {
        if(res && res.status === 200)
        {
          this.rebuttals = res.data.rebuttals;
        }
      });
    },
    rebuttalOf (submission) {
      let rb = '';
      for (let idx in this.rebuttals)
      {
        let rebuttal = this.rebuttals[idx];
        if ((submission.conference === rebuttal.conference) &&
          (submission.author === rebuttal.author) &&
          (submission.title === rebuttal.title))
        {
          rb = rebuttal.text;
        }
      }
      return rb;
    }
  },

  mounted () {
    document.title += ` - ${this.fullName}`;
    this.getSubmission();
    this.getConfTopics();
    this.reviewUtil.getReviews();
    if ((this.status === 'review over') || (this.status === 'final'))
    {
      this.reviewUtil.getAcceptances();
    }
    this.getRebuttals();
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
  textarea{
    resize: none;
  }

</style>
