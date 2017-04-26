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
        name: 'Galleries',
        components: {
            vuetable: vuetable
        },
        data(){
            return{
                model: "gallery",
                collection: "galleries"
            }
        },
        computed: {
            table() {
                return {
                    title: "Your Galleries",
                    hideEdit: false,
                    data: this.galleries
                }
            },
            galleries() {
                return this.$store.getters.galleries
            }
        },
        methods: {
            add(){
                this.$router.push({ name: 'Gallery Editor', params: {id: 'new'} })
            },
            getIndex(findId) {
                return this.galleries.findIndex( ({id}) => {
                    return findId === id
                })
            },
            editRequest({id, parentId}) {
                if (this.shouldRespondToRequest(parentId)){
                    this.$router.push({name: "Gallery Editor", params: {id: id}})
                }
            },
            deleteRequest({id, parentId}) {
                if (this.shouldRespondToRequest(parentId)){
                    this.$store.dispatch('deleteModel', {id:id, collectionName: this.collection});
                }
            },
            shouldRespondToRequest(uid){
                return uid === this._uid
            }
        },
        mounted() {
            event.$on('userDeleteRequest', this.deleteRequest)
            event.$on('userEditRequest', this.editRequest)
        }
    }
</script>
