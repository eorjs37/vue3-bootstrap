<template>
  <main class="container">
    <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
        <div class="col-md-6 px-0">
        <h1 class="display-4 fst-italic">Title of a longer featured blog post</h1>
        <p class="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
        <p class="lead mb-0"><a href="#" class="text-white fw-bold">Continue reading...</a></p>
        </div>
    </div>

    <div class="row mb-2">
        <div class="col-md-6">
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
            <strong class="d-inline-block mb-2 text-primary">World</strong>
            <h3 class="mb-0">Featured post</h3>
            <div class="mb-1 text-muted">Nov 12</div>
            <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="stretched-link">Continue reading</a>
            </div>
            <div class="col-auto d-none d-lg-block">
            <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

            </div>
        </div>
        </div>
        <div class="col-md-6">
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
            <strong class="d-inline-block mb-2 text-success">Design</strong>
            <h3 class="mb-0">Post title</h3>
            <div class="mb-1 text-muted">Nov 11</div>
            <p class="mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="stretched-link">Continue reading</a>
            </div>
            <div class="col-auto d-none d-lg-block">
            <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

            </div>
        </div>
        </div>
    </div>

    <div class="row g-5">
        <div class="col-md-8">
        <h3 class="pb-4 mb-4 fst-italic border-bottom">
            From the Firehose
        </h3>

        <article class="blog-post" v-for="article in posts" :key="article.id">
          <h2 class="blog-post-title">{{ article.title }}</h2>
          <p class="blog-post-meta">{{ article.date }}</p>
          <div v-html="article.post"></div>
        </article>


        <nav class="blog-pagination" aria-label="Pagination">
            <a href="#" class="btn" @click="page--" :class="[page == 1 ? 'btn-outline-secondary disabled' : 'btn-outline-primary']">Older</a>
            {{ page }}
            <a href="#" class="btn" @click="page++" :class="[page == total_pages ? 'btn-outline-secondary disabled' : 'btn-outline-primary']">Newer</a>
        </nav>

        </div>

        <div class="col-md-4">
        <div class="position-sticky" style="top: 2rem;">
            <div class="p-4 mb-3 bg-light rounded">
            <h4 class="fst-italic">About</h4>
            <p class="mb-0">Customize this section to tell your visitors a little bit about your publication, writers, content, or something else entirely. Totally up to you.</p>
            </div>

            <div class="p-4">
                <h4 class="fst-italic">Archives</h4>
                <ol class="list-unstyled mb-0">
                    <li v-for="(archive, index) in archives" :key="index">
                        <a href="#" data-toggle="collapse" :data-target="'#archive-'+index">
                            {{ archive.key }}
                        </a>
                        <div class="collapse" :id="'archive-'+index">
                            <ol class="list-unstyled ms-3">
                                <li v-for="post in archive.posts" :key="post.id">
                                    {{ post.date.substring(0,10) + ': '}}
                                    <a :href="'#article-'+post.id" @click="onArchive($event,post.id)">
                                        {{ post.title.substring(0,20) }}
                                    </a>
                                </li>
                            </ol>
                        </div>
                    </li>
                </ol>
            </div>

            <div class="p-4">
            <h4 class="fst-italic">Elsewhere</h4>
            <ol class="list-unstyled">
                <li><a href="#">GitHub</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Facebook</a></li>
            </ol>
            </div>
        </div>
        </div>
    </div>
  </main>
</template>

<script>
import { reactive, onMounted, ref, computed } from "vue";
import useAxios from '/@app_modules/axios.js';
export default {
    setup(){
        const { axiosGet } = useAxios();
        const posts = reactive([]);
        onMounted(() =>{
            axiosGet('/db/blog', onSuccess)
        });

        const onSuccess  = (data) =>{
            Object.assign(posts, data.data);
            total_pages.value = posts.length;


            const temp_group = posts.reduce((accumlator,currentValue) =>{
                ;(accumlator[currentValue['date'].substring(0,7)] = (accumlator[currentValue['date'].substring(0,7)]) || []).push(currentValue) 
                return accumlator
            },{});

            Object.assign(
                archives,
                Object.keys(temp_group).map((key) =>({
                    key:key,
                    posts: temp_group[key]
                }))
            )
        }

        //pagination
        const rows = ref(5);
        const total_rows = ref(0);
        const page = ref(1);
        const total_pages = computed(() =>{
            return Math.ceil(total_rows.value / rows.value);
        });
        const sliced_posts = computed(() =>{
            return posts.slice((page.value-1)*rows.value, page.value* rows.value);
        })


        //archives
        const archives = reactive([]);
        const onArchive = (evt,id) =>{
            const index = posts.findIndex((post) => post.id === id) +1;
            page.value =  Math.ceil(index/rows.value);
        }

        return{
            sliced_posts,
            posts,
            page,
            total_pages,
            archives,
            onArchive
        }
    },
}
</script>

<style scoped>
/* Pagination */
.blog-pagination {
  margin-bottom: 4rem;
}
.blog-pagination > .btn {
  border-radius: 2rem;
}

/*
 * Blog posts
 */
.blog-post {
  margin-bottom: 4rem;
}
.blog-post-title {
  margin-bottom: .25rem;
  font-size: 2.5rem;
}
.blog-post-meta {
  margin-bottom: 1.25rem;
  color: #727272;
}

</style>