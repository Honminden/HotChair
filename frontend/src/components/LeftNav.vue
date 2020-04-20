<template>
  <ul class="nav nav-pills navbar-expand-sm flex-column bg-light navbar-light text-left" style="min-height: 100vh; min-width: 15vw;">
    <li class="nav-item ml-2">
      <router-link class="nav-link m-2 rounded" :class="[{ 'active': highlight === 'userInfo' }]" to="userInfo">
        <i class="fa fa-id-card mx-2"></i>User Info
      </router-link>
    </li>
    <li class="nav-item ml-2">
      <router-link class="nav-link m-2 rounded" :class="[{ 'active': highlight === 'list' }]" to="list">
        <i class="fa fa-th-list mx-2"></i>List of Conferences
      </router-link>
    </li>
    <li v-if="!user.isAdmin()" class="nav-item ml-2">
      <router-link class="nav-link m-2 rounded" :class="[{ 'active': highlight === 'conference' }]" to="conference">
        <i class="fa fa-file-o mx-2"></i>New Conference
      </router-link>
    </li>
    <li v-if="!user.isAdmin()" class="nav-item ml-2">
      <router-link class="nav-link m-2 rounded"  :class="[{ 'active': highlight === 'notification' }]" to="notification">
        <i class="fa fa-envelope mx-2"></i>Notifications
      </router-link>
    </li>
  </ul>
</template>

<script>
import User from './User/User'

export default {
  name: "LeftNav",
  data(){
    return {
      user: new User(),
      highlight: ""
    }
  },
  props: ['parent'],
  mounted () {
    switch (this.parent.$el.id)
    {
      case ('UserInfo'):
        this.highlight = 'userInfo';
        break;
      case ('List'):
      case ('Detail'):
      case ('Author'):
      case ('Invitation'):
      case ('Submission'):
        this.highlight = 'list';
        break;
      case ('Conference'):
        this.highlight = 'conference';
        break;
      case ('Notification'):
        this.highlight = 'notification';
        break;
      default:
        break;
    }
  }
}

</script>
