<template>
  <main>
    <div class="container">
      <document-list />
    </div>
    <the-footer />
  </main>
</template>

<script lang="ts" setup>
import DocumentList from './pages/DocumentList.vue';
import TheFooter from './components/layout/LayoutFooter.vue';
</script>

<style lang="scss">
  ul,
  ol {
    padding: 0 1rem;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  *,
*::after,
*::before {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

main {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #F5F5FB;
}

.vue-universal-modal {
    z-index: 10000 !important;
}

#app {
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .container {
    width: 750px;
    // padding: 0 20px 0 20px;
  }
}

@media (min-width: 992px) {
  .container {
    width: 970px;
    // padding: 0 30px 0  30px;
  }
}

@media (min-width: 1200px) {
  .container {
    width: 1170px;
    padding: 0 40px 0 40px;
  }
}

@media (min-width: 1300px) {
  .container {
    width: 1280px;
    // padding: 0 60px 0 60px;
  }
}

@media (min-width: 1500px) {
  .container {
    width: 1380px;
    // padding: 0 60px 0 60px;
  }
}

@media (min-width: 1800px) {
  .container {
    width: 1440px;
    padding: 0 60px 0 60px;
  }
}

@media (min-width: 2000px) {
  .container {
    width: 1780px;
    padding: 0 60px 0 60px;
  }
}

</style>
