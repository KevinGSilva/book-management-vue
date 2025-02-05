<script setup>
import api from '@/plugins/axios';
import { computed, reactive, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const authorId = route.params.id || null;

const isEdit = computed(() => authorId !== null);

const form = reactive({
  name: '',
  status: '',
});

const fetchAuthor = async () => {
  if (isEdit.value) {
    try {
      const response = await api.get(`/api/authors/${authorId}`);
      Object.assign(form, response.data);
    } catch (error) {
      console.error('Erro ao buscar autor:', error);
    }
  }
};

onMounted(() => {
  fetchAuthor();
});
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
            </div>
          </div>
        </main>
      </div>
    </div>
  </main>
</template>