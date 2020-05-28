<template>
  <div id="Register">
    <div class="row-cols-sm-1">
      <div class="col-sm-5" style="margin:30px 15vh 30px">
<!--          <div class="container col-sm-11"  style="margin-top:30px;left: 20vh">-->
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
              <i :class="validAlert.icon"></i>{{ validAlert.content }}
            </div>
          </div>
          <div class="form-group row">
            <label for="password" class="col-sm-3 col-form-label">Password</label>
            <input id="password" class="col-sm-9 form-control" v-model="registerForm.password"
                      type="password" auto-complete="off" placeholder="password" @input="validate('password')">
            <div v-for="validAlert in validAlerts.password" :class="validAlert.type" :key="validAlert.content">
              <i :class="validAlert.icon"></i>{{ validAlert.content }}
            </div>
          </div>
          <div class="form-group row">
            <label for="fullName" class="col-sm-3 col-form-label">Full Name</label>
            <input id="fullName" class="col-sm-9 form-control" v-model="registerForm.fullName"
                      type="text" auto-complete="off" placeholder="fullName" @input="validate('fullName')">
            <div v-for="validAlert in validAlerts.fullName" :class="validAlert.type" :key="validAlert.content">
              <i :class="validAlert.icon"></i>{{ validAlert.content }}
            </div>
          </div>
          <div class="form-group row">
            <label for="email" class="col-sm-3 col-form-label">Email</label>
            <input id="email" class="col-sm-9 form-control" v-model="registerForm.email"
                      type="email" auto-complete="off" placeholder="email" @input="validate('email')">
            <div v-for="validAlert in validAlerts.email" :class="validAlert.type" :key="validAlert.content">
              <i :class="validAlert.icon"></i>{{ validAlert.content }}
            </div>
          </div>
          <div class="form-group row">
            <label for="organization" class="col-sm-3 col-form-label">Organization</label>
            <input id="organization" class="col-sm-9 form-control" v-model="registerForm.organization"
                      type="organization" auto-complete="off" placeholder="organization" @input="validate('organization')">
            <div v-for="validAlert in validAlerts.organization" :class="validAlert.type" :key="validAlert.content">
              <i :class="validAlert.icon"></i>{{ validAlert.content }}
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
              <i :class="validAlert.icon"></i>{{ validAlert.content }}
            </div>
          </div>

          <div v-show="alert.isVisible" :class="alert.type">
            <i :class="alert.icon"></i>{{ alert.content }}
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
<!--        </div>-->
      </div>
      <Carousel/>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Alert from './Message/Alert'
import regionData from '../assets/data/region.json'
import Validation from './Form/Validation'
import ValidUtil from './Form/ValidUtil'
import Carousel from "./Carousel";
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
    Carousel,
    'Navbar': Navbar
  },
  methods: {
    validate (field)
    {
      this.validation = (new Validation).validateRegister(this.registerForm);
      return (new ValidUtil).validateField(this.triggered, this.validation, this.validAlerts, field);
    },
    register () {
      for (let field of Object.keys(this.triggered))
      {
        this.triggered[field] = true;
      }
      if (this.validate())
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
<style scoped>
  .carousel-outer{
    right: 0;
    top: 0
  }
</style>
