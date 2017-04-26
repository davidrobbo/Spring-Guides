<template>
    <div id="overlay" :class="{ openmessage: isOpen }">
        <div class="centered">
            <i :class="classes"></i>
            <h1>{{ message }}</h1>
            <p>{{ text }}</p>
        </div>
    </div>
</template>
<script>
    import event from '../event.js'
    export default {
        name: '',
        data() {
            return {
                message: "Save was successful",
                text: "I am text",
                isOpen: false,
                type: false
            }
        },
        computed: {
            classes() {
                if(!this.type){
                    return
                }
                return this.type == 'warning' ? 'ion ion-alert-circled' : 'ion ion-checkmark-circled'
            }
        },
        methods: {
            trigger(){
                this.isOpen = true
                const self = this
                setTimeout( () => {
                    self.isOpen = false
                }, 1500)
            },
            update({message, text, type}) {
                this.message = message
                this.text = text
                this.type = type
                this.trigger()
            },
            redirect({name, params}){
                this.$router.push({name, params})
            }
        },
        mounted() {
            event.$on('message', this.update)
            event.$on('redirect', this.redirect)
        },
        created(){
        }     
    }
</script>
<style>
    #overlay {
        height: 100%;
        width: 0%;
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        background-color: rgb(0,0,0); /* Black fallback color */
        background-color: rgba(0,0,0, 0.8); /* Black w/opacity */
        overflow-x: hidden; /* Disable horizontal scroll */
        transition: 0.5s;
    }
    .openmessage {
        width: 100% !important;
    }
    .centered {
        color: #fff;
        position: relative;
        top: 25%; /* 25% from the top */
        width: 100%; /* 100% width */
        text-align: center; /* Centered text/links */
        margin-top: 30px; /* 30px top margin to avoid conflict with the close button on smaller screens */
    }
    .ion-alert-circled{
        color: red;
        font-size: 50px;
    }
    .ion-checkmark-circled {
        color: green;
        font-size: 50px;
    }
</style>
