<template>
    <div class="form-group">
        <label :for="'menus' + _uid" class="form-label">Please select the menus you wish to show</label>
        <select v-model="model.menus" class="form-control" :id="'menu' + _uid" multiple>
            <option v-for="menu in menus" :value="menu.id" v-text="menu.title"></option>
        </select>
    </div>
</template>
<script>
    import ContentInterface from '../../mixins/ContentInterface'
    export default {
        name: 'MenuSelector',
        mixins: [ContentInterface],
        data() {
            return {
                model: {
                    menus: []
                }
            }
        },
        computed: {
           menus() {
               return this.$store.getters.menus
           }
        },
        watch: {
        },
        methods: {
        },
        mounted() {
        },
        created(){
        }     
    }
</script>
<style>
</style>
