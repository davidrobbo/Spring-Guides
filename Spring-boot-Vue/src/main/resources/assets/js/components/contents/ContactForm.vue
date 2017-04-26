<template>
    <div>
        <div class="form-group">
            <label :for="'names-contact' + _uid" class="form-label">Please define the email addresses contact form responses should be sent to</label>
            <input type="text" v-model="model.email" class="form-control" :id="'names-contact' + _uid"/>
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
                                            <th style="width: 287px;" colspan="1" rowspan="1">Email address</th>
                                            <th style="width: 100px;" colspan="1" rowspan="1">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr class="even" role="row" v-for="(email, i) in model.sendTo">
                                            <td>{{ email }}</td>
                                            <td>
                                                <div class="btn btn-danger" @click="removeFromList(i)"><i class="fa fa-minus"></i></div>
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
    import ContentInterface from '../../mixins/ContentInterface'
    export default {
        name: 'ContactForm',
        mixins: [ContentInterface],
        data() {
            return {
                model: {
                    email: "",
                    sendTo: []
                }
            }
        },
        computed:{
        },
        watch: {
        },
        methods: {
            removeFromList(i){
                this.model.sendTo.splice(i, 1)
            },
            addToList(){
                this.model.sendTo.push(this.model.email)
                this.email = ""
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
