<template>
    <div class="homeBox">
        <header>社区数据管理与分析系统</header>
    </div>
</template>

<script>
    // import adminComponent from './admin'
    // import userComponent from './user'
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            // ...mapGetters(['userName']),
            // componentOn() {
            //   if (this.userName === 'admin') {
            //     return 'adminComponent'
            //   } else {
            //     return 'userComponent'
            //   }
            // }
        },
        components: {
            // adminComponent,
            // userComponent
        }
    }
</script>
<style>
    header {
        text-align: center;
        font-size: 30px;
        margin-top: 30px;
        color: #454b61;
    }
</style>
