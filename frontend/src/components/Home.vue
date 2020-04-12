<template>
  <div>
    <Navbar/>
    <div class="container" style="margin-top: 10vh">
      <div class="row">
        <div class="col-sm-7">
            <h1 class="text-primary" style="font-size: 70px;">Hotchair</h1>
          <p  style="font-size: 25px;-webkit-text-fill-color: grey">
            Hold and handle conferences.<br/>
            Fast, clear, and stable.<br/>
            It's easy to arrange conferences, or manage paper submission.<br/>
          </p>
          <router-link to="list" class="col-sm-4 btn btn-outline-primary btn-lg">Get started</router-link><br/>
          <p style="margin-top: 20px;">©404NotFound fjy saq xyb ytq</p>
        </div>
          <div class="col-sm-5">
    <img src="../assets/background/icon.png" width="100%">
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'

export default {
  name: 'Home',
  data () {
    return {}
  },
  components:
  {
    'Navbar': Navbar
  }
}
</script>
