<template>
  <div
    class="ui-preloader__spinner"
    :class="{'ui-preloader__spinner_center' : isCentered}" />
  <div class="ui-preloader__overlay" />
</template>

<script lang="ts" setup>

withDefaults(defineProps<{
  isCentered?: boolean,
}>(), {
  isCentered: false,
});

</script>

<style lang="scss" scoped>
.ui-preloader__overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #F7F7FA;
    opacity: 0.9;
    border-radius: 10px;
    z-index: 100;
}

.ui-preloader__spinner {
    width: 64px;
    height: 64px;
    border-width: 4px;
    border-style: solid;
    border-color: #B9181D;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    margin-left: -32px;
    top: 120px;
    z-index: 101;

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    border-left-color: #F7F7FA;
    background: transparent;
    animation: rotate 1s linear infinite;
}

.ui-preloader__spinner_center {
    top: 50%;
    margin-top: -32px;
}
</style>
