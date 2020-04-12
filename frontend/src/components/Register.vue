<template>
  <div id="Register">
    <div class="row">
        <div class="col-sm-5" >
          <div class="container col-sm-12"  style="margin-top:30px;left: 20vh">
          <form>
            <legend class="row">
              <h1 class="col" style="font-family: 'MV Boli';   text-shadow: 5px 5px 5px rgba(75,0,130,0.4); ">Hotchair</h1>
            </legend>
            <h6>
               Welcome,<br/>
               It only takes a <span style="-webkit-text-fill-color: 	#4169E1">few seconds</span> to create your account
            </h6>
        <hr/>
        <div class="form-group row">
          <label for="username" class="col-sm-3 col-form-label">Username</label>
          <input id="username" class="col-sm-9 form-control" v-model="registerForm.username"
                    type="text" auto-complete="off" placeholder="username" @input="validate('username')">
          <div v-for="validAlert in validAlerts.username" :class="validAlert.type" :key="validAlert.content">
            {{ validAlert.content }}
          </div>
        </div>
        <div class="form-group row">
          <label for="password" class="col-sm-3 col-form-label">Password</label>
          <input id="password" class="col-sm-9 form-control" v-model="registerForm.password"
                    type="password" auto-complete="off" placeholder="password" @input="validate('password')">
          <div v-for="validAlert in validAlerts.password" :class="validAlert.type" :key="validAlert.content">
            {{ validAlert.content }}
          </div>
        </div>
        <div class="form-group row">
          <label for="fullName" class="col-sm-3 col-form-label">Full Name</label>
          <input id="fullName" class="col-sm-9 form-control" v-model="registerForm.fullName"
                    type="text" auto-complete="off" placeholder="fullName" @input="validate('fullName')">
          <div v-for="validAlert in validAlerts.fullName" :class="validAlert.type" :key="validAlert.content">
            {{ validAlert.content }}
          </div>
        </div>
        <div class="form-group row">
          <label for="email" class="col-sm-3 col-form-label">Email</label>
          <input id="email" class="col-sm-9 form-control" v-model="registerForm.email"
                    type="email" auto-complete="off" placeholder="email" @input="validate('email')">
          <div v-for="validAlert in validAlerts.email" :class="validAlert.type" :key="validAlert.content">
            {{ validAlert.content }}
          </div>
        </div>
        <div class="form-group row">
          <label for="organization" class="col-sm-3 col-form-label">Organization</label>
          <input id="organization" class="col-sm-9 form-control" v-model="registerForm.organization"
                    type="organization" auto-complete="off" placeholder="organization" @input="validate('organization')">
          <div v-for="validAlert in validAlerts.organization" :class="validAlert.type" :key="validAlert.content">
            {{ validAlert.content }}
          </div>
        </div>
        <div class="form-group row">
          <label for="region" class="col-sm-3 col-form-label">Region</label>
          <select id="region" class="col-sm-9 form-control" v-model="registerForm.region" @change="validate('region')">
            <option v-for="option in options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          <div v-for="validAlert in validAlerts.region" :class="validAlert.type" :key="validAlert.content">
            {{ validAlert.content }}
          </div>
        </div>

        <div v-show="alert.isVisible" :class="alert.type">
          {{ alert.content }}
        </div>
        <hr/>
            <div class="row">
              <div class="col-sm-9">
        <span>Already have an account?</span>
            <router-link to="login" style="-webkit-text-fill-color: 	#4169E1">
              Sign in
            </router-link>
            </div>
              <button class="col-sm-3  btn btn-primary" @click.prevent="register()">Create Account</button>
            </div>
      </form>
        </div>
        </div>

      <div class="d-flex bg-primary" style="width:80vh;position: fixed;right: 0">
        <div id="carousel" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carousel" data-slide-to="0" class="active"></li>
            <li data-target="#carousel" data-slide-to="1"></li>
            <li data-target="#carousel" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner" >
            <div class="carousel-item active">
              <img src="https://www.pcrm.org/sites/default/files/ICNM2018.jpg"
                   class="d-block w-100" alt="conference photo 1">
            </div>
            <div class="carousel-item" >
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
  </div>
</template>

<script>
import Navbar from './Navbar'
import Alert from './Message/Alert'
import regionData from '../assets/data/region.json'
import Validation from './Form/Validation'
const regions = Object.values(regionData);

const emptyForm = {
  username: '',
  password: '',
  fullName: '',
  email: '',
  organization: '',
  region: ''
}

export default {
  name: 'Register',
  data ()
  {
    return {
      registerForm: emptyForm,
      options: regions,
      validation: (new Validation).validateRegister(emptyForm),
      loading: false,
      alert: new Alert(),
      triggered: {
        username: false,
        password: false,
        fullName: false,
        email: false,
        organization: false,
        region: false
      },
      validAlerts: {
        username: [],
        password: [],
        fullName: [],
        email: [],
        organization: [],
        region: []
      }
    }
  },
  components:
  {
    'Navbar': Navbar
  },
  methods: {
    validate (field)
    {
      this.triggered[field] = true;
      this.validation = (new Validation).validateRegister(this.registerForm);
      /* update validation alerts */
      for (let field of Object.keys(this.validAlerts))
      {
        if (this.triggered[field])
        {
          this.validAlerts[field] = [];
          if (this.validation[field].isValid)
          {
            let validAlert = new Alert();
            validAlert.popSuccess("Valid input.");
            this.validAlerts[field].push(validAlert);
          }
          else
          {
            for (let message of this.validation[field].messages)
            {
              let validAlert = new Alert();
              validAlert.popWarning(message);
              this.validAlerts[field].push(validAlert);
            }
          }
        }
      }
    },
    register () {
      for (let field of Object.keys(this.triggered))
      {
        this.triggered[field] = true;
      }
      this.validate();
      if (Object.values(this.validation).every(field => (field.isValid === true)))
      {
        this.$axios.post('/register', this.registerForm)
        .catch(
          error =>
          {
            if (error.response.status === 403)
            {
              this.alert.popDanger('this username has been registered');
            }
            else
            {
              this.alert.popDanger('register error');
            }
          }
        )
        .then(res =>
        {
          if(res && res.status === 200)
          {
            this.alert.popSuccess('register success');
            setTimeout(() =>
            {
              this.$router.replace('/login');
            }, 1500);
          }
        });
      }
    }
  }
}
</script>
<style>
  .carousel-item{
    height: 100vh;
    width:auto;
    overflow: hidden;
  }
  img{
    width:100%;
    transition: 1s filter;
    filter:opacity(60%);
  }
  img:hover{
    filter:none;
  }
</style>
