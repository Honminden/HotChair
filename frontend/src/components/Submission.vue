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
            <input type="text" class="form-control" id="title" maxlength="50" v-model="subUtil.subForm.title"
                      @input="validate('title')">
            <div class="col-sm-4" v-for="validAlert in validAlerts.title" :class="validAlert.type" :key="validAlert.content">
              <i :class="validAlert.icon"></i>{{ validAlert.content }}
            </div>
          </div>
          <div class="form-group row">
            <label for="abstract">Abstract<small class="ml-2">(up to 800 characters)</small></label>
            <textarea class="form-control" id="abstract" rows="10" maxlength="800" v-model="subUtil.subForm.abs"
                      @input="validate('abs')"></textarea>
            <div class="col-sm-4" v-for="validAlert in validAlerts.abs" :class="validAlert.type" :key="validAlert.content">
              <i :class="validAlert.icon"></i>{{ validAlert.content }}
            </div>
          </div>
          <div class="form-group row">
            <label for="file">File<small class="ml-2">(up to 10 MB)</small></label>
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="file" @change="subUtil.updateFile($event)">
              <label class="custom-file-label" for="file">{{ subUtil.subForm.fileName }}</label>
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
                            @change="validate('topics')">
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
                         type="text" auto-complete="off" placeholder="username" v-model="subUtil.newAuthor.fullName">
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
                         auto-complete="off" placeholder="region/country" v-model="subUtil.newAuthor.region">
                </div>

                <div class="form-group col-sm-6">
                  <label for="email" class="col-form-label">Email</label>
                  <input id="email" class="form-control"
                         type="email" auto-complete="off" placeholder="email" v-model="subUtil.newAuthor.email">
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
            <button class="btn btn-primary my-3 col-sm-2" @click.prevent="subUtil.submitPost()">submit</button>
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
  import ValidUtil from './Form/ValidUtil'
  import SubUtil from './Submission/SubUtil'
  import User from './User/User'
  import ConfDetail from './Detail/ConfDetail'
  import LeftNav from "./LeftNav";

  const emptyForm = (new SubUtil(null, null, null, this)).getEmptyForm();

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
        validation: (new Validation()).validateSubmission(emptyForm, []),
        subUtil: new SubUtil(null, null, null, this),
        progress: {
          show: false,
          value: 0
        },
        topics: {}
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
      validate (field) {
        this.triggered[field] = true;
        this.validation = (new Validation()).validateSubmission(this.subUtil.subForm, this.subUtil.authors);
        if (field === undefined)
        {
          return ((new ValidUtil()).validateField(this.triggered, this.validation, this.validAlerts, field) & 
            (new ValidUtil()).validateTopics(this.topics, this.topicAlert) & 
            (new ValidUtil()).validateFile(this.subUtil.file, this.validAlerts));
        }
        else if (field === 'topics')
        {
          return ((new ValidUtil()).validateField(this.triggered, this.validation, this.validAlerts, field) & 
            (new ValidUtil()).validateTopics(this.topics, this.topicAlert))
        }
        else
        {
          return (new ValidUtil()).validateField(this.triggered, this.validation, this.validAlerts, field);
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

            this.subUtil = new SubUtil(this.alert, this.progress, this.topics, this);
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
