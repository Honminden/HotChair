<template>
  <div>
    <nav class="navbar-inverse">
    <div class="container">
      <div class="collapse navbar-collapse" >
        <span id="title">Conference</span>
        <ul class="nav navbar-nav">
          <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="">Help<span class="caret"></span></a>
          </li>
          <li><a href="">Conferences</a></li>
          <li><a href="" class="login_menu"><span class="glyphicon glyphicon glyphicon-user"> User</span></a></li>
          <li><a href=""><span class="glyphicon glyphicon glyphicon-user" @click="logOut"><router-link to="login">logout</router-link></span></a></li>
          <li><a href="" class="signup_menu"><span class="glyphicon glyphicon glyphicon-home"><router-link to="/">Home</router-link></span></a></li>
        </ul>
      </div>
    </div>
    </nav>

    <article>
      <div class="center-block">
        <h1>Application</h1>

        <form :model="confForm" class="form-horizontal">
          <div class="form-group row">
            <div class="col-sm-2 col-sm-offset-3">
              <label class="control-label">Full Name</label>
            </div>
            <div class="col-sm-4 ">
              <input type="text" name="fullName" class="form-control" v-model="confForm.fullName" 
                    auto-complete="off" placeholder="Full Name" required>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-2 col-sm-offset-3">
                <label class="control-label">Abbreviation</label>
            </div>
            <div class="col-sm-4">
              <input type="text"  name="abbreviation" class="form-control" v-model="confForm.abbreviation" 
                    auto-complete="off" placeholder="Abbreviation" required>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-2 col-sm-offset-3">
              <label class="control-label">Date and Time</label>
            </div>
            <div class="col-sm-4">
              <input type="datetime-local" name="time" class="form-control" v-model="confForm.time" 
                auto-complete="off" placeholder="Date and Time" required>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-2 col-sm-offset-3">
              <label class="control-label">Location</label>
            </div>
            <div class="col-sm-4">
              <input type="text" name="location" class="form-control" v-model="confForm.location" 
                  auto-complete="off" placeholder="Location" required>
            </div>
          </div>

          <div class="form-group row">
          <div class="col-sm-2 col-sm-offset-3">
            <label class="control-label">Submission Deadline</label>
          </div>
          <div class="col-sm-4">
            <input type="date" name="submissionDDL" class="form-control" v-model="confForm.submissionDDL" 
                auto-complete="off" placeholder="Submission Deadline" required>
          </div>
          </div>

          <div class="form-group row ">
          <div class="col-sm-2 col-sm-offset-3">
            <label class="control-label">Review Release Date</label>
          </div>
          <div class="col-sm-4">
            <input type="date" name="reviewReleaseDate" class="form-control" v-model="confForm.reviewReleaseDate" 
                auto-complete="off" placeholder="Review Release Date" required>
          </div>
          </div>

          <div class="form-group row ">

          <input class="button btn btn-success col-md-1 col-sm-offset-8" name="submit" style="margin-bottom:20px" 
              type="submit" value="submit" @click.prevent="submit"/>
          </div>

        </form>
      </div>
    </article>
  </div>
</template>

<script>
import User from './User/User'
const user = User();

export default {
  name: 'Conference',
  data () {
    return {
      confForm: {
        fullName: '',
        abbreviation: '',
        time: '',
        location: '',
        submissionDDL: '',
        reviewReleaseDate: ''
      },
      loading: false
    }
  },
  methods: {
    logOut () {
      user.logOut();
    },
    submit () {
      console.log(this.confForm)
      this.$axios.post('/conference', this.confForm)
      .catch(
        error => 
        {
          alert('submit error');
        }
      )
      .then(res => 
      {
        if(res && res.status === 200)
        {
          alert('form submitted');
        }
        else
        {
          alert('submit error');
        }
      });
    }
  }
}
</script>

<style>
  @import url("https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css");
  @import url("http://www.zaarapp.com/assets/css/style.css");
  .form-group{
    margin-bottom: 20px;
    text-align: center;
  }
  h1{
    text-align: center;
    margin-bottom: 30px;
    margin-top: 20px;
    font-family: 隶书;
  }
  .center-block{
    width: 80%;
    position: relative;
    top:0;
    background-color: whitesmoke;
  }
  body{
    background: url("../assets/background/double-bubble-outline.png") repeat;
  }
  #title{
    font-size: 30px;
    font-family: "MV Boli";
    -webkit-text-fill-color: slategrey;
    font-style: italic;
  }
</style>