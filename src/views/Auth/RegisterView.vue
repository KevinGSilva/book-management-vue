<script setup>
import { reactive, computed, ref } from 'vue';

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  is_admin: true
});

const submitted = ref(false);

const errors = computed(() => {
  if (!submitted.value) return {};
  const errs = {};

  if (!form.name) {
    errs.name = "O nome é obrigatório.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.email) {
    errs.email = "O email é obrigatório.";
  } else if (!emailRegex.test(form.email)) {
    errs.email = "O email deve ser válido.";
  }

  if (!form.password) {
    errs.password = "A senha é obrigatória.";
  } else if (form.password.length < 8) {
    errs.password = "A senha deve ter pelo menos 8 caracteres.";
  }

  if (!form.confirmPassword) {
    errs.confirmPassword = "Confirme sua senha.";
  } else if (form.confirmPassword !== form.password) {
    errs.confirmPassword = "As senhas não coincidem.";
  }

  return errs;
});

const isFormValid = computed(() => Object.keys(errors.value).length === 0);

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
                    <h3 class="fw-light my-4">Criar conta</h3>
                  </div>
                  <div class="card-body">
                    <form @submit.prevent="submitForm">
                      <div class="row gx-3">
                        <div class="col-lg-12">
                          <div class="mb-3">
                            <label class="small mb-1" for="name">Nome</label>
                            <input class="form-control" name="name" type="text" placeholder="Nome" v-model="form.name" :class="{ 'is-invalid': errors.name }" />
                            <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label class="small mb-1" for="email">Email</label>
                        <input class="form-control" name="email" type="email" aria-describedby="emailHelp" placeholder="Email" v-model="form.email" :class="{ 'is-invalid': errors.email }" />
                        <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
                      </div>
                      <div class="row gx-3">
                        <div class="col-md-12">
                          <div class="mb-3">
                            <label class="small mb-1" for="password">Senha</label>
                            <input class="form-control" name="password" type="password" placeholder="Senha" v-model="form.password" :class="{ 'is-invalid': errors.password }" />
                            <span v-if="errors.password" class="text-danger">{{ errors.password }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="row gx-3">
                        <div class="col-md-12">
                          <div class="mb-3">
                            <label class="small mb-1" for="confirm-password">Confirmar Senha</label>
                            <input class="form-control" name="confirm-password" type="password" placeholder="Confirmar Senha" v-model="form.confirmPassword" :class="{ 'is-invalid': errors.confirmPassword }" />
                            <span v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</span>
                          </div>
                        </div>
                      </div>
                      <button class="btn btn-primary btn-block" type="submit" :disable="!isFormValid">Create Account</button>
                    </form>
                  </div>
                  <div class="card-footer text-center">
                    <div class="small">
                      <RouterLink to="/login">
                        Possui uma conta? Ir pra login
                      </RouterLink>
                    </div>
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