<script setup>
import api from '@/plugins/axios';
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { AnFilledDelete } from '@kalimahapps/vue-icons';
import { RouterLink } from 'vue-router';
import { FeEdit } from '@kalimahapps/vue-icons';

const books = ref([]);

onMounted( async () => {
  let response = await api.get('/api/books?withAuthor=true');
  books.value = response.data;
});

const deleteBook = async (id) => {
  const result = await Swal.fire({
    title: 'Tem certeza?',
    text: 'Essa ação não pode ser desfeita!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    try {
      await api.delete(`/api/books/${id}`);
      books.value = books.value.filter(book => book.id !== id);
      Swal.fire('Excluído!', 'O livro foi excluído.', 'success');
    } catch (error) {
      Swal.fire('Erro!', error.response.data.message, 'error');
    }
  }
};
</script>

<template>
  <main>
    <div class="row mt-4">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span>Livros</span>
            <RouterLink to="/books/create" class="btn btn-primary">Novo Livro</RouterLink>
          </div>
          <div class="card-body">
            <table class="table table-bordered" id="content">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Data de publicação</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="book in books" :key="book.id">
                  <td>{{ book.id }}</td>
                  <td>{{ book.title }}</td>
                  <td>{{ book.author.name }}</td>
                  <td>{{ formatDate(book.published_at) }}</td>
                  <td>
                    <RouterLink :to="{ name: 'books.edit', params: { id: book.id } }" class="mx-2">
                      <FeEdit class="text-primary fs-4" />
                    </RouterLink>
                    <a href="#" class="mx-2" @click="deleteBook(book.id)">
                      <AnFilledDelete  class="text-red fs-4" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>