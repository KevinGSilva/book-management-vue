<script setup>
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap";

  import { reactive, ref } from "vue";
  import api from "@/plugins/axios";

  const form = reactive({
    email: "",
    password: "",
  });

  const errorMessage = ref("");

  const validateForm = () => {
    let isValid = true;

    if (!form.email) {
      isValid = false;
      errorMessage.value = "O e-mail é obrigatório.";
      return;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      isValid = false;
      errorMessage.value = "E-mail inválido.";
      return;
    }

    if (!form.password) {
      isValid = false;
      errorMessage.value = "A senha é obrigatória.";
      return;
    } else if (form.password.length < 6) {
      isValid = false;
      errorMessage.value = "A senha deve ter pelo menos 6 caracteres.";
      return;
    }
    
    return isValid;
  };

  const login = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const { data } = await api.post("/api/login", form);

      setToken(data.token);
      window.location.href = "/";
    } catch (error) {
      errorMessage.value = "Credenciais inválidas.";
    }
  };

  function setToken(token) {
    sessionStorage.setItem("auth_token", token);
  }
</script>

<template>
  <main>
    <div class="container-xl px-4">
      <div class="row justify-content-center">
        <div class="col-lg-5">                    
          <div class="card shadow-lg border-0 rounded-lg mt-5">
            <div class="card-header justify-content-center"><h3 class="fw-light my-4">Login</h3></div>
            <div class="card-body">
              <form @submit.prevent="login">
                <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
                <div class="mb-3">
                  <label class="small mb-1" for="email">Email</label>
                  <input class="form-control" type="email" name="email" v-model="form.email"/>
                </div>
                <div class="mb-3">
                  <label class="small mb-1" for="password">Senha</label>
                  <input class="form-control" type="password" name="password" v-model="form.password"/>
                </div>
                <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                  <a class="small" href="#">Esqueci minha senha</a>
                  <button class="btn btn-primary" type="submit">Login</button>
                </div>
              </form>
            </div>
            <div class="card-footer text-center">
              <div class="small"><a href="#">Registrar</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>