export default {
    data () {
        return {
            // imagesUrl
            index: 0
        }
    },
    props: {
        imagesUrl: {
            type: Array,
            required: true
        }
    },
    computed: {
        nextIndex () {
            let index = this.index + 1
            return index >= this.imagesUrl.length ? 0 : index
        },
        prevIndex () {
            let index = this.index - 1
            return index < 0 ? this.imagesUrl.length - 1 : index
        },
        currImageStyles () {
            return {
                backgroundImage: `url(${this.imagesUrl[this.index]})`
            }
        },
        nextImagesStyles () {
            return {
                backgroundImage: `url(${this.imagesUrl[this.nextIndex]})`
            }
        },
        prevImagesStyles () {
            return {
                backgroundImage: `url(${this.imagesUrl[this.prevIndex]})`
            }
        }
    }
}
