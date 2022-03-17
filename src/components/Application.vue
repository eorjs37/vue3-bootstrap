<template>
  <p class="m-2">
      총 {{ applications_count }} 개의 애플리케이션 총
      {{ applicaions.length }}개가 보여집니다.
  </p>
  <hr>

  <div class="row row-cols-1 row-cols-sm-3 g-2 m-0">
      <div class="col" v-for="data in applicaions" :key="data.id">
          <app-card :data="data"></app-card>
      </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import useAxios from '/@app_modules/axios.js';
import AppCard from '/@components/AppCard.vue';
export default {
    name:'Application',
    setup(){
        const store = useStore();
        const { axiosGet } = useAxios();

        const applicaions = computed(()=> 
            store.getters['applications/applications']()
        )

        const applications_count = computed(()=> store.getters['applications/applications_count']);

        onMounted(() => {
            if(!store.getters.applications_count){
                axiosGet('/db/applications',(data)=>{
                    store.dispatch('applications/setApplications',data.data)
                });
            }
        });


        return{
            applications_count,
            applicaions
        }
    },
    components:{
        AppCard
    }
}
</script>

<style>

</style>