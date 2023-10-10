<template>
    <main class="main container" v-if="getUserInfo && requestStatus">
        <section class="user">
            <div class="user-logo">
                <img :src="getUserInfo.avatar_url" alt="">
                <div class="border"></div>
            </div>
            <div class="user-info">
                <div class="top">
                    <div>
                        <h2>{{ getUserInfo.login }}</h2>    
                        <span class="user-created">Created: {{ getUserInfo.created_at.slice(0, 10) }}</span>
                    </div>
                    <a class="btn" :href="getUserInfo.html_url">Visit</a>
                </div>
                <div class="bottom">
                    <span><span class="bold">{{ getUserInfo.public_repos }}</span> reprositories</span>
                    <span><span class="bold">{{ getUserInfo.followers }}</span> subscribers</span>
                    <span><span class="bold">{{ getUserInfo.following }}</span> following</span>
                </div>
            </div>
        </section>
        <section class="repos container">
            <h2>Reprositories</h2>
            <div class="repos-filter">
                <span>Sort by:</span>
                <span 
                    @click="filter = 'name', filterRepos" 
                    :class="{active: filter == 'name', filter}">Name</span>
                <span 
                    @click="filter = 'stars', filterRepos" 
                    :class="{active: filter == 'stars', filter}">Stars</span>
                <span 
                    @click="filter = 'date', filterRepos" 
                    :class="{active: filter == 'date', filter}">Date</span>
            </div>
            <div class="repos-cards">
                <div class="repos-cards-card" v-for="(repo, id) in filterArr ?? getRepos " :key="id">
                    <div>
                        <h3>{{ repo.name }}</h3>
                        <span>Stars: {{ repo.stargazers_count }}</span>
                        <span>Created at {{ repo.created_at.slice(0, 10) }}</span>
                    </div>
                    <a class="btn" :href="repo.html_url">Visit</a>
                </div>
            </div>
        </section>
    </main>
    <main class="error container" v-if="!requestStatus">
        <h2>404</h2>
        <span>User doesn't exist :(</span>
    </main>
</template>

<script>
import { mapState } from 'vuex'
    export default {
        data() {
            return {
                filter: 'name',
                filterArr: this.getRepos
            }
        },
        computed: {
            ...mapState(['getUserInfo', 'getRepos', 'requestStatus']),
            filterRepos(){
                const reposArr = [...this.getRepos]
                if(this.filter == 'date'){
                    reposArr.sort(function (a, b) {
                        if (a.id < b.id) return 1;
                        if (a.id > b.id) return -1;
                        return 0;
                    });
                } else if(this.filter == 'name'){
                    reposArr.sort()
                } else if(this.filter == 'stars'){
                    reposArr.sort(function (a, b) {
                        if (a.stargazers_count < b.stargazers_count) return 1;
                        if (a.stargazers_count > b.stargazers_count) return -1;
                        return 0;
                    });
                }
                this.filterArr = reposArr
            }
        },
    }
</script>
<style>

</style>