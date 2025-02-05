<script setup>
import { RouterView } from 'vue-router'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

document.title = import.meta.env.VITE_APP_NAME ?? 'Gestão de Livross';
</script>

<template>
      <RouterView/>
</template>

