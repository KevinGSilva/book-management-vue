<script setup>
import { onMounted, ref } from 'vue';
import { GlHamburger } from '@kalimahapps/vue-icons';
import { AnOutlinedLogout } from '@kalimahapps/vue-icons';
import { FlFilledPeopleQueue } from '@kalimahapps/vue-icons';
import api from '@/plugins/axios';

const sidebarToggle = ref(false);
const user = ref({});

const appName = import.meta.env.VITE_APP_NAME;

const toggleSidebar = () => {
  sidebarToggle.value = !sidebarToggle.value;
  document.body.classList.toggle('sidenav-toggled', sidebarToggle.value);
};

onMounted( async () => {
  let response = await api.get('/api/user');
  user.value = response.data;
});

const logout = async () => {
  await api.post('/api/logout');
  window.location.href = '/login';
};

</script>

<template>
  <main>
    <div class="nav-fixed">
      <nav class="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white" id="sidenavAccordion">
        <button class="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" id="sidebarToggle" @click="toggleSidebar">
          <GlHamburger/>
        </button>
        
        <RouterLink to="/" class="navbar-brand pe-3 ps-4 ps-lg-2">{{ appName ?? 'Gestão' }}</RouterLink>
        
        <ul class="navbar-nav align-items-center ms-auto">
            
          <li class="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
            <a class="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" href="javascript:void(0);" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img class="img-fluid" src="@/assets/img/illustrations/profiles/profile-1.png" /></a>
            <div class="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">
              <h6 class="dropdown-header d-flex align-items-center">
                <img class="dropdown-user-img" src="@/assets/img/illustrations/profiles/profile-1.png" />
                <div class="dropdown-user-details">
                  <div class="dropdown-user-details-name">{{ user.name }}</div>
                  <div class="dropdown-user-details-email">{{ user.email }}</div>
                </div>
              </h6>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#!" @click="logout">
                  <div class="dropdown-item-icon">
                    <AnOutlinedLogout/>
                  </div>
                  Sair
                </a>
            </div>
          </li>
        </ul>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav class="sidenav shadow-right sidenav-light">
            <div class="sidenav-menu">
              <div class="nav accordion" id="accordionSidenav">
                  
                <div class="sidenav-menu-heading">Autores</div>
                <RouterLink to="/authors" class="nav-link">
                  <div class="nav-link-icon"><FlFilledPeopleQueue/></div>
                  Autores
                </RouterLink>
                <div class="sidenav-menu-heading">Livros</div>
                <RouterLink to="/books" class="nav-link">
                  <div class="nav-link-icon"><FlFilledPeopleQueue/></div>
                  Livros
                </RouterLink>
              </div>
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <div class="container-fluid px-4 mt-4" id="conteudo">
            <RouterView />
          </div>
          <footer class="footer-admin mt-auto footer-light">
            <div class="container-xl px-4">
              <div class="row">
                <div class="col-md-6 small">Copyright &copy; Your Website 2021</div>
                <div class="col-md-6 text-md-end small">
                  <a href="#!">Privacy Policy</a>
                  &middot;
                  <a href="#!">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </main>
</template>
