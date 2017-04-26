<template>
    <div>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Your gallery</h3>
                            <div class="pull-right">
                                <div class="btn btn-primary" @click="saveGallery(false)" v-if="!gallery.id">Save gallery</div>
                                <div class="btn btn-primary" @click="saveGallery(true)" v-if="!gallery.id">Save and Exit</div>
                                <div class="btn btn-primary" @click="updateGallery(false)" v-if="gallery.id">Update gallery</div>
                                <div class="btn btn-primary" @click="updateGallery(true)" v-if="gallery.id">Update and exit</div>
                                <div class="btn btn-danger" @click="back">Back</div>
                            </div>
                        </div>
                        <div class="box-body">
                            <div class="form-group">
                                <label for="galtitle" class="form-lavel">Title</label>
                                <input type="text" v-model="gallery.title" id="galtitle" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="galdesc" class="form-lavel">Description</label>
                                <input type="text" id="galdesc" v-model="gallery.description" class="form-control"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Your gallery</h3>
                            <div class="pull-right">
                                <div class="btn btn-primary" @click="addToGallery">Add image to gallery</div>
                            </div>
                        </div>
                        <div class="box-body">
                            <div class="form-group">
                                <label for="imagetitle" class="form-lavel">Title</label>
                                <input type="text" v-model="title" id="imagetitle" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="imagetitle" class="form-lavel">Image</label>
                                <input type="text" id="galleryimage" class="form-control"/>
                                <button class="btn btn-default popup_selector" type="submit" data-inputid="galleryimage">
                                    Browse
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Images</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
                                <div class="row">
                                    <div class="col-sm-12 table-responsive">
                                        <table aria-describedby="example1_info" role="grid" id="example1" class="table table-bordered table-striped dataTable">
                                            <thead>
                                            <tr role="row">
                                                <th style="width: 287px;" colspan="1" rowspan="1">Title</th>
                                                <th style="width: 100px;" colspan="1" rowspan="1">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr class="even" role="row" v-for="(img, i) in gallery.content.images" v-if="shouldShow(i)">
                                                <td>{{ img.title }}</td>
                                                <td>
                                                    <div class="btn btn-danger" @click="removeFromGallery(i)"><i class="fa fa-minus"></i></div>
                                                </td>
                                            </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <th colspan="1" rowspan="1">Title</th>
                                                <th colspan="1" rowspan="1">Action</th>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div class="col-sm-12">
                                        <p v-text="showing"></p>
                                        <nav aria-label="Page navigation">
                                            <ul class="pagination">
                                                <li>
                                                    <a aria-label="Previous" @click="changePage('-')">
                                                        <span aria-hidden="true">&laquo;</span>
                                                    </a>
                                                </li>
                                                <li v-for="page in pages" @click="activePage = page"><a>{{page}}</a></li>
                                                <li>
                                                    <a aria-label="Next" @click="changePage('+')">
                                                        <span aria-hidden="true">&raquo;</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <!-- /.box-body -->
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<style>
</style>
<script>
    import event from '../../event.js'
    import Vue from 'vue'
    export default{
        name: "GalleryEditor",
        components: {
        },
        data(){
            return{
                gallery: {
                    id: 0,
                    title: "",
                    description: "",
                    content: {
                        images: []
                    }
                },
                id: 0,
                title: "",
                activePage: 1,
                model: "gallery",
                collection: "galleries"

            }
        },
        computed: {
            pages() {
                let current = 1;
                let pages = [];
                while(current <= this.maxPage){
                    pages.push(current++);
                }
                return pages;
            },
            maxPage() {
                return Math.ceil(this.gallery.content.images.length / 10);
            },
            showing() {
                const minRange = (this.activePage*10)-9
                const maxRange = this.activePage*10 > this.gallery.content.images.length ? this.gallery.content.images.length : this.activePage*10
                const max = this.gallery.content.images.length
                return `Showing ${minRange} to ${maxRange} of ${max}`;
            },
            galleries() {
                return this.$store.getters.galleries
            }
        },
        methods: {
            addToGallery() {
                this.gallery.content.images.push({
                    title: this.title,
                    file: document.getElementById("galleryimage").value
                })
                document.getElementById("galleryimage").value = ""
                this.title = ""
            },
            removeFromGallery(index){
                this.gallery.content.images.splice(index, 1)
            },
            getData(galId){
                const gallery = this.galleries.find( ({id}) => {
                    return galId == id
                })
                if(gallery){
                    for(var prop in gallery){
                        Vue.set(this.gallery, prop, gallery[prop])
                    }
                }
            },
            shouldShow(index) {
                return index < this.activePage*10 && index >= (this.activePage*10)-10;
            },
            changePage(op){
                if(op == '-' && this.activePage != 1){
                    this.activePage--;
                }else if(op == '+' && this.activePage != this.maxPage ){
                    this.activePage++;
                }
            },
            saveGallery(shouldExit){
                if(this.isValid()){
                    this.$store.dispatch('saveModel', {model:this[this.model], modelName: this.model, collectionName: this.collection})
                    .then( (data) => {
                        if(data.status == 'ok'){
                            this.gallery.id = data.gallery.id
                            event.$emit('message', {
                                message: 'Gallery saved',
                                text: "The images and gallery have been updated",
                                type: 'success'
                            })
                            if(shouldExit){
                                this.back()
                            }
                        } else {
                            event.$emit('message', {
                                message: 'Gallery error',
                                text: "An error occurred; please try again",
                                type: 'warning'
                            })
                        }
                    }, () => {
                    })
                } else {
                    event.$emit('message', {
                        message: 'Gallery not valid',
                        text: "An error occurred; please complete all required fields",
                        type: 'warning'
                    })
                }
            },
            back(){
                this.$router.push({name: 'Galleries'})
            },
            updateGallery(shouldExit){
                if(this.isValid()){
                    this.$store.dispatch('updateModel', {model:this[this.model], modelName: this.model, collectionName: this.collection})
                    .then( (data) => {
                        if(data.status == 'ok'){
                            event.$emit('message', {
                                message: 'Gallery saved',
                                text: 'Your gallery has successfully been saved',
                                type: 'success'
                            })
                            if(shouldExit){
                                this.back()
                            }
                        } else {
                            event.$emit('message', {
                                message: 'Gallery error',
                                text: 'There was an error; please try again',
                                type: 'warning'
                            })
                        }
                    }, () => {
                        event.$emit('message', {
                            message: 'Gallery error',
                            text: 'There was an error; please try again',
                            type: 'warning'
                        })
                    })
                }
            },
            isValid(){
                return this.gallery.title.length && this.gallery.description.length
            }
        },
        mounted() {
            const id = this.$route.params.id
            if(id != 'new' && id > 0){
                this.getData(id)
            }
        }
    }
</script>
