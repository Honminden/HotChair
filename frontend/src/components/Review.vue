<template>
  <div id="Review">
    <Navbar/>
    <div class="row">
      <LeftNav :parent="this"/>
      <div class="container col-sm-10" style="margin-top: 15px">
        <InnerNav :parent="this" class="mb-3"/>
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
                            <th scope="col">File</th>
                            <th scope="col"></th>
                          </tr>
                          <tr>
                            <td><h4>test</h4></td>
                            <td><p>jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj</p></td>
                            <!--这里target改为相应的id-->
                            <td><button class="btn btn-info" data-toggle="modal" :data-target="'#preview'">Preview</button></td>
                            <td><button class="btn btn-success" data-toggle="modal" :data-target="'#review'">Review</button></td>
                            <!--这里id改为preview+投稿标题-->
                            <div class="modal fade" :id="'preview'" tabindex="-1">
                              <div class="modal-dialog modal-lg">
                                <div class="modal-content"  style="height: 90vh">
                                  <div class="modal-header">
                                    <h4 class="modal-title"><i class="fa fa-file-pdf-o mr-3"></i>Preview</h4>
                                    <button type="button" class="close" data-dismiss="modal">
                                      <span>&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
<!--                                    这里src改成实际的文件链接-->
                                    <iframe :src="src" frameborder="0" style="width: 100%; height: 100%"></iframe>
                                  </div>
                                </div>
                              </div>
                            </div>
<!--                            这里id改为review+标题-->
                            <div class="modal fade" :id="'review'" tabindex="-1">
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
                                      <h6 >Reject</h6>
                                        <div class="custom-control custom-radio">
                                          <input type="radio" id="reject" name="customRadio" class="custom-control-input" checked="">
                                          <label class="custom-control-label" for="reject">-2</label>
                                        </div>
                                      </div>
                                      <div class="col">
                                      <h6>Weak Reject</h6>
                                        <div class="custom-control custom-radio">
                                          <input type="radio" id="weakReject" name="customRadio" class="custom-control-input">
                                          <label class="custom-control-label" for="weakReject">-1</label>
                                        </div>
                                      </div>
                                      <div class="col">
                                      <h6>Weak Accept</h6>
                                        <div class="custom-control custom-radio">
                                          <input type="radio" id="weakAccept" name="customRadio" class="custom-control-input">
                                          <label class="custom-control-label" for="weakAccept">1</label>
                                        </div>
                                      </div>
                                      <div class="col">
                                      <h6>Accept</h6>
                                        <div class="custom-control custom-radio">
                                          <input type="radio" id="accept" name="customRadio" class="custom-control-input">
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
                                            <input type="radio" id="veryLow" name="customRadio" class="custom-control-input">
                                            <label class="custom-control-label" for="veryLow">very low</label>
                                          </div>
                                        </div>
                                        <div class="col">
                                          <div class="custom-control custom-radio">
                                            <input type="radio" id="low" name="customRadio" class="custom-control-input">
                                            <label class="custom-control-label" for="low">low</label>
                                          </div>
                                        </div>
                                          <div class="col">
                                            <div class="custom-control custom-radio">
                                            <input type="radio" id="high" name="customRadio" class="custom-control-input">
                                            <label class="custom-control-label" for="high">high</label>
                                          </div>
                                          </div>
                                        <div class="col">
                                          <div class="custom-control custom-radio">
                                            <input type="radio" id="veryHigh" name="customRadio" class="custom-control-input">
                                            <label class="custom-control-label" for="veryHigh">very high</label>
                                          </div>
                                        </div>
                                      </div>
                                      <h3 class="mt-2">Remark</h3>
                                      <div class="form-group row col-sm-8">
                                        <textarea class="form-control" id="remark" rows="8" maxlength="800" placeholder="up tp 800 characters"></textarea>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <button class="btn btn-primary">Confirm</button>
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
                            <th scope="col">File</th>
                          </tr>
                          <tr>
                            <td><h4></h4></td>
                            <td><p></p></td>
                            <!--这里target改为相应的id-->
                            <td><button class="btn btn-info" data-toggle="modal" :data-target="'#preview'">Preview</button></td>
                            <!--这里id改为preview+投稿标题-->
                            <div class="modal fade" :id="'preview'" tabindex="-1">
                              <div class="modal-dialog modal-lg">
                                <div class="modal-content"  style="height: 90vh">
                                  <div class="modal-header">
                                    <h4 class="modal-title"><i class="fa fa-file-pdf-o mr-3"></i>Preview</h4>
                                    <button type="button" class="close" data-dismiss="modal">
                                      <span>&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
<!--                                    这里src改成实际的文件链接-->
                                    <iframe :src="src" frameborder="0" style="width: 100%; height: 100%"></iframe>
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
  import Alert from './Message/Alert'
  import User from './User/User'
  import LeftNav from "./LeftNav";
  import Detail from "./Detail";
  export default {
    name: 'Review',
    data () {
      return {
        user: new User(),
        alert: new Alert(),
        // for display
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
    width: 500px;
  }

</style>
