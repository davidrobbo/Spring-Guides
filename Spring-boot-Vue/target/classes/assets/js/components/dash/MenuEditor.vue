<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title" v-text="headerMessage"></h3>
                        <div class="btn btn-warning" @click="addSection" v-if="menu.type != 'pdf'">New Section</div>
                        <div class="pull-right">
                            <div class="btn btn-primary" v-if="!menu.id" @click="save(false)">Save</div>
                            <div class="btn btn-primary" v-if="menu.id" @click="update(false)">Update</div>
                            <div class="btn btn-primary" v-if="!menu.id" @click="save(true)">Save and exit</div>
                            <div class="btn btn-primary" v-if="menu.id" @click="update(true)">Update and exit</div>
                            <div class="btn btn-danger" @click="back">Back</div>
                        </div>
                    </div>
                    <div class="box-body">
                        <div class="form-group">
                            <label for="menu-title" class="form-label">Title*</label>
                            <input type="text" v-model="menu.title" class="form-control menu-title" id="menu-title"/>
                        </div>
                        <div class="form-group">
                            <label for="menu-desc" class="form-label">Description</label>
                            <input type="text" v-model="menu.description" class="form-control menu-desc" id="menu-desc"/>
                        </div>
                        <div class="form-group">
                            <label for="menu-type" class="form-label">Type</label>
                            <select v-model="menu.type" id="menu-type" class="form-control">
                                <option value="pdf">PDF upload</option>
                                <option value="builder">Builder</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-10 col-md-11">
                                <label for="menu-file" class="form-label">File Upload</label>
                                <input :disabled="menu.type != 'pdf'" type="text" v-model="menu.content.link" class="form-control menu-desc" id="menu-file"/>
                            </div>
                            <div class="col-xs-2 col-md-1">
                                <button style="margin-top:25px;" class="btn btn-default popup_selector" type="submit" data-inputid="menu-file">
                                    Browse
                                </button>
                            </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <drag style="min-height:50px; width: 100%;" :element="'div'" :list="menu.content.data" :options="sectionOptions" @start="drag=true" @end="drag=false" v-if="menu.type == 'builder'">
            <div class="row menu-section" v-for="(section, i) in menu.content.data">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <i class="fa fa-arrows"></i>
                            <h3 class="box-title" v-text="section.title"></h3>
                            <div class="pull-right">
                                <div class="btn btn-primary" @click="addItem(i)">Add Item</div>
                                <div class="btn btn-danger" @click="deleteSection(i)">Delete Section</div>
                            </div>
                        </div>
                        <div class="box-body">
                            <div class="form-group">
                                <label :for="'section-title-' + i" class="form-label">Title</label>
                                <input type="text" v-model="section.title" class="form-control menu-section-title" :id="'section-title-' + i"/>
                            </div>
                            <div class="form-group">
                                <label :for="'section-desc-' + i" class="form-label">Description</label>
                                <input type="text" v-model="section.description" class="form-control menu-section-desc" :id="'section-desc-' + i"/>
                            </div>
                            <drag style="min-height:50px; width: 100%;"  :element="'div'" :list="section.items" :options="itemOptions" @start="drag=true" @end="drag=false">
                                <div class="menu-item" v-for="(item, ind) in section.items">
                                    <i class="fa fa-arrows"></i>
                                    <div class="btn btn-danger" @click="deleteItem(i, ind)">Delete</div>
                                    <div class="form-group">
                                        <label :for="'title-section-' + i + '-item-' + ind" class="form-label">Title</label>
                                        <input type="text" v-model="item.title" class="form-control menu-item-title" :id="'title-section-' + i + '-item-' + ind"/>
                                    </div>
                                    <div class="form-group">
                                        <label :for="'description-section-' + i + '-item-' + ind" class="form-label">Description</label>
                                        <input type="text" v-model="item.description" class="form-control menu-item-desc" :id="'description-section-' + i + '-item-' + ind"/>
                                    </div>
                                    <div class="form-group">
                                        <label :for="'price-section-' + i + '-item-' + ind" class="form-label">Price</label>
                                        <input type="text" v-model="item.price" class="form-control menu-item-price" :id="'price-section-' + i + '-item-' + ind"/>
                                    </div>
                                </div>
                            </drag>
                        </div>
                    </div>
                </div>
            </div>
        </drag>
    </section>
</template>
<script>
    import drag from 'vuedraggable'
    import event from '../../event.js'
    import Vue from 'vue'
    export default {
        name: 'MenuEditor',
        components: {
            drag: drag
        },
        data() {
            return {
                interval: {},
                menu: {
                    id: 0,
                    title: "",
                    type: "pdf",
                    description: "",
                    content: {
                        link: "",
                        data: []
                    }
                },
                itemOptions: {
                    group: 'items',
                    handle: '.fa-arrows'
                },
                sectionOptions: {
                    group: 'sections',
                    handle: '.fa-arrows'
                },
                model: "menu",
                collection: "menus"

            }
        },
        computed: {
            headerMessage(){
                return ( this.menu.id ? "Editing " : "Creating " ) + this.menu.title + " menu"
            },
            menus() {
                return this.$store.getters.menus
            }
        },
        methods: {
            save(shouldExit){
                if(this.isValid()){
                    this.$store.dispatch('saveModel', {model:this[this.model], modelName: this.model, collectionName: this.collection})
                    .then( (data) => {
                        if(data.status == 'ok'){
                          this.menu.id = data.menu.id
                          event.$emit('message', {
                            message: 'Menu saved',
                            text: 'Your menu has successfully been saved',
                            type: 'success'
                          })
                          if(shouldExit){
                            this.$router.push({name: 'Menus'})
                          }
                        } else {
                          event.$emit('message', {
                            message: 'Menu error',
                            text: 'There was an error; please try again',
                            type: 'warning'
                          })
                        }
                    }, () => {
                        event.$emit('message', {
                          message: 'Menu error',
                          text: 'There was an error; please try again',
                          type: 'warning'
                        })
                    })
                }
            },
            update(shouldExit){
                if(this.isValid()){
                    this.$store.dispatch('updateModel', {model:this[this.model], modelName: this.model, collectionName: this.collection})
                    .then( (data) => {
                        if(data.status == 'ok'){
                            event.$emit('message', {
                                message: 'Menu saved',
                                text: 'Your menu has successfully been saved',
                                type: 'success'
                            })
                            if(shouldExit){
                                this.back()
                            }
                        } else {
                            event.$emit('message', {
                                message: 'Menu error',
                                text: 'There was an error; please try again',
                                type: 'warning'
                            })
                        }
                    }, () => {
                        event.$emit('message', {
                            message: 'Menu error',
                            text: 'There was an error; please try again',
                            type: 'warning'
                        })
                    })
                }
            },
            isValid(){
                let bool = true
                if(!this.menu.title.length){
                    event.$emit('message', {
                        message: "Menu incomplete",
                        text: "Please complete all required fields"
                    })
                    bool = false
                }
                return bool
            },
            back(){
                this.$router.push({name: 'Menus'})
            },
            getData(menuId){
                const menu = this.menus.find( ({id}) => {
                    return id == menuId
                })
                if(menu){
                    for(let prop in menu){
                        Vue.set(this.menu, prop, menu[prop])
                    }
                }
            },
            addSection(){
                this.menu.content.data.push({
                    title: "",
                    description: "",
                    items: []
                })
            },
            addItem(i){
                this.menu.content.data[i].items.push({
                    title: "",
                    description: "",
                    price: ""
                })
            },
            deleteSection(i){
                this.menu.content.data.splice(i, 1)
            },
            deleteItem(contentIndex, itemIndex){
                this.menu.content.data[contentIndex].items.splice(itemIndex, 1)
            }
        },
        mounted() {
            const id = this.$route.params.id
            if(id !== 'new' && id > 0){
                this.getData(id)
            }
            const self = this
            this.interval = setInterval( () => {
                self.menu.content.link = document.getElementById("menu-file").value
            }, 100)
        },
        beforeDestroy(){
            clearInterval(this.interval)
        }
    }
</script>
<style>
</style>
