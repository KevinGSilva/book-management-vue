<script setup>
import api from '@/plugins/axios';
import { computed, reactive, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import router from '@/router';

const route = useRoute();
const bookId = route.params.id || null;

const isEdit = computed(() => bookId !== null);

const form = reactive({
  title: '',
  author_id: '',
  published_at: '',
  description: '',
  cover: '',
  cover_url: '',
});

const fetchBook = async () => {
  if (isEdit.value) {
    try {
      const response = await api.get(`/api/books/${bookId}`);
      Object.assign(form, response.data);
    } catch (error) {
      console.error('Erro ao buscar livro:', error);
    }
  }
};

const submitted = ref(false);

const errors = computed(() => {
  if (!submitted.value) return {};
  const errs = {};

  if (!form.title) {
    errs.title = "O título é obrigatório.";
  }

  if (!form.author_id) {
    errs.author_id = "O Autor é obrigatório.";
  }

  if (!form.published_at) {
    errs.published_at = "Data de publicação é obrigatório.";
  }

  if (!form.description) {
    errs.description = "A descrição é obrigatório.";
  }

  return errs;
});

const isFormValid = computed(() => Object.keys(errors.value).length === 0);

const updateOrCreateAuthor = async () => {
  submitted.value = true;

  if (isFormValid.value){
    if (isEdit.value){
      try {
        await api.put(`/api/books/${bookId}`, form);
        await Swal.fire('Sucesso!', 'O livro foi editado com sucesso.', 'success');
        router.push('/books');
      } catch (error) {
        Swal.fire('Erro!', error.response.data.message, 'error');
      }
    } else {
      try {
        await api.post('/api/books/', form);
        await Swal.fire('Sucesso!', 'O livro foi criado com sucesso.', 'success');
        router.push('/books');
      } catch (error) {
        Swal.fire('Erro!', error.response.data.message, 'error');
      }
    }
  }
}

const authors = ref([]);

const fetchAuthors = async () => {
  try {
    const response = await api.get('/api/authors');
    authors.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar autores:', error);
  }
};

onMounted(() => {
  fetchBook();
  fetchAuthors();
});

const handleFileChange = (event) => {
  const file = event.target.files[0];

  const reader = new FileReader();
  
  reader.onloadend = () => {
    const base64File = reader.result.split(',')[1];
    
    form.cover = base64File;
  };
  
  reader.readAsDataURL(file);
};
</script>

<template>
  <main>
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div class="container-lg px-4">
            <div class="row justify-content-center">
              <div class="col-lg-8">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                  <div class="card-header justify-content-center">
                    <h3 class="fw-light my-4">{{ isEdit ? "Editar Livro" : "Criar Livro" }}</h3>
                  </div>
                  <div class="card-body">
                    <form @submit.prevent="submitForm">
                      <div class="col-lg-12 d-flex">
                        <div class="row w-100">
                          <div class="col-lg-6">
                            <div class="row gx-3">
                              <div class="col-lg-12">
                                <div class="mb-3">
                                  <label class="small mb-1" for="title">Nome</label>
                                  <input class="form-control" name="title" type="text" placeholder="Nome" v-model="form.title" :class="{ 'is-invalid': errors.title }" />
                                  <span  class="text-danger" v-if="errors.title">{{ errors.title }}</span>
                                </div>
                              </div>
                              <div class="col-lg-12">
                                <div class="mb-3">
                                  <label class="small mb-1" for="author_id">Autor</label>
                                  <select class="form-control" name="author_id" v-model="form.author_id" :class="{ 'is-invalid': errors.author_id }">
                                    <option value="">Selecione um autor</option>
                                    <option v-for="author in authors" :key="author.id" :value="author.id">{{ author.name }}</option>
                                  </select>
                                  <span  class="text-danger" v-if="errors.author_id">{{ errors.author_id }}</span>
                                </div>
                              </div>
                            </div>
                            <div class="row gx-3">
                              <div class="col-lg-12">
                                <div class="mb-3">
                                  <label class="small mb-1" for="published_at">Data de publicação</label>
                                  <input class="form-control" name="published_at" type="date" placeholder="Data de publicação" v-model="form.published_at" :class="{ 'is-invalid': errors.published_at }" />
                                  <span  class="text-danger" v-if="errors.published_at">{{ errors.published_at }}</span>
                                </div>
                              </div>
                              <div class="col-lg-12">
                                <div class="mb-3">
                                  <label class="small mb-1" for="author_id">Descrição</label>
                                  <textarea name="" class="form-control" v-model="form.description" :class="{ 'is-invalid': errors.description }"></textarea>
                                  <span  class="text-danger" v-if="errors.description">{{ errors.description }}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="row gx-3">
                              </div>
                              <div class="col-lg-12">
                                <div class="mb-3">
                                  <label class="small mb-1" for="cover">Foto de capa</label>
                                  <input class="form-control" name="cover" type="file" placeholder="Foto de capa" @change="handleFileChange" :class="{ 'is-invalid': errors.cover }" />
                                  <span  class="text-danger" v-if="errors.cover">{{ errors.cover }}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button class="btn btn-primary btn-block" type="button" @click="updateOrCreateAuthor">Salvar</button>
                    </form>
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