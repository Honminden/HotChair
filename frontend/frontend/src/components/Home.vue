<template>
  <div>
    <Navbar/>
  </div>
</template>

<script>
import Navbar from './Navbar'

export default {
  name: 'Home',
  data () {
    return {}
  },
  components:
  {
    'Navbar': Navbar
  }
}
</script>