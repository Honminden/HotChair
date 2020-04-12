<template>
  <nav class="nav navbar-expand-sm flex-column bg-light navbar-light" style="min-height: 100vh; width: 200px;text-align: center">
    <router-link class="nav-link" :class="[{ 'bg-white':href.indexOf('/userInfo') != -1 }]" to="userInfo">UserInfo</router-link>
    <router-link class="nav-link" :class="[{ 'bg-white':href.indexOf('/list') != -1 }]" to="list">List</router-link>
    <router-link class="nav-link" :class="[{ 'bg-white':href.indexOf('/conference') != -1 }]" to="conference">Application</router-link>
    <router-link class="nav-link"  :class="[{ 'bg-white':href.indexOf('/notification') != -1 }]"to="notification">Notifications</router-link>
  </nav>
</template>

<script>
    export default {
        name: "LeftNav",
      data(){
          return {
            href: location.href
          }
      }
    }
</script>
