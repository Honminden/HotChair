<template>
  <div id="Author">
    <Navbar/>
    <div class="row">
      <LeftNav :parent="this"/>
      <div class="container col-sm-10" style="margin-top: 15px">
        <InnerNav :parent="this" class="mb-3"/>
        <div class="accordion" id="accordion">
        <div v-for="submission in submissionList" :key="submission.title" class="card  border-light">
          <button class="btn btn-light text-left card-header"  data-toggle="collapse" :data-target="'#'+submission.title.replace(/ /g, '-')">
            {{ submission.title }}
            <i class="fa fa-angle-down float-right"> </i>
          </button>
          <div :id="submission.title.replace(/ /g, '-')" class="collapse" data-parent="#accordion">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-8 thinsleft">
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
                        <td><button class="btn btn-info rounded-pill" data-toggle="modal" data-target="#preview">Preview<i class="fa fa-eye ml-1"></i></button></td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                  <h3 class="text-center"><i class="fa fa-mortar-board mr-3"></i>Authors</h3><table class="table table-hover container col-sm-10" >
                  <tbody>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Organization</th>
                    <th scope="col">Region</th>
                    <th scope="col">Email</th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
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
                      <button class="btn btn-success col-sm-3">Update</button>
                      <span class="col"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div class="modal fade" id="preview" tabindex="-1">
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
        <div>
          <div class="col-sm-3 float-right text-center" v-show="alert.isVisible" :class="alert.type">
            <i :class="alert.icon"></i>{{ alert.content }}
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

export default {
  name: 'Author',
  data () {
    return {
      user: new User(),
      alert: new Alert(),
      submissionList: [],
      src: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
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
          this.parent.alert.popDanger('get submissions error');
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          this.submissionList = res.data.submissionList;
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
  .thinsleft{
    max-height: 400px;
    overflow-y: scroll;
  }
</style>
