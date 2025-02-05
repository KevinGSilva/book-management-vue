<script setup>
import api from '@/plugins/axios';
import { onMounted, ref } from 'vue';

const authors = ref([]);

onMounted( async () => {
  let response = await api.get('/api/authors');
  authors.value = response.data;
});

</script>

<template>
  <main>
    <div class="row mt-4">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">Autores</div>
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
                    <a href="#" class="btn btn-warning">Edit</a>
                    <button type="button" class="btn btn-danger" data-id="">Delete</button>
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