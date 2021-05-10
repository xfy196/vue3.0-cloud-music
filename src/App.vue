<template>
  <router-view/>
</template>

<script>
import {computed, provide} from "vue"
import globalStyle from "./assets/global-style"
export default {
  name: "App",
  provide() {
    return {
      themeColor: computed(() => globalStyle["theme-color"])
    }
  }
}
</script>
<style>
</style>