
export default class Button {

    #settings = {
        innerHTML: '',
        callback: undefined,
    }

    constructor(_settings) {

    }

    set innerHTML(_innerHTML) {
        this.#settings.innerHTML = _innerHTML
    }

    set callback(_callback) {
        this.#settings.callback = _callback
    }

    build() {
        const button = document.createElement('button')

        button.innerHTML = this.#settings.innerHTML

        button.addEventListener('click', () => {
            this.#settings.callback()
            console.log('clicked')
        })

        return button
    }

}
