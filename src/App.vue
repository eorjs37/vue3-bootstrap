<template>
  <NavBar />
  <ProfileVue/>
</template>

<script>
import NavBar from './components/NavBar.vue'
import ProfileVue from './components/Profile.vue'
export default {
  name: 'App',
  components: {
    NavBar,
    ProfileVue
  }
}
</script>
