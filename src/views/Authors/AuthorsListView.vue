<script setup>
import api from '@/plugins/axios';
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { AnFilledDelete } from '@kalimahapps/vue-icons';
import { RouterLink } from 'vue-router';
import { FeEdit } from '@kalimahapps/vue-icons';

const authors = ref([]);

onMounted( async () => {
  let response = await api.get('/api/authors');
  authors.value = response.data;
});

const authorStatus = (status) => {
  return status ? 'Ativo' : 'Inativo';
};

const deleteAuthor = async (id) => {
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
      await api.delete(`/api/authors/${id}`);
      authors.value = authors.value.filter(author => author.id !== id);
      Swal.fire('Excluído!', 'O autor foi excluído.', 'success');
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
            <span>Autores</span>
            <RouterLink to="/authors/create" class="btn btn-primary">Novo autor</RouterLink>
          </div>
          <div class="card-body">
            <table class="table table-bordered" id="content">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Estado</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="author in authors" :key="author.id">
                  <td>{{ author.id }}</td>
                  <td>{{ author.name }}</td>
                  <td>{{ authorStatus(author.status) }}</td>
                  <td>
                    <RouterLink :to="{ name: 'authors.edit', params: { id: author.id } }" class="mx-2">
                      <FeEdit class="text-primary fs-4" />
                    </RouterLink>
                    <a href="#" class="mx-2" @click="deleteAuthor(author.id)">
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