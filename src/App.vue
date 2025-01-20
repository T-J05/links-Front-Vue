<template>
  <div>
    <Header />
    <router-view /> <!-- Aquí se renderizan las vistas según la ruta -->
  </div>
</template>

<script>
import Header from "./components/Header.vue"

export default {
  components: {
    Header,
  },
};
</script>
