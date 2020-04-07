<template>
  <div id="Notification">
    <Navbar/>
  </div>

</template>
<script>
  import Navbar from './Navbar'

  export default {
    name: 'Notification',
    data () {
      return {}
    },
    components:
      {
        'Navbar': Navbar
      }

  }

</script>
