<template>
    <div>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title"><i :class="[ visibleContents ? 'swirl-up' : '', 'ion ion-chevron-down swirl']" @click="visibleContents=!visibleContents"></i> Edit the '{{page.name}}' page's contents</h3>
                            <div class="pull-right">
                                <div class="btn btn-primary" @click="save(false)">Save Page</div>
                                <div class="btn btn-primary" @click="save(true)">Save and Exit</div>
                            </div>
                        </div>
                        <div :class="[ visibleContents ? 'box-open' : '', 'box-slide box-body']">
                            <component v-on:contentUpdated="handleUpdate" v-for="(content, i) in page.contents" :is="content.component" :parentId="_uid" :index="i" :defaultData="content.defaultData"></component>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title"><i :class="[ visible ? 'swirl-up' : '', 'ion ion-chevron-down swirl']" @click="visible=!visible"></i> Edit the '{{page.name}}' page's details</h3>
                        </div>
                        <div :class="[ visible ? 'box-open' : '', 'box-slide box-body']">
                            <div class="form-group">
                                <label for="page-name" class="form-label">Name*</label>
                                <input type="text" v-model="page.name" id="page-name" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="page-title" class="form-label">SEO Title*</label>
                                <input type="text" v-model="page.title" id="page-title" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="page-url" class="form-label">URL*</label>
                                <input type="text" v-model="page.url" id="page-url" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="page-description" class="form-label">Description*</label>
                                <textarea v-model="page.description" id="page-description" class="form-control"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="page-pub" class="form-label">Is published*</label>
                                <select v-model="page.published" id="page-pub" class="form-control">
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="page-banner-img" class="form-label">Banner Image*</label>
                                <input type="text" id="page-banner-img" v-model="page.banner.image" class="form-control"/>
                                <button class="btn btn-default popup_selector" type="submit" data-inputid="page-banner-img">
                                    Browse
                                </button>
                            </div>
                            <div class="form-group">
                                <label for="page-banner-txt" class="form-label">Banner text*</label>
                                <textarea v-model="page.banner.text" id="page-banner-txt" class="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import event from '../../event.js'
    import AllContents from '../../mixins/AllContents'
    export default {
        name: 'Page',
        mixins: [AllContents],
        data() {
            return {
                page: {
                    id: 0,
                    banner: {
                        image: "",
                        text: ""
                    }
                },
                visible: false,
                visibleContents: true,
                interval: null
            }
        },
        computed: {
            pages(){
                return this.$store.getters.pages
            }
        },
        methods: {
            save(shouldExit){
                this.$store.dispatch('updatePage', {page: this.page})
                .then ((data) => {
                    if(data.status == 'ok' && shouldExit){
                        this.back()
                    }
                }, () => {
                })
            },
            back(){
                this.$router.push({name: 'Dashboard'})
            },
            handleUpdate(data){
                if(this.shouldRespond(data.parentId)){
                    this.page.contents[data.index].defaultData = data.content
                }
            },
            initPage(){
                const page = this.pages.find( ({id}) => {
                    return id == this.page.id
                })
                if(page){
                    for(let prop in page){
                        if(prop == 'published'){
                            let val = page[prop] ? 1 : 0
                            this.$set(this.page, prop, val)
                        } else {
                            this.$set(this.page, prop, page[prop])
                        }
                    }
                    const self = this
                    if(this.interval){
                        clearInterval(this.interval)
                    }
                    this.interval = setInterval( () => {
                        self.page.banner.image = document.getElementById("page-banner-img").value
                    }, 100)
                }
            },
            shouldRespond(id){
                return id == this._uid
            }
        },
        watch: {
            '$route'(to, from){
                this.page.id = to.params.id
                this.initPage()
            }
        },
        mounted() {
            this.page.id = this.$route.params.id
            this.initPage()
            this.$on('contentUpdated', this.respondToContentUpdate)
        },
        created(){
        },
        beforeDestroy() {
            clearInterval(this.interval)
        }
    }
</script>
<style>
    .swirl {
        transition: 0.5s ease;
    }
    .swirl-up {
        transform: rotate(180deg);
    }
    .box-slide {
        max-height: 0;
        padding: 0;
        opacity: 0;
        overflow: hidden;
        transition: max-height 0.5s ease, opacity 1s, padding 1s;
    }
    .box-open {
        max-height: 100000px;
        padding: 10px;
        opacity: 1;
    }
</style>
