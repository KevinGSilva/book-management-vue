<script setup>
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap";
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