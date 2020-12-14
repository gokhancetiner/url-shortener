<template>
    
</template>
<script>
export default {
    async fetch({$axios, redirect, params}){
        const response = await $axios.get(`/api/shorten/${params.pathMatch}`)
        redirect(response.data.longURL);
    }
}
</script>