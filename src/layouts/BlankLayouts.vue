<template>
  <BlankStyle :playSwitch="playSwitch">
    <router-view />
    <Player></Player>
  </BlankStyle>
</template>

<script>
import Player from "@/components/player/index.vue";
import { BlankStyle } from "./style";
import {useStore} from "vuex"
import { computed } from '@vue/runtime-core';
export default {
  name: "BlankLayouts",
  components: {
    Player: Player,
    BlankStyle,
  },
  setup() {
    const store = useStore()
    const playSwitch =  computed(() => store.state.playSwitch)
    return {
      playSwitch
    }
  },
};
</script>

<style>
</style>