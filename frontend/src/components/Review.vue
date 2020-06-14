<template>
  <div id="Review">
    <Navbar/>
    <div class="row">
      <LeftNav :parent="this"/>
      <div class="container col-sm-10" style="margin-top: 15px">
        <InnerNav :parent="this" class="mb-3"/>
        <span v-if="(uhddDistributions.length <= 0) && ((status === 'reviewing') || (status === 'review over'))"
                  class="badge badge-warning">
          You need to revise or confirm in Handled Paper Review.
        </span>
        <div class="accordion" id="accordion">
          <div class="card border-light">
            <button class="btn btn-light card-header text-left" data-toggle="collapse" data-target="#unhandled">
              <i class="fa fa-folder mx-2"></i>Unhandled Paper Review<i class="fa fa-bars float-right"> </i>
            </button>
            <div id="unhandled" class="collapse show" data-parent="#accordion">
              <div class="card-body">
                        <table class="table table-hover container col-sm-11">
                          <tbody>
                          <tr>
                            <th scope="col" class="title">Title</th>
                            <th scope="col" class="abs">Abstract</th>
                            <th scope="col">Actions</th>
                          </tr>
                          <tr v-for="distribution in uhddDistributions" :key="distribution.title">
                            <td><h4>{{ distribution.title }}</h4></td>
                            <td><p>{{ distribution.abs }}</p></td>
                            <td>
                                <button class="btn btn-info rounded  m-2" data-toggle="modal"
                                        :data-target="'#uhddpreview'+distribution.title.replace(/[ :]/g, '-').replace()"
                                        @click="getSrc(distribution)">Preview</button>

                                <a :href="src" :download="distribution.fileName"  class="btn btn-primary text-light rounded  m-2">
                                  Download
                                </a>
                                <ReviewModal :buttonClass="'btn btn-success rounded  m-2'" :buttonName="'Review'"
                                             :distribution="distribution" :reviewUtil="reviewUtil"
                                             :func="'post'"></ReviewModal>
                            </td>
                            <div class="modal fade" :id="'uhddpreview'+distribution.title.replace(/[ :]/g, '-')" tabindex="-1">
                              <div class="modal-dialog modal-lg">
                                <div class="modal-content"  style="height: 90vh">
                                  <div class="modal-header">
                                    <h4 class="modal-title"><i class="fa fa-file-pdf-o mr-3"></i>Preview</h4>
                                    <button type="button" class="close" data-dismiss="modal">
                                      <span>&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                    <object :data="src" type="application/pdf" style="width: 100%; height: 100%">
                                      pdf plugin not supported
                                    </object>
                                  </div>
                                </div>
                              </div>
                            </div>
<!--                            review-->
<!--
                            <div class="modal fade" :id="'review'+distribution.title.replace(/[ :]/g, '-')" tabindex="-1">
                              <div class="modal-dialog modal-lg">
                                <div class="modal-content"  style="height: 90vh">
                                  <div class="modal-header">
                                    <h4 class="modal-title"><i class="fa fa-pencil-square-o mr-3"></i>Review</h4>
                                    <button type="button" class="close" data-dismiss="modal">
                                      <span>&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body col-sm-11 container">
                                    <h3>Rating</h3>
                                    <div class="form-group">
                                    <div class="row">
                                      <div class="col">
                                      <h6>Reject</h6>
                                        <div class="custom-control custom-radio">
                                          <input type="radio" id="reject" name="rating" class="custom-control-input"
                                                      value="-2" v-model="reviewUtil.rating">
                                          <label class="custom-control-label" for="reject">-2</label>
                                        </div>
                                      </div>
                                      <div class="col">
                                      <h6>Weak Reject</h6>
                                        <div class="custom-control custom-radio">
                                          <input type="radio" id="weakReject" name="rating" class="custom-control-input"
                                                      value="-1" v-model="reviewUtil.rating">
                                          <label class="custom-control-label" for="weakReject">-1</label>
                                        </div>
                                      </div>
                                      <div class="col">
                                      <h6>Weak Accept</h6>
                                        <div class="custom-control custom-radio">
                                          <input type="radio" id="weakAccept" name="rating" class="custom-control-input"
                                                      value="1" v-model="reviewUtil.rating">
                                          <label class="custom-control-label" for="weakAccept">1</label>
                                        </div>
                                      </div>
                                      <div class="col">
                                      <h6>Accept</h6>
                                        <div class="custom-control custom-radio">
                                          <input type="radio" id="accept" name="rating" class="custom-control-input"
                                                      value="2" v-model="reviewUtil.rating">
                                          <label class="custom-control-label" for="accept">2</label>
                                        </div>
                                      </div>
                                      </div>
                                    </div>
                                    <h3>Confidence</h3>
                                    <div class="form-group">
                                      <div class="row">
                                        <div class="col">
                                          <div class="custom-control custom-radio">
                                            <input type="radio" id="veryLow" name="confidence" class="custom-control-input"
                                                      value="very low" v-model="reviewUtil.confidence">
                                            <label class="custom-control-label" for="veryLow">very low</label>
                                          </div>
                                        </div>
                                        <div class="col">
                                          <div class="custom-control custom-radio">
                                            <input type="radio" id="low" name="confidence" class="custom-control-input"
                                                      value="low" v-model="reviewUtil.confidence">
                                            <label class="custom-control-label" for="low">low</label>
                                          </div>
                                        </div>
                                          <div class="col">
                                            <div class="custom-control custom-radio">
                                            <input type="radio" id="high" name="confidence" class="custom-control-input"
                                                      value="high" v-model="reviewUtil.confidence">
                                            <label class="custom-control-label" for="high">high</label>
                                          </div>
                                          </div>
                                        <div class="col">
                                          <div class="custom-control custom-radio">
                                            <input type="radio" id="veryHigh" name="confidence" class="custom-control-input"
                                                      value="very high" v-model="reviewUtil.confidence">
                                            <label class="custom-control-label" for="veryHigh">very high</label>
                                          </div>
                                        </div>
                                      </div>
                                      <h3 class="mt-2">Remark</h3>
                                      <div class="form-group row col-sm-8">
                                        <textarea class="form-control" id="remark" rows="8" maxlength="800"
                                                  placeholder="up tp 800 characters" v-model='reviewUtil.text'></textarea>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <button class="btn btn-primary"
                                              @click.prevent="reviewUtil.postReview(distribution)">
                                      Confirm
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            -->
                          </tr>
                          </tbody>
                        </table>
              </div>
            </div>
          </div>
          <div class="card border-light">
            <button class="btn btn-light card-header text-left" data-toggle="collapse" data-target="#handled">
              <i class="fa fa-folder-open mx-2"></i>Handled Paper Review<i class="fa fa-bars float-right"> </i>
            </button>
            <div id="handled" class="collapse" data-parent="#accordion">
              <div class="card-body">
                <table class="table table-hover container col-sm-11">
                  <tbody>
                    <tr>
                      <th scope="col" class="title">Title</th>
                      <th scope="col" class="abs">Abstract</th>
                      <th scope="col">Actions</th>
<!--                      <th v-if="status === 'review over'">Rebuttal</th>-->
                      <th>Rebuttal</th>
                    </tr>
                    <tr v-for="distribution in hddDistributions" :key="distribution.title">
                      <td><h4>{{ distribution.title }}</h4></td>
                      <td><p>{{ distribution.abs }}</p></td>
                      <td>
                          <button class="btn btn-info rounded m-2" data-toggle="modal"
                                    :data-target="'#hddpreview'+distribution.title.replace(/[ :]/g, '-')"
                                    @click="getSrc(distribution)">Preview</button>
                          <a :href="src" :download="distribution.fileName"
                                    class="btn btn-primary rounded text-light m-2">Download</a>
                        <div v-if="(status === 'reviewing') || (canRevise(distribution)['discussion'] &&
                                  canRevise(distribution)['rebuttal'])">
                          <div v-if="((status === 'reviewing') &&
                                    (reviewUtil.findMyReview(distribution).rating[0] === 'a')) ||
                                    ((status === 'review over') &&
                                    (reviewUtil.findMyReview(distribution).rating[0] === 'b'))">
                            <ReviewModal :buttonClass="'btn btn-warning rounded m-2'" :buttonName="'Revise'" :distribution="distribution" :reviewUtil="reviewUtil"
                                      :func="'put'"></ReviewModal>
                            <ReviewModal :buttonClass="'btn btn-success rounded m-2'" :buttonName="'Confirm'" :distribution="distribution" :reviewUtil="reviewUtil"
                                      :func="'no'"></ReviewModal>
                          </div>

                        </div>

                        <div v-else-if="canRevise(distribution)['rebuttal']" class="row">
                          <h5>Open a thread for this submission in "Forum" first.</h5>
                        </div>
                        <button class="btn btn-danger rounded m-2" data-toggle="modal"
                                :data-target="'#result'+distribution.title.replace(/[ :]/g, '-')">Results</button>
                        <div class="modal fade"   :id="'result'+distribution.title.replace(/[ :]/g, '-')" tabindex="-1">
                          <div class="modal-dialog modal-lg">
                            <div class="modal-content"  style="height: 90vh">
                              <div class="modal-header">
                                <h4 class="modal-title"><i class="fa fa-file-pdf-o mr-3"></i>Preview</h4>
                                <button type="button" class="close" data-dismiss="modal">
                                  <span>&times;</span>
                                </button>
                              </div>
                              <div class="modal-body" style="overflow-y: scroll">
                                <table class="table table-hover container" style="table-layout: fixed">
                                  <thead>
                                  <tr>
                                    <th scope="col">Reviewer</th>
                                    <th scope="col">Rating</th>
                                    <th scope="col">Confidence</th>
                                    <th scope="col" width="200px">Remark</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr v-for="(review, index) in reviewUtil.reviewsOf(distribution)" :key="index">
                                    <th scope="row">
                                      {{ index + 1 }}
                                      <span v-if="review.username === user.getUserInfo().username">(You)</span>
                                    </th>
                                    <td>{{ review.rating.substring(1) }}</td>
                                    <td>{{ review.confidence }}</td>
                                    <td>
                                      <textarea class="form-control" rows="6" v-model="review.text" disabled></textarea>
                                    </td>
                                  </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td v-if="status === 'review over'">
                        <p>
                          {{ rebuttalOf(distribution) }}
                        </p>
                      </td>

<!--                            preview-->
                      <div class="modal fade" :id="'hddpreview'+distribution.title.replace(/[ :]/g, '-')" tabindex="-1">
                        <div class="modal-dialog modal-lg">
                          <div class="modal-content"  style="height: 90vh">
                            <div class="modal-header">
                              <h4 class="modal-title"><i class="fa fa-file-pdf-o mr-3"></i>Preview</h4>
                              <button type="button" class="close" data-dismiss="modal">
                                <span>&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                              <object :data="src" type="application/pdf" style="width: 100%; height: 100%">
                                pdf plugin not supported
                              </object>
                            </div>
                          </div>
                        </div>
                      </div>

                    </tr>
                  </tbody>
                </table>
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
  import ReviewModal from './ReviewModal'
  import Alert from './Message/Alert'
  import ReviewUtil from './Review/ReviewUtil'
  import User from './User/User'
  import LeftNav from './LeftNav';
  import Detail from './Detail';
  export default {
    name: 'Review',
    data () {
      return {
        user: new User(),
        alert: new Alert(),
        reviewUtil: new ReviewUtil(this),
        hddDistributions: [], // handled
        uhddDistributions: [], // unhandled
        discussions: [],
        rating: '',
        confidence: '',
        text: '',
        src: ''
      }

    },
    props: ['username', 'fullName', 'abbreviation', 'time', 'location', 'submissionDDL', 'reviewReleaseDate', 'status', 'role'],
    components:
      {
        Detail,
        LeftNav,
        'Navbar': Navbar,
        'InnerNav': InnerNav,
        'ReviewModal': ReviewModal
      },
    methods: {
      getDistributions () {
        this.$axios.get('/distribution', {
          params: {
            username: this.user.getUserInfo().username,
            conference: this.fullName
          }
        })
        .catch(
          error =>
          {
            this.alert.popDanger('fetch distributions error');
          }
        )
        .then(res =>
        {
          if(res && res.status === 200)
          {
            let distributions = res.data.distributions;
            for (let idx in distributions)
            {
              let distribution = distributions[idx];
              if (distribution.status === 'handled')
              {
                this.hddDistributions.push(distribution);
              }
              else if (distribution.status === 'unhandled')
              {
                this.uhddDistributions.push(distribution);
              }
            }
          }
        });
      },
      getSrc (distribution) {
        this.$axios.get('/file', {
          responseType: 'blob',
          params: {
            username: this.user.getUserInfo().username,
            category: 'paper',
            directory: `${distribution.conference}/${distribution.author}/${distribution.title}`
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
      },
      getDiscussions () {
        this.$axios.get('/discussion', {
          params: {
            username: this.user.getUserInfo().username,
            conference: this.fullName
          }
        })
        .catch(
          error =>
          {
            this.alert.popDanger('fetch discussions error');
          }
        )
        .then(res =>
        {
          if(res && res.status === 200)
          {
            this.discussions = res.data.discussions;
          }
        });
      },
      canRevise (submission) {
        let discussions = [];
        for (let idx in this.discussions)
        {
            let discussion = this.discussions[idx];
            if ((submission.conference === discussion.conference) &&
                (submission.author === discussion.author) &&
                (submission.title === discussion.title))
            {
                discussions.push(discussion);
            }
        }

        let rb = this.rebuttalOf(submission);

        return {discussion: (discussions.length > 0), rebuttal: (rb !== '')};
      }
    },
    mounted () {
      document.title += ` - ${this.fullName}`;
      this.getDistributions();
      this.reviewUtil.getReviews();
      if ((this.status === 'review over') || (this.status === 'final'))
      {
        this.reviewUtil.getAcceptances();
      }
      this.getRebuttals();
      this.getDiscussions();
    }
  }

</script>
<style scoped>
  table{
    table-layout: fixed;
  }
  .title{
    width: 200px;
  }
  .abs{
    width: 400px;
  }
  textarea{
    resize: none;
  }
</style>
