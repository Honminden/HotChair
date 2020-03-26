<template>
  <div id="base_register">
    <el-form :model="registerForm" class="register_container" label-position="left"
              label-width="100px" v-loading="loading" :ref="registerForm">
      <h3 class="register_title">Register</h3>
      <el-form-item label="username" prop="username">
        <el-input type="text" v-model="registerForm.username" auto-complete="off" 
                  placeholder="username" @input="validate()"></el-input>
        <el-alert v-for="message in validation.username.messages" v-show="!validation.username.isValid" 
                  :key="message" type="error" show-icon>
          {{ message }}
        </el-alert>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input type="password" v-model="registerForm.password" auto-complete="off" 
                  placeholder="password" @input="validate()"></el-input>
        <el-alert v-for="message in validation.password.messages" v-show="!validation.password.isValid" 
                  :key="message" type="error" show-icon>
          {{ message }}
        </el-alert>
      </el-form-item>
      <el-form-item label="email" prop="email">
        <el-input type="email" v-model="registerForm.email" auto-complete="off" 
                  placeholder="email" @input="validate()"></el-input>
        <el-alert v-for="message in validation.email.messages" v-show="!validation.email.isValid" 
                  :key="message" type="error" show-icon>
          {{ message }}
        </el-alert>
      </el-form-item>
      <el-form-item label="organization" prop="organization">
        <el-input type="text" v-model="registerForm.organization" auto-complete="off" 
                  placeholder="organization" @input="validate()"></el-input>
        <el-alert v-for="message in validation.organization.messages" v-show="!validation.organization.isValid" 
                  :key="message" type="error" show-icon>
          {{ message }}
        </el-alert>
      </el-form-item>
      <el-form-item label="region" prop="region">
        <el-select v-model="registerForm.region" @change="validate()">
          <el-option v-for="option in options" :key="option" :value="option" :label="option"></el-option>
        </el-select>
        <el-alert v-for="message in validation.region.messages" v-show="!validation.region.isValid" 
                  :key="message" type="error" show-icon>
          {{ message }}
        </el-alert>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="register()">register</el-button>
        <el-alert v-show="alert.isVisible" :type="alert.type" :closable="false" show-icon>
          {{ alert.content }}
        </el-alert>
      </el-form-item>
      <hr/>
      <el-form-item>
      <el-form-item>
        <span>already have an account?</span>
      </el-form-item>
        <router-link to="login">
          <el-button type="round">login</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import regionData from '../assets/data/region.json'
import Validation from './Form/Validation'
import Alert from './Message/Alert'
const regions = Object.values(regionData);

const emptyForm = {
  username: '',
  password: '',
  email: '',
  organization: '',
  region: ''
}
const requiredRule = {required: true, message: '', trigger: 'input'};

export default {
  name: 'Register',
  data ()
  {
    return {
      registerForm: emptyForm,
      options: regions,
      canValidate: {
        username: false,
        password: false,
        email: false,
        organization: false,
        region: false
      },
      validation: Validation(emptyForm),
      rules: {
        username: [requiredRule],
        password: [requiredRule],
        email: [requiredRule],
        organization: [requiredRule],
        region: [requiredRule]
      },
      loading: false,
      alert: Alert(false, 'error', '')
    }
  },
  methods: {
    validate ()
    {
      this.validation = Validation(this.registerForm);
    },
    register () {
      this.validate();
      if (Object.values(this.validation).every(field => (field.isValid === true)))
      {
        this.$axios.post('/register', this.registerForm)
        .catch(
          error => 
          {
            this.alert = Alert(true, 'error', 'register error');
          }
        )
        .then(res => 
        {
          if(res && res.status === 200 && res.data.hasOwnProperty("token"))
          {
            this.alert = Alert(true, 'success', 'register success');
            this.$router.replace('/login');
          }
        });
      }
    }
  }
}
</script>

<style scoped>
  #base_register{
    background: url("../assets/background/checkerboard-cross.png") repeat;
    background-position: center;
    height: auto;
    width: 100%;
    background-size: cover;
    position: absolute;
  }
  .register_container{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .register_title{
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>