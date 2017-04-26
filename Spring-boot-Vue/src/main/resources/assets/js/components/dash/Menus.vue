<template>
    <div>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <div class="pull-right">
                                <div class="btn btn-primary" @click="add">Add new</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <vuetable :vuetable="table" :parentId="_uid"></vuetable>
        </section>
    </div>
</template>
<style>
</style>
<script>
    import vuetable from '../contents/Table'
    import event from '../../event.js'
    export default{
        name: 'Menus',
        components: {
            vuetable: vuetable
        },
        data(){
            return{
                model: "menu",
                collection: "menus"
            }
        },
        computed: {
            table() {
                return {
                    title: "Your Menus",
                    extraRows: ['type'],
                    hideEdit: false,
                    data: this.menus
                }
            },
            menus() {
                return this.$store.getters.menus
            }
        },
        methods: {
            add(){
                this.$router.push({ name: 'Menu Editor', params: {id: 'new'} })
            },
            getIndex(findId) {
                return this.menus.findIndex( ({id}) => {
                    return findId === id
                })
            },
            editRequest({id, parentId}) {
                if (this.shouldRespondToRequest(parentId)){
                    this.$router.push({name: "Menu Editor", params: {id: id}})
                }
            },
            deleteRequest({id, parentId}) {
                if (this.shouldRespondToRequest(parentId)){
                    this.$store.dispatch('deleteModel', {id:id, collectionName: this.collection});
                }
            },
            shouldRespondToRequest(uid){
                return uid === this._uid
            },
            getData() {
                this.$store.dispatch('loadMenus', {})
            }
        },
        mounted() {
            this.getData()
            event.$on('userDeleteRequest', this.deleteRequest)
            event.$on('userEditRequest', this.editRequest)
        }
    }
</script>
