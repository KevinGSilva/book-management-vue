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
                    <form>
                      <div class="row gx-3">
                        <div class="col-lg-12">
                          <div class="mb-3">
                            <label class="small mb-1" for="name">Nome</label>
                            <input class="form-control" name="name" type="text" placeholder="Nome" />
                          </div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label class="small mb-1" for="email">Email</label>
                        <input class="form-control" name="email" type="email" aria-describedby="emailHelp" placeholder="Email" />
                      </div>
                      <div class="row gx-3">
                        <div class="col-md-12">
                          <div class="mb-3">
                            <label class="small mb-1" for="password">Senha</label>
                            <input class="form-control" name="password" type="password" placeholder="Senha" />
                          </div>
                        </div>
                      </div>
                      <div class="row gx-3">
                        <div class="col-md-12">
                          <div class="mb-3">
                            <label class="small mb-1" for="confirm-password">Confirmar Senha</label>
                            <input class="form-control" name="confirm-password" type="password" placeholder="Confirmar Senha" />
                          </div>
                        </div>
                      </div>
                      <a class="btn btn-primary btn-block" href="auth-login-basic.html">Create Account</a>
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