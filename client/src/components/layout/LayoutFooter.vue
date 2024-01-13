<template>
  <footer
    id="footer"
    class="layout-footer py-4 w-full flex justify-center">
    <div class="footer__container px-10 grid-container" />
  </footer>
</template>

<script setup>
</script>

<style lang="scss" scoped>
p{
  color: #ffff;
}

.ac{
  white-space: nowrap;
}

.ac-icon{
  min-height: 50px;
  min-width: 50px;
}

.layout-footer{
  background: #292a31!important;
  padding: 40px;
  min-height: 100px;
}
.footer{
  &__logo {
    a {
      display: block;
    }
  }
}

.btn-mailto-footer {
  flex-wrap: nowrap !important;
  &:hover {
    svg{
    fill: red
  }
  }
  svg{
    fill: white;
  }
}

@media print {
  .layout-footer {
    display: none;
    min-height: 100px;
  }
}
</style>
