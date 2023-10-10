<template>
    <header class="header">
        <nav class="header-nav container">
            <h1>github finder</h1>
        </nav>
        <div class="header-content container">
            <form>
                <input 
                    type="text" 
                    placeholder="Enter user name.." 
                    v-model="query">
                <button @click.prevent="getUser(query), query = ''">Find</button>
            </form>
        </div>
    </header>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                query: ''
            }
        },
        methods: {
            ...mapActions(['getUser'])
            // setUser(){
            //     this.$store.dispatch('getUser', this.query)
            // }
        }
    }
</script>

<style>

</style>