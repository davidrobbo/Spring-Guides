<template>
    <div>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Your Event</h3>
                            <div class="pull-right">
                                <div class="btn btn-primary" @click="saveEvent(false)" v-if="!event.id">Save Event</div>
                                <div class="btn btn-primary" @click="saveEvent(true)" v-if="!event.id">Save and Exit</div>
                                <div class="btn btn-primary" @click="updateEvent(false)" v-if="event.id">Update gallery</div>
                                <div class="btn btn-primary" @click="updateEvent(true)" v-if="event.id">Update and exit</div>
                                <div class="btn btn-danger" @click="back">Back</div>
                            </div>
                        </div>
                        <div class="box-body">
                            <div class="form-group">
                                <label for="galtitle" class="form-lavel">Title</label>
                                <input type="text" v-model="event.title" id="galtitle" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="galdate" class="form-lavel">Date</label>
                                <input type="date" v-model="event.date" id="galdate" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="galdesc" class="form-lavel">Description</label>
                                <input type="text" id="galdesc" v-model="event.description" class="form-control"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Images for this event</h3>
                        </div>
                        <div class="box-body">
                            <imgcropper :parentId="_uid"></imgcropper>
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
                                            <tr class="even" role="row" v-for="(img, i) in event.images" v-if="shouldShow(i)">
                                                <td>{{ img }}</td>
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
    import imgcropper from '../contents/ImageCropper'
    import Vue from 'vue'
    export default{
        name: "EventEditor",
        components: {
            imgcropper: imgcropper
        },
        data(){
            return{
                event: {
                    id: 0,
                    title: "",
                    description: "",
                    images: []
                },
                id: 0,
                title: "",
                activePage: 1,
                model: "event",
                collection: "events"
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
                return Math.ceil(this.event.images.length / 10);
            },
            showing() {
                const minRange = (this.activePage*10)-9
                const maxRange = this.activePage*10 > this.event.images.length ? this.event.images.length : this.activePage*10
                const max = this.event.images.length
                return `Showing ${minRange} to ${maxRange} of ${max}`;
            },
            events() {
                return this.$store.getters.events
            }
        },
        methods: {
            removeFromGallery(index){
                this.event.images.splice(index, 1)
            },
            getData(galId){
                const event = this.events.find( ({id}) => {
                    return galId == id
                })
                if(event){
                    for(var prop in event){
                        Vue.set(this.event, prop, event[prop])
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
            saveEvent(shouldExit){
                if(this.isValid()){
                    this.$store.dispatch('saveModel', {model:this[this.model], modelName: this.model, collectionName: this.collection})
                    .then( (data) => {
                        if(data.status == 'ok'){
                            this.event.id = data.event.id
                            event.$emit('message', {
                                message: 'Event saved',
                                text: "The images and gallery have been updated",
                                type: 'success'
                            })
                            if(shouldExit){
                                this.back()
                            }
                        } else {
                            event.$emit('message', {
                                message: 'Event error',
                                text: "An error occurred; please try again",
                                type: 'warning'
                            })
                        }
                    }, () => {
                    })
                } else {
                    event.$emit('message', {
                        message: 'Event not valid',
                        text: "An error occurred; please complete all required fields",
                        type: 'warning'
                    })
                }
            },
            back(){
                this.$router.push({name: 'Events'})
            },
            updateEvent(shouldExit){
                if(this.isValid()){
                    this.$store.dispatch('updateModel', {model:this[this.model], modelName: this.model, collectionName: this.collection})
                    .then( (data) => {
                        if(data.status == 'ok'){
                            event.$emit('message', {
                                message: 'Event saved',
                                text: 'Your event has successfully been saved',
                                type: 'success'
                            })
                            if(shouldExit){
                                this.back()
                            }
                        } else {
                            event.$emit('message', {
                                message: 'Event error',
                                text: 'There was an error; please try again',
                                type: 'warning'
                            })
                        }
                    }, () => {
                        event.$emit('message', {
                            message: 'Event error',
                            text: 'There was an error; please try again',
                            type: 'warning'
                        })
                    })
                }
            },
            isValid(){
                return this.event.title.length && this.event.description.length
            },
            handleImageCrop(data){
                if(this.shouldRespond(data.parentId)){
                    this.event.images.push(data.file)
                }
            },
            shouldRespond(id){
                return this._uid == id
            }

        },
        mounted() {
            const id = this.$route.params.id
            if(id != 'new' && id > 0){
                this.getData(id)
            }
            event.$on('cropped-image-uploaded', this.handleImageCrop)
        }
    }
</script>
