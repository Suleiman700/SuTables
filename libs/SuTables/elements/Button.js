
export default class Button {

    #settings = {
        innerHTML: '',
        classes: [],
        callback: undefined,
    }

    constructor(_settings) {}

    set innerHTML(_innerHTML) {
        this.#settings.innerHTML = _innerHTML
    }

    set callback(_callback) {
        this.#settings.callback = _callback
    }

    /**
     * set classes
     * @param _classes {array} E.g. ['text-success']
     */
    set classes(_classes) {
        this.#settings.classes = _classes
    }

    getElm() {
        const button = document.createElement('button')

        button.innerText = this.#settings.innerHTML
        button.classList = this.#settings.classes.join(' ')

        button.addEventListener('click', () => {
            this.#settings.callback()
        })

        return button
    }

}
