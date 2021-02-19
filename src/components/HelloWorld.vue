<template>
  <HelloWorldWrapper>
   <h1>hello vue3.0 云音乐</h1>
  </HelloWorldWrapper>
  
</template>

<script setup>
import { defineProps, reactive, defineComponent } from 'vue'
import {HelloWorldWrapper} from "./style"
// name: "HelloWorldCom"
defineProps({
      msg: String
    })
const state = reactive({ count: 0 })
defineComponent({
    "HelloWorldWrapper": HelloWorldWrapper

})
</script>

<style scoped>
</style>