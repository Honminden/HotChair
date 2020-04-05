<template>
  <div id="Register">
    <Navbar/>
    <div class="row">
      <span class="col"></span>
      <form class="col">
        <legend class="row">
          <span class="col"></span>
          <h2 class="col">Register</h2>
          <span class="col"></span>
        </legend>
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
        <div class="row">
          <span class="col"></span>
          <button class="col btn btn-info" @click="register()">register</button>
          <span class="col"></span>
        </div>
        <div v-show="alert.isVisible" :class="alert.type">
          {{ alert.content }}
        </div>
        <hr/>
        <span>already have an account?</span>
        <router-link to="login">
          <button class="btn btn-outline-info">login</button>
        </router-link>
      </form>
      <span class="col"></span>
    </div>
    <div class="row"></div>
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
      validation: Validation(emptyForm),
      loading: false,
      alert: new Alert(),
      triggered: {
        username: false,
        password: false,
        email: false,
        organization: false,
        region: false
      },
      validAlerts: {
        username: [],
        password: [],
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
      this.validation = Validation(this.registerForm);
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
      this.validate();
      if (Object.values(this.validation).every(field => (field.isValid === true)))
      {
        this.$axios.post('/register', this.registerForm)
        .catch(
          error => 
          {
            this.alert.popDanger('register error');
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