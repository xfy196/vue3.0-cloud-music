<template>

  <HeaderStyled>
      <van-icon @click="handleBack" name="arrow-left" />
      <marquee v-if="isMarquee"><h1>{{title}}</h1></marquee>
      <h1 v-else>{{title}}</h1>
  </HeaderStyled>
</template>

<script>
import {HeaderStyled} from "./style"
import {useRouter} from "vue-router"
export default {
    components: {
        HeaderStyled
    },
    props: {
        isMarquee: {
            type: Boolean,
            default: () => false
        },
        title: {
            type: String,
            default: () => ""
        },
        show: {
            type: Boolean,
            default : () => ""
        }
    },
    setup(props, ctx){
        const router = useRouter()
        /**
         * 返回
         */
        function handleBack(){
            ctx.emit("update:show", false)
            router.go(-1)
        }
        return {
            router,
            handleBack
        }
    }
}
</script>

<style>

</style>