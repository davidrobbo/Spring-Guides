<template>
    <div>
        <div class="form-group">
            <label :for="'gallery' + _uid" class="form-label">Please select the gallery you wish to show</label>
            <select v-model="model.gallery" class="form-control" :id="'gallery' + _uid">
                <option v-for="gal in galleries" :value="gal.id" v-text="gal.title"></option>
            </select>
        </div>
        <div class="form-group">
            <label :for="'gallery' + _uid" class="form-label">Type of gallery</label>
            <select v-model="model.type" class="form-control" :id="'gallery' + _uid">
                <option value="standard">Standard</option>
                <option value="masonry">Masonry/Tiled</option>
            </select>
        </div>
    </div>
</template>
<script>
    import ContentInterface from '../../mixins/ContentInterface'
    export default {
        name: 'GallerySelector',
        mixins: [ContentInterface],
        data() {
            return {
                model: {
                    gallery: "",
                    type: ""
                }
            }
        },
        computed:{
          galleries() {
            return this.$store.getters.galleries
          }
        },
        watch: {
        },
        methods: {
        },
        mounted() {
        },
        created(){
        }     
    }
</script>
<style>
</style>
