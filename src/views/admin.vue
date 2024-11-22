<template>
    <header2 />
      <div class="margin">
        <router-view></router-view>
      </div>
</template>
<script setup>
  import header2 from '@/components/header2.vue';
</script>
<style>
  .margin{
    margin-top: -80px;
  }
</style>