import event from '../event'
export default {
    props: ['index', 'defaultData', 'parentId'],
    data() {
        return {
            model: {
            }
        }
    },
    methods: {
        shouldRespond(id){
            return id == this._uid
        }
    },
    watch: {
        model: {
            handler: function(val, oldVal){
                this.$emit('contentUpdated', {
                    index: this.index,
                    content: val,
                    parentId: this.parentId
                })
            },
            deep: true
        }
    },
    mounted() {
        this.$nextTick( () => {
            for(let prop in this.defaultData){
                this.$set(this.model, prop, this.defaultData[prop]);
            }
        })
        event.$on("cropped-image-uploaded", this.respondToImageUpload)
    }
}