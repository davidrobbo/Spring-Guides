import Vue from 'vue'
import test from './components/test.vue'

new Vue({
    components: {
        test: test
    },
    mounted() {
        console.log("HI")
    }
}).$mount("#test")