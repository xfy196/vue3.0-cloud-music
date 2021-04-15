<template>
<TitleStyled>
    <h1>{{title}}</h1>
</TitleStyled>
</template>

<script>
import {TitleStyled} from "./index.js"
export default {
    name: "Title",
    components: {
        TitleStyled
    },
    props: {
        title: String
    }
}
</script>

<style>

</style>