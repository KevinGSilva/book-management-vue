<script setup>
import api from '@/plugins/axios';
import { onMounted, ref } from 'vue';
import placeholderImage from '@/assets/img/illustrations/book_placeholder.jpg';

const books = ref([]);

onMounted(async () => {
  let response = await api.get('/api/books?withAuthor=true');
  books.value = response.data;
});
</script>

<template>
  <main>
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div class="container-lg px-4">
            <div class="row gx-4 gy-4">
              <div class="col-lg-3 h-100" v-for="book in books" :key="book.id">
                <div class="card shadow-lg border-0 rounded-lg mt-3">
                  <img :src="book.cover_url ? book.cover_url : placeholderImage" class="card-img-top" alt="Book Cover">
                  <div class="card-body">
                    <h5 class="card-title">{{ book.title }}</h5>
                    <p class="card-text"> Autor - {{ book.author.name }}</p>
                    <p class="card-text">{{ book.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </main>
</template>
