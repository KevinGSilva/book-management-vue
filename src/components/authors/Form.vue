<script setup>
import api from '@/plugins/axios';
import { computed, reactive, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import router from '@/router';
import { format, parseISO } from 'date-fns';

const route = useRoute();
const authorId = route.params.id || null;

const isEdit = computed(() => authorId !== null);

const form = reactive({
  name: '',
  status: '',
});

const books = ref([]);

const fetchAuthor = async () => {
  if (isEdit.value) {
    try {
      const response = await api.get(`/api/authors/${authorId}`);
      Object.assign(form, response.data);

      const responseBook = await api.get(`/api/authors/${authorId}/books`);
      books.value = responseBook.data;
    } catch (error) {
      console.error('Erro ao buscar autor:', error);
    }
  }
};

const submitted = ref(false);

const errors = computed(() => {
  if (!submitted.value) return {};
  const errs = {};

  if (!form.name) {
    errs.name = "O nome é obrigatório.";
  }

  if (!form.status) {
    errs.status = "O Estado é obrigatório.";
  }

  return errs;
});

const isFormValid = computed(() => Object.keys(errors.value).length === 0);

const updateOrCreateAuthor = async () => {

  submitted.value = true;

  if (isFormValid.value){
    if (isEdit.value){
      try {
        await api.put(`/api/authors/${authorId}`, form);
        await Swal.fire('Sucesso!', 'O autor foi editado com sucesso.', 'success');
        router.push('/authors');
      } catch (error) {
        Swal.fire('Erro!', error.response.data.message, 'error');
      }
    } else {
      try {
        await api.post('/api/authors/', form);
        await Swal.fire('Sucesso!', 'O autor foi criado com sucesso.', 'success');
        router.push('/authors');
      } catch (error) {
        Swal.fire('Erro!', error.response.data.message, 'error');
      }
    }
  }
}

onMounted(() => {
  fetchAuthor();
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  return format(parseISO(dateString), 'dd/MM/yyyy');
};
</script>

<template>
  <main>
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div class="container-lg px-4">
            <div class="row justify-content-center">
              <div class="col-lg-4">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                  <div class="card-header justify-content-center">
                    <h3 class="fw-light my-4">{{ isEdit ? "Editar Autor" : "Criar Autor" }}</h3>
                  </div>
                  <div class="card-body">
                    <form @submit.prevent="submitForm">
                      <div class="row gx-3">
                        <div class="col-lg-12">
                          <div class="mb-3">
                            <label class="small mb-1" for="name">Nome</label>
                            <input class="form-control" name="name" type="text" placeholder="Nome" v-model="form.name" :class="{ 'is-invalid': errors.name }" />
                            <span  class="text-danger" v-if="errors.name">{{ errors.name }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label class="small mb-1" for="status">Estado</label>
                        <select class="form-control" name="status" v-model="form.status" :class="{ 'is-invalid': errors.status }">
                          <option value="0">Inativo</option>
                          <option value="1">Ativo</option>
                        </select>
                        <span  class="text-danger" v-if="errors.status">{{ errors.status }}</span>
                      </div>
                      <button class="btn btn-primary btn-block" type="button" @click="updateOrCreateAuthor">Salvar</button>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-8" v-if="isEdit">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                  <div class="card-header d-flex justify-content-between align-items-center">
                  <span>Livros</span>
                  </div>
                  <div class="card-body">
                    <table class="table table-bordered" id="content">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Título</th>
                          <th>Data de publicação</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="book in books" :key="book.id">
                          <td>{{ book.id }}</td>
                          <td>{{ book.title }}</td>
                          <td>{{ formatDate(book.published_at) }}</td>
                        </tr>
                      </tbody>
                    </table>
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