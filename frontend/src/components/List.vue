<template>
  <div id="List">
    <Navbar/>
    <div class="container col-sm-10">
      <div class="card border-light mb-5">
        <div class="card-header">Abbreviation for the conference1 </div>
        <div class="card-body">
          <h5 class="card-title">state:passed</h5>
          <p class="card-text">Some information for the conference.Some information for the conference.Some information for the conference.Some information for the conference.....................................................................................</p>
          <a href="#" class="btn btn-primary">details</a>
        </div>
      </div>
      <div class="card border-light mb-5" >
        <div class="card-header">Abbreviation for the conference2 </div>
        <div class="card-body">
          <h5 class="card-title">state:passed</h5>
          <p class="card-text">Some information for the conference.Some information for the conference.Some information for the conference..</p>
          <a href="#" class="btn btn-primary">details</a>
        </div>
      </div>
      <div class="card border-light mb-5" >
        <div class="card-header">Abbreviation for the conference2 </div>
        <div class="card-body">
          <h5 class="card-title">state:passed</h5>
          <p class="card-text">Some information for the conference.Some information for the conference.Some information for the conference..</p>
          <a href="#" class="btn btn-primary">details</a>
        </div>
      </div>
      </div>
  </div>
</template>
<style>
  .card{
    width: 40%;
    height: 30%;
    float: left;
    margin-left: 3%;
  }
  .card-text{
    height: 10%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
<script>
  import Navbar from './Navbar'

  export default {
    name: 'List',
    data () {
      return {}
    },
    components:
      {
        'Navbar': Navbar
      }

  }

</script>
