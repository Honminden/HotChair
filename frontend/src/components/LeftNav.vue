<template>
  <nav class="nav navbar-expand-sm flex-column bg-light navbar-light" style="min-height: 100vh; width: 200px;text-align: center">
    <router-link class="nav-link" :class="[{ 'bg-white':href.indexOf('/userInfo') != -1 }]" to="userInfo"><i class="fa fa-id-card mx-2"></i>UserInfo</router-link>
    <router-link class="nav-link" :class="[{ 'bg-white':href.indexOf('/list') != -1 }]" to="list"><i class="fa fa-th-list mx-2"></i>List</router-link>
    <router-link class="nav-link" :class="[{ 'bg-white':href.indexOf('/conference') != -1 }]" to="conference"><i class="fa fa-file-o mx-2"></i>Application</router-link>
    <router-link class="nav-link"  :class="[{ 'bg-white':href.indexOf('/notification') != -1 }]" to="notification"><i class="fa fa-envelope mx-2"></i>Notifications</router-link>
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
