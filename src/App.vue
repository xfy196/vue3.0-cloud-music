<template>
  <router-view/>
</template>

<script>
import {computed} from "vue"
import globalStyle from "./assets/global-style"
export default {
  name: "App",
  setup(){
  },
  provide() {
    return {
      themeColor: computed(() => globalStyle["theme-color"])
    }
  },
}
</script>
<style>
</style>