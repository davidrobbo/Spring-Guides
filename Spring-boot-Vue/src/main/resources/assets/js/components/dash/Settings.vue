<template>
    <div>
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title"><i :class="[ visible ? 'swirl-up' : '', 'ion ion-chevron-down swirl']" @click="visible=!visible"></i> Add a new page</h3>
                            <div class="pull-right">
                                <div class="btn btn-primary" @click="add">Add Page</div>
                            </div>
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
                                <label for="page-icon" class="form-label">Icon*</label>
                                <select v-model="page.icon" id="page-icon" class="form-control">
                                    <option v-for="icon in icons" :value="icon.icon" v-text="icon.name"></option>
                                </select>
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
                                <input type="text" id="page-banner-img" class="form-control"/>
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
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title"><i :class="[ visibleContent ? 'swirl-up' : '', 'ion ion-chevron-down swirl']" @click="visibleContent=!visibleContent"></i> Add content to the page</h3>
                            <select v-model="content" class="form-control">
                                <option v-for="(opt, i) in contents" :value="i" v-text="opt.name"></option>
                            </select>
                            <div class="pull-right">
                                <div class="btn btn-primary" @click="addContent">Add to page</div>
                            </div>
                        </div>
                        <div :class="[ visibleContent ? 'box-open' : '', 'box-slide box-body']">
                            <ul class="list-group">
                                <li class="list-group-item" v-for="(content, i) in page.contents" v-text="content.name">
                                    <span class="pull-right">
                                        <div class="btn btn-danger" @click="removeContent(i)">
                                            <i class="fa fa-minus"></i>
                                        </div>
                                    </span>
                                </li>
                            </ul>
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
                            <h3 class="box-title"><i :class="[ visibleSettings ? 'swirl-up' : '', 'ion ion-chevron-down swirl']" @click="visibleSettings=!visibleSettings"></i> Settings</h3>
                        </div>
                        <div :class="[ visibleSettings ? 'box-open' : '', 'box-slide box-body']">
                            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
                                <div class="row">
                                    <div class="col-sm-12 table-responsive">
                                        <table aria-describedby="example1_info" role="grid" id="example1" class="table table-bordered table-striped dataTable">
                                            <thead>
                                            <tr role="row">
                                                <th style="width: 50px;" colspan="1" rowspan="1">ID</th>
                                                <th style="width: 287px;" colspan="1" rowspan="1">Name</th>
                                                <th style="width: 100px;" colspan="1" rowspan="1">Value</th>
                                                <th style="width: 100px;" colspan="1" rowspan="1">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr class="even" role="row" v-for="(setting, i) in settings">
                                                <td v-text="setting.id"></td>
                                                <td v-text="setting.name"></td>
                                                <td><input type="text" v-model="setting.value" class="form-control"/></td>
                                                <td>
                                                    <div class="btn btn-primary" @click="saveSetting(setting)">Update</div>
                                                </td>
                                            </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <th colspan="1" rowspan="1">ID</th>
                                                <th colspan="1" rowspan="1">Title</th>
                                                <th colspan="1" rowspan="1">Value</th>
                                                <th colspan="1" rowspan="1">Action</th>
                                            </tr>
                                            </tfoot>
                                        </table>
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
<script>
    import icons from '../../icons.js'
    import contents from '../../contents.js'
    import event from '../../event.js'
    export default {
        name: 'Settings',
        data() {
            return {
                interval: null,
                visible: false,
                visibleContent: false,
                visibleSettings: false,
                page: {
                    name: "",
                    title: "",
                    description: "",
                    contents: [],
                    url: "",
                    icon: "",
                    published: "0",
                    banner: {
                        image: "",
                        text: ""
                    }
                },
                content: "",
                icons,
                contents,
                settings: []
            }
        },
        computed: {
        },
        methods: {
            saveSetting(setting){
                this.$store.dispatch('updateSetting', {setting: setting})
            },
            add(){
                if(this.isValid()) {
                    this.$store.dispatch('addPage', {page: this.page})
                } else {
                    event.$emit('message', {
                        type: "warning",
                        message: "Error adding page",
                        text: "Ensure all required fields are complete"
                    })
                }
            },
            addContent(){
                this.page.contents.push(this.contents[this.content])
            },
            removeContent(i){
                this.page.contents.splice(i, 1)
            },
            isValid(){
                let bool = true
                for(let prop in this.page){
                    if(!this.page[prop].length && typeof this.page[prop] !== 'object'){
                        bool = false
                        break
                    }
                }
                return bool
            }
        },
        mounted() {
            this.settings = this.$store.getters.settings
            const self = this
            this.interval = setInterval( () => {
                self.page.banner.image = document.getElementById("page-banner-img").value
            }, 100)
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
        max-height: 1000px;
        padding: 10px;
        opacity: 1;
    }
</style>
