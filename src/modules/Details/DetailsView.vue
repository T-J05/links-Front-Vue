<template>
    <div>
      <h1>Detalle del ítem</h1>
      <p>ID del ítem: {{ id }}</p>
      <div v-if="Object.keys(enlaceC).length">
        <h2>Enlace:</h2>
        <details open>
          <summary>{{ enlaceC.titulo }}</summary>
  
          <a :href="enlaceC.url" target="_blank"><strong>Url:</strong> {{ enlaceC.url }}</a><br>
          <p>
            <strong>Etiqueta:</strong>
            {{ enlaceC.etiquetas?.[0]?.etiqueta?.nombre || "Sin etiquetas" }}
          </p>
          <p>
            <strong>Votos:</strong>
            {{ votos }}
          </p>
          <button @click="votar">Votar</button>
          <p>
            <strong>Descripción:</strong>
            {{ enlaceC.descripcion }}
          </p>
        </details>
  
        <div>
          <label for="comentario">Comentar</label>
          <textarea
            v-model="nuevoComentario"
            placeholder="Escribe tu comentario"
          ></textarea>
          <button @click="agregarComentario">Agregar comentario</button>
        </div>
  
        <details>
          <summary>Comentarios</summary>
          <div v-if="comentarios.length">
            <div v-for="(comentario, index) in comentarios" :key="index">
              <p>{{ comentario.contenido }}</p>
            </div>
          </div>
          <div v-else>
            <p>Sin comentarios</p>
          </div>
        </details>
      </div>
      <div v-else>
        <p>No se encontraron enlaces para este ítem.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { fetchLinkComment, fetchLinkDetails, addComentario, fetchLinkVote } from "../../services/apiFechs";
  
  export default {
    data() {
      return {
        id: null,
        enlaceC: {},
        comentarios: [],
        nuevoComentario: "",
        votos: null,
      };
    },
    methods: {
      // Cargar detalles del enlace
      async fetchDetails(id) {
        try {
          const res = await fetchLinkDetails(id);
          this.enlaceC = res ? res.enlace : {};
          this.votos = this.enlaceC ? this.enlaceC.votos : 0;
        } catch (error) {
          console.error(error, "Error al cargar detalles del enlace");
        }
      },
  
      // Cargar comentarios
      async fetchComments(id) {
        try {
          const comments = await fetchLinkComment(id)
          console.log("comentarios",comments.comentarios)
          this.comentarios = comments.comentarios || [];
        } catch (error) {
          console.error("Error al cargar comentarios", error);
        }
      },
  
      // Agregar un nuevo comentario
      async agregarComentario() {
        if (!this.nuevoComentario.trim()) {
          alert("El comentario no puede estar vacío");
          return;
        }
  
        try {
          const nuevo = await addComentario(this.id, this.nuevoComentario.trim());
          console.log("nuevo",nuevo)
          this.comentarios.push(nuevo.comentario); // Actualizar comentarios en tiempo real
          this.nuevoComentario = ""; // Limpiar textarea
        } catch (error) {
          console.error("Error al agregar comentario", error);
        }
      },
  
      // Votar por el enlace
      async votar() {
        try {
          await fetchLinkVote(this.id); // Asume que esta función actualiza los votos en la API
          this.votos += 1; // Incrementar localmente
        } catch (error) {
          console.error("Error al votar", error);
        }
      },
    },
    created() {
      this.id = this.$route.params.id;
      this.fetchDetails(this.id);
      this.fetchComments(this.id);
    },
    watch: {
      // Detectar cambios en el parámetro ID de la ruta
      "$route.params.id"(nuevoId) {
        this.id = nuevoId;
        this.fetchDetails(this.id);
        this.fetchComments(this.id);
      },
    },
  };
  </script>
  