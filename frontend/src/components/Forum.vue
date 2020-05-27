<template>
<div class="Forum">
  <Navbar/>
  <div class="row">
    <LeftNav :parent="this"/>
    <div class="container col-sm-10" style="margin-top: 15px">
      <InnerNav :parent="this" class="mb-3"/>
      <div class="accordion" id="accordion">
        <div class="card border-light">
          <button class="btn btn-light card-header text-left" data-toggle="collapse" data-target="#test">
            test submission
            <i class="fa fa-bars float-right"> </i>

          </button>
          <div id="test" class="collapse" data-parent="#accordion">
            <div class="card-body row">
              <div class="col-sm-8">
                <div class="discuss">
<!--他人发言-->
                  <div class="row  mb-4">
                    <h5 class="col-sm-2 mt-3 text-center">chair</h5>
                    <div class="col-sm-10">
                      <div class="bubble-left rounded-lg card border-0" style="width: 350px; background: whitesmoke">
                        <div class="card-body">
                          <p class="card-text">
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row mb-4">
                    <h5 class="col-sm-2 mt-3 text-center">PC1</h5>
                    <div class="col-sm-10">
                      <div class="bubble-left rounded-lg card border-0" style="width: 350px; background: whitesmoke">
                        <div class="card-body">
                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                      </div>
                    </div>
                  </div>
<!--本人发言-->
                  <div class="row mb-4">
                    <div class="col-sm-10">
                      <div class="bubble-right rounded-lg card float-right border-0" style="width: 350px; background: lightgreen">
                        <div class="card-body">
                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                      </div>
                    </div>
                    <h5 class="col-sm-2 mt-3">ME</h5>
                  </div>

                </div>
              </div>

              <div class="col-sm-4 reply">
                <h3><i class="fa fa-mail-forward mr-3"></i>Reply</h3>

                  <hr>
                <div class="form-group">
                  <textarea class="form-control" id="reply" rows="10" v-model='text'></textarea>
                </div>

                <div class="row mr-3 float-right">
                  <button class="btn btn-danger rounded-left" data-toggle="modal" data-target="#revise">Revise</button>
                  <button class="btn btn-info  rounded-right">Reply</button>

                  <!--                  revise-->
                  <div class="modal fade" id="revise" tabindex="-1">
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
                                         value="-2" v-model="rating">
                                  <label class="custom-control-label" for="reject">-2</label>
                                </div>
                              </div>
                              <div class="col">
                                <h6>Weak Reject</h6>
                                <div class="custom-control custom-radio">
                                  <input type="radio" id="weakReject" name="rating" class="custom-control-input"
                                         value="-1" v-model="rating">
                                  <label class="custom-control-label" for="weakReject">-1</label>
                                </div>
                              </div>
                              <div class="col">
                                <h6>Weak Accept</h6>
                                <div class="custom-control custom-radio">
                                  <input type="radio" id="weakAccept" name="rating" class="custom-control-input"
                                         value="1" v-model="rating">
                                  <label class="custom-control-label" for="weakAccept">1</label>
                                </div>
                              </div>
                              <div class="col">
                                <h6>Accept</h6>
                                <div class="custom-control custom-radio">
                                  <input type="radio" id="accept" name="rating" class="custom-control-input"
                                         value="2" v-model="rating">
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
                                         value="very low" v-model="confidence">
                                  <label class="custom-control-label" for="veryLow">very low</label>
                                </div>
                              </div>
                              <div class="col">
                                <div class="custom-control custom-radio">
                                  <input type="radio" id="low" name="confidence" class="custom-control-input"
                                         value="low" v-model="confidence">
                                  <label class="custom-control-label" for="low">low</label>
                                </div>
                              </div>
                              <div class="col">
                                <div class="custom-control custom-radio">
                                  <input type="radio" id="high" name="confidence" class="custom-control-input"
                                         value="high" v-model="confidence">
                                  <label class="custom-control-label" for="high">high</label>
                                </div>
                              </div>
                              <div class="col">
                                <div class="custom-control custom-radio">
                                  <input type="radio" id="veryHigh" name="confidence" class="custom-control-input"
                                         value="very high" v-model="confidence">
                                  <label class="custom-control-label" for="veryHigh">very high</label>
                                </div>
                              </div>
                            </div>
                            <h3 class="mt-2">Remark</h3>
                            <div class="form-group row col-sm-8">
                                        <textarea class="form-control" id="remark" rows="8" maxlength="800"
                                                  placeholder="up tp 800 characters" v-model='text'></textarea>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                          <button class="btn btn-primary">
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

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
  import User from './User/User'
  import LeftNav from './LeftNav';
    export default {
        name: "Forum",
      data () {
        return {
          user: new User(),
          rating: '',
          confidence: '',
          text: '',
          src: ''
        }
      },
      props: ['username', 'fullName', 'abbreviation', 'time', 'location', 'submissionDDL', 'reviewReleaseDate', 'status', 'role'],
      components:
        {
          LeftNav,
          'Navbar': Navbar,
          'InnerNav': InnerNav
        }
    }
</script>

<style scoped>
  .discuss{
    height: 380px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  textarea{
    border-color: lightgrey;
    border-radius:10px;
    resize: none;
  }
  .bubble-left:before{
    content:'';
    position:absolute;
    right:100%;
    top:15px;
    width:0;
    height:0;
    border-width:15px;
    border-style:solid;
    border-color:transparent;
    margin-bottom:-50px;
    border-right-width:15px ;
    border-right-color:currentColor;
    color:whitesmoke;
  }
  .bubble-right:before{
    content:'';
    position:absolute;
    left:100%;
    top:15px;
    width:0;
    height:0;
    border-width:15px;
    border-style:solid;
    border-color:transparent;
    margin-bottom:-50px;
    border-left-width:15px ;
    border-left-color:currentColor;
    color:lightgreen;
  }

</style>
