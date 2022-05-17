function CardComponent(el) {

  return {
    el: el,
    data: {
        models: [],
        textures: [],
        model: '',
        texture: '',
        video: '',
        isVideoModal: false,
        isLoading: false,
        swiper: null,
        mainImageElem: null,
        zoom: 0.2
    },
    mounted: function() {

        setTimeout(() => {
            
            this.swiper = new Swiper(".mySwiper", {
                slidesPerView: 12,
                spaceBetween: 0,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                    1540: {
                        slidesPerView: 12,
                    },
                    1280: {
                        slidesPerView: 10,
                    },
                    1024: {
                        slidesPerView: 6,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    480: {
                        slidesPerView: 2,
                    },
                    0: {
                        slidesPerView: 2,
                    },
                }
            })

            this.mainImageElem = document.querySelector('.main-image')

            this.mainImageElem.addEventListener('wheel', (e) => {

                var delta = e.deltaY

                if (delta > 0) {
                    var scale = this.mainImageElem.getBoundingClientRect().width / this.mainImageElem.offsetWidth.toFixed(1) + (this.zoom / 5)
                    this.mainImageElem.setAttribute('style', `transform: scale(${scale})`)
                } else {
                    var scale = this.mainImageElem.getBoundingClientRect().width / this.mainImageElem.offsetWidth.toFixed(1) - (this.zoom / 5)
                    this.mainImageElem.setAttribute('style', `transform: scale(${scale})`)
                }
            })
            
        }, 500)

    },
    methods: {
        getModels: function() {

            this.fetch('./data/avatar.json').then(models => {

                this.models = models
                this.model = this.models[0]

            })

        },
        getTextures: function() {

            this.fetch('./data/texture.json').then(textures => {

                this.textures = textures
                this.texture = this.textures[0].id

            })
        },
        getModelUrl: function(model) {

            return `./image/avatar/avatar_${model}.jpeg`
        },
        getTextureUrl: function(texture) {

            return `./image/texture/${texture.id}.jpeg`
        },
        getAvatar: function(model, texture) {

            return `https://www.walanwalan.com/3d/do/?action=result&folder=${model}&photoid=${texture}&zoom=100&dx=0&dy=0`
        },
        getVideoUrl: function(texture) {

            return `https://www.youtube.com/embed/` + this.textures.find(e => e.id == texture).video
        },
        onModel: function(model) {

            this.model = model
            this.isLoading = true
            setTimeout(() => this.isLoading = false, 500);

        },
        onTexture: function(texture) {

            this.texture = texture.id
            this.isLoading = true
            setTimeout(() => this.isLoading = false, 500);

        },
        onVisibleVideoModal: function() {
            this.isVideoModal = true
        },
        onHideVideoModal: function() {
            this.isVideoModal = false
        },
        onPlusZoom: function() {
            var scale = this.mainImageElem.getBoundingClientRect().width / this.mainImageElem.offsetWidth.toFixed(1) + this.zoom
            this.mainImageElem.setAttribute('style', `transform: scale(${scale})`)

        },
        onMinusZoom: function() {
            var scale = this.mainImageElem.getBoundingClientRect().width / this.mainImageElem.offsetWidth.toFixed(1) - this.zoom
            this.mainImageElem.setAttribute('style', `transform: scale(${scale})`)
        },
        fetch: function (url, options) {

            if (!options) options = {}
            else if (!options.headers) options.headers = {}   
            else if (!options.headers['Authorization']) _.extend(options.headers, { 'Authorization': 'Bearer ' + this.accessToken })

            return fetch(url, options).then(function (res) {

                if (res.ok) return res.json()

                throw new Error()

            })
        }
    },
  }

}