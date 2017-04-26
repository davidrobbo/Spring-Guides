<template>
    <div>
        <div class="form-group">
            <label :for="'company' + _uid" class="form-label">Company info</label>
            <textarea v-model="model.company" :id="'company' + _uid" class="form-control"></textarea>
        </div>
        <div class="form-group">
            <label :for="'venue' + _uid" class="form-label">Venue info</label>
            <textarea v-model="model.venue" :id="'venue' + _uid" class="form-control"></textarea>
        </div>
        <div class="btn btn-primary" @click="addProfile">
            Add new profile
        </div>
        <div class="staff-profile-bag">
            <div class="staff-profile" v-for="(profile, i) in model.staff">
                <div class="form-group">
                    <label :for="'profile-name' + i" class="form-label">Name</label>
                    <input type="text" v-model="profile.name" class="form-control" :id="'profile-name' + i"/>
                </div>
                <div class="form-group">
                    <label :for="'profile-title' + i" class="form-label">Title</label>
                    <input type="text" v-model="profile.title" class="form-control" :id="'profile-title' + i"/>
                </div>
                <div class="form-group">
                    <label :for="'profile-desc' + i" class="form-label">Title</label>
                    <textarea v-model="profile.description" class="form-control" :id="'profile-desc' + i"/></textarea>
                </div>
                <div class="form-group">
                    <label :for="'profile-image' + i" class="form-label">Image</label>
                    <input type="text" v-model="profile.image" class="form-control" :id="'profile-image' + i"/>
                    <imgcropper :parentId="_uid" :index="i"></imgcropper>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import imgcropper from './ImageCropper'
    import event from '../../event'
    import ContentInterface from '../../mixins/ContentInterface.js'
    export default {
        name: 'AboutUs',
        mixins: [ContentInterface],
        components: {
            imgcropper: imgcropper
        },
        data() {
            return {
                model: {
                    company: "",
                    venue: "",
                    staff: []
                }
            }
        },
        computed:{
        },
        watch: {
        },
        methods: {
            addProfile() {
                this.model.staff.push({
                    name: "",
                    title: "",
                    description: "",
                    image: ""
                })
            },
            respondToImageUpload(data){
                if(this.shouldRespond(data.parentId)){
                    this.model.staff[data.index].image = data.file
                }
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
