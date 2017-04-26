<template>
    <div class="row">
        <button style="display:none;" id="deleteModalButton" type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#deleteModal"></button>
        <div id="deleteModal" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Are you sure?</h4>
                    </div>
                    <div class="modal-body">
                        <p>This is not-reversible. Are you sure you wish to continue?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteRow">Confirm</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    </div>
                </div>

            </div>
        </div>
        <div class="col-md-12">
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title" v-text="vuetable.title"></h3>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
                        <div class="row">
                            <div class="col-sm-12 table-responsive">
                                <table aria-describedby="example1_info" role="grid" id="example1" class="table table-bordered table-striped dataTable">
                                    <thead>
                                    <tr role="row">
                                        <th style="width: 50px;" colspan="1" rowspan="1">ID</th>
                                        <th style="width: 287px;" colspan="1" rowspan="1">Title</th>
                                        <th style="width: 100px;" colspan="1" rowspan="1" v-for="prop in vuetable.extraRows">{{ toUpper(prop) }}</th>
                                        <th style="width: 100px;" colspan="1" rowspan="1">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr class="even" role="row" v-for="(row, i) in vuetable.data" v-if="shouldShow(i)">
                                        <td>{{row.id}}</td>
                                        <td>{{nameOrTitle(row)}}</td>
                                        <td v-for="prop in vuetable.extraRows">{{ row[prop] }}</td>
                                        <td>
                                            <div class="btn btn-primary" @click="edit(row.id)" v-if="!vuetable.hideEdit">Edit</div>
                                            <div class="btn btn-danger" @click="promptDelete(row.id)"><i class="fa fa-minus"></i></div>
                                        </td>
                                    </tr>
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th colspan="1" rowspan="1">ID</th>
                                        <th colspan="1" rowspan="1">Title</th>
                                        <th colspan="1" rowspan="1" v-for="prop in vuetable.extraRows">{{ toUpper(prop) }}</th>
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
</template>
<script>
    import event from '../../event.js'
    export default {
        name: '',
        props: ['vuetable', 'parentId'],
        data() {
            return {
                activePage: 1,
                deleteId: 0
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
                return Math.ceil(this.vuetable.data.length / 10);
            },
            showing() {
                const minRange = (this.activePage*10)-9
                const maxRange = this.activePage*10 > this.vuetable.data.length ? this.vuetable.data.length : this.activePage*10
                const max = this.vuetable.data.length
                return `Showing ${minRange} to ${maxRange} of ${max}`;
            }
        },
        methods: {
            toUpper(value) {
                return value.charAt(0).toUpperCase() + value.slice(1)
            },
            nameOrTitle(row) {
                let value = ''
                if(row.hasOwnProperty('title')){
                    value = row.title
                } else if (row.hasOwnProperty('name')) {
                    value = row.name
                }

                return value
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
            edit(id) {
                event.$emit('userEditRequest', {
                    id: id,
                    parentId: this.parentId
                });
            },
            promptDelete(id) {
                this.deleteId = id;
                document.getElementById("deleteModalButton").click();
            },
            deleteRow() {
                event.$emit('userDeleteRequest', {
                    id: this.deleteId,
                    parentId: this.parentId
                });
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
