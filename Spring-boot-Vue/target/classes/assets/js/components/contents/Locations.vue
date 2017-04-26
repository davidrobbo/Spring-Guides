<template>
    <div>
        <div class="form-group">
            <label :for="'pc' + _uid" class="form-label">Please add the postcode for the location</label>
            <input type="text" v-model="model.pc" class="form-control" :id="'pc' + _uid"/>
        </div>
        <div class="form-group">
            <label :for="'loc' + _uid" class="form-label">Please add the location details and any extra details:</label>
            <textarea v-model="model.loc" class="form-control" :id="'loc' + _uid"/>
        </div>
        <div class="btn btn-primary" @click="addToList">Add</div>
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">Email addresses</h3>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">
                        <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
                            <div class="row">
                                <div class="col-sm-12 table-responsive">
                                    <table aria-describedby="example1_info" role="grid" id="example1" class="table table-bordered table-striped dataTable">
                                        <thead>
                                        <tr role="row">
                                            <th style="width: 287px;" colspan="1" rowspan="1">Post code</th>
                                            <th style="width: 100px;" colspan="1" rowspan="1">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr class="even" role="row" v-for="(loc, i) in model.locations">
                                            <td>{{ loc.postcode }}</td>
                                            <td>
                                                <div class="btn btn-danger" @click="removeFromList(i)"><i class="fa fa-minus"></i></div>
                                            </td>
                                        </tr>
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <th colspan="1" rowspan="1">Post code</th>
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
    </div>
</template>
<script>
    import ContentInterface from '../../mixins/ContentInterface.js'
    export default {
        name: 'Locations',
        mixins: [ContentInterface],
        data() {
            return {
                model: {
                    locations: [],
                    pc: "",
                    loc: "",
                }
            }
        },
        computed:{
        },
        watch: {
        },
        methods: {
            removeFromList(i){
                this.model.locations.splice(i, 1)
            },
            addToList(){
                this.model.locations.push({
                    postcode: this.model.pc,
                    location: this.model.loc
                })
                this.model.pc = ""
                this.model.loc = ""
            }
        },
        mounted() {
        },
        created(){
        }
    }
</script>
<style>
</style>
