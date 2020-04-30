<template>
  <div id="Author">
    <Navbar/>
    <div class="row">
      <LeftNav :parent="this"/>
      <div class="container col-sm-10" style="margin-top: 15px">
        <InnerNav :parent="this" class="mb-3"/>
        <div class="accordion" id="accordion">
        <div v-for="submission in submissionList" :key="submission.title" class="card  border-light">
          <button class="btn btn-light text-left card-header"  data-toggle="collapse" :data-target="'#'+submission.title.replace(/ /g, '-')"
                    @click="getAuthors(submission)">
            {{ submission.title }}
            <i class="fa fa-angle-down float-right"> </i>
          </button>
          <div :id="submission.title.replace(/ /g, '-')" class="collapse" data-parent="#accordion">
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
                        <th scope="col">file</th>
                      </tr>
                      <tr>
                        <td>{{ submission.title }}</td>
                        <td>{{ submission.abs }}</td>
                        <td><button class="btn btn-info rounded-pill" data-toggle="modal" :data-target="'#preview'+submission.title.replace(/ /g, '-')">Preview<i class="fa fa-eye ml-1"></i></button></td>
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
                      <li>topic</li>
                      <li>topic2</li>
                    </ul>
                    <div class="row mt-5" v-if="(role === 'author') && (status === 'open')">
                      <span class="col"></span>
                      <button class="btn btn-success col-sm-3" data-toggle="modal" :data-target="'#update'+submission.title.replace(/ /g, '-')">Update</button>
                      <span class="col"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--          preview-->
          <div class="modal fade" :id="'preview'+submission.title.replace(/ /g, '-')" tabindex="-1">
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
          <div class="modal fade" :id="'update'+submission.title.replace(/ /g, '-')" tabindex="-1">
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
                      <input type="text" class="form-control" id="title" maxlength="50" v-model="subForm.title" >
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
                      <div class="row mt-2 container ml-2">
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
                  </form>
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
import User from './User/User'
import LeftNav from "./LeftNav";
import Detail from "./Detail";

const emptyAuthor = 
{
  name: '',
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
      submissionList: [],
      subForm: {
        title: '',
        abs: '',
        fileName: ''
      },
      // pdf预览链接
      src: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
      topics: {'computer science': false, 'tetris': false, 'digital tennis': false}, // for display
      authors: [],
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
          console.log(this.authors);
        }
      });
    }
  },

  mounted () {
    document.title += ` - ${this.fullName}`;
    this.getSubmission();
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
