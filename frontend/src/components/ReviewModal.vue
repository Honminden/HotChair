<template>
  <div id="ReviewModal">
    <button :class="buttonClass" data-toggle="modal"
            :data-target="'#' + buttonName + distribution.title.replace(/[ :]/g, '-')">{{ buttonName }}</button>
    <div class="modal fade" :id="buttonName + distribution.title.replace(/[ :]/g, '-')" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content"  style="height: 90vh">
          <div class="modal-header">
            <h4 class="modal-title"><i class="fa fa-pencil-square-o mr-3"></i>{{ buttonName }}</h4>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div v-if="(func === 'post') || (func === 'put')" class="modal-body col-sm-11 container">
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
          <div v-else-if="func === 'no'" class="modal-body">
            <p>
              Make no change to your review?
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button v-if="func === 'post'" class="btn btn-primary"
                      @click.prevent="reviewUtil.postReview(distribution)">
              Confirm
            </button>
            <button v-if="func === 'put'" class="btn btn-primary"
                      @click.prevent="reviewUtil.putReview(distribution)">
              Confirm
            </button>
            <button v-if="func === 'no'" class="btn btn-primary"
                      @click.prevent="reviewUtil.confirmReview(distribution)">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from './User/User'

export default {
  name: 'InnerNav',
  data () {
    return {
        user: new User()
      }
  },
  props: ['buttonClass', 'buttonName', 'reviewUtil', 'distribution', 'func']
}
</script>