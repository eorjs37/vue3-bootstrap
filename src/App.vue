<template>
  <NavBar />
  <Application/>
</template>

<script>
import NavBar from './components/NavBar.vue'
import ProfileVue from './components/Profile.vue';
import Application from './components/Application.vue';
export default {
  name: 'App',
  components: {
    NavBar,
    ProfileVue,
    Application
  }
}
</script>
