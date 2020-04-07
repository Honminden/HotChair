<template>
  <div id="Detail">
    <Navbar/>
  </div>

</template>

<script>
  import Navbar from './Navbar'

  export default {
    name: 'Detail',
    data () {
      return {}
    },
    components:
      {
        'Navbar': Navbar
      }

  }

</script>
