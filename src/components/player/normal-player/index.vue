<template>
  <NormalPlayerContainer>
      <div @click="handleClick">
          正在重新构思页面
      </div>
  </NormalPlayerContainer>
</template>

<script>
import {NormalPlayerContainer} from "./style"
import {SET_SHOW_PLAYER} from "@/store/modules/constant"
import { useStore } from 'vuex'
export default {
    components: {
        NormalPlayerContainer
    },
    props: {
        showNormal: {
            type: Boolean,
            required: true
        }
    },
    setup(props, ctx){
        const store = useStore()
        function handleClick(){
            ctx.emit("update:showNormal", false)
            store.commit(SET_SHOW_PLAYER, {data: true})

        }
        return {
            handleClick
        }
    }
}
</script>

<style>

</style>