<template>
  <div>
    <Navbar/>
    <div class="container d-flex">
      <div id="carousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carousel" data-slide-to="0" class="active"></li>
          <li data-target="#carousel" data-slide-to="1"></li>
          <li data-target="#carousel" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://www.pcrm.org/sites/default/files/ICNM2018.jpg" 
                      class="d-block w-100" alt="conference photo 1">
          </div>
          <div class="carousel-item">
            <img src="https://cdn.meetingsbooker.com/images/venues/Edinburgh-International-Conference-Centre-14.jpg" 
                      class="d-block w-100" alt="conference photo 2">
          </div>
          <div class="carousel-item">
            <img src="https://www.hkafcn.hk/wp-content/uploads/2013/03/time2017_1.jpg" 
                      class="d-block w-100" alt="conference photo 3">
          </div>
        </div>
        <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
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