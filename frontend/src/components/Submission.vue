<template>
  <div id="Submission">
    <Navbar/>
    <InnerNav :parent="this"/>
    <div v-show="alert.isVisible" :class="alert.type">
      {{ alert.content }}
    </div>
    <form class="col-sm-6 container" style="margin-top: 35px">
      <legend class="row">
        <span class="col"></span>
        <h2>Paper Submission</h2>
        <span class="col"></span>
      </legend>
      <hr/>
      <div class="form-group row">
        <label for="title">Title<small class="ml-2">(up to 50 characters)</small></label>
        <input type="text" class="form-control" id="title" maxlength="50">
      </div>
      <div class="form-group row">
        <label for="abstract">Abstract<small class="ml-2">(up to 800 characters)</small></label>
        <textarea class="form-control" id="abstract" rows="10" maxlength="800"></textarea>
      </div>
      <div class="form-group row">
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="file">
          <label class="custom-file-label" for="file">Choose file</label>
        </div>
      </div>
      <div class="row">
        <span class="col"></span>
        <button class="col btn btn-info" @click.prevent="">submit</button>
        <span class="col"></span>
      </div>
    </form>
  </div>

</template>

<script>
import Navbar from './Navbar'
import InnerNav from './InnerNav'
import Alert from './Message/Alert'
import User from './User/User'

export default {
  name: 'Submission',
  data () {
    return {
      user: new User(),
      alert: new Alert()
    }
  },
  props: ['username', 'fullName', 'abbreviation', 'time', 'location', 'submissionDDL', 'reviewReleaseDate', 'status', 'role'],
  components:
  {
    'Navbar': Navbar,
    'InnerNav': InnerNav
  },
  methods: {
  },
  mounted () {
    document.title += ` - ${this.fullName}`;
  }
}

</script>
