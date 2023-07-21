
export default class Cell {
    #keys = {
        key: undefined,
        html: undefined,
        elements: undefined,
        order: undefined,
        classes: undefined,
        clickCallback : undefined
    }

    constructor() {}

    /**
     * set cell key attribute
     * @param _value {string} E.g. 123
     */
    set key(_value) {
        this.#keys.key = _value
    }

    /**
     * get cell key
     * @return {string}
     */
    get key() {
        return this.#keys.key
    }

    /**
     * set cell html
     * @param _value {string} E.g. <p>Hello SuTables</p>
     */
    set html(_value) {
        this.#keys.html = _value
    }

    /**
     * get cell html
     * @return {string}
     */
    get html() {
        return this.#keys.html
    }

    /**
     * set cell elements
     * @param _value {array} E.g. button HTML element, paragraph HTML element
     */
    set elements(_value) {
        this.#keys.elements = _value
    }

    /**
     * get cell elements
     * @return {string}
     */
    get elements() {
        return this.#keys.elements
    }

    /**
     * set cell order
     * @param _value {number} E.g. 0
     */
    set order(_value) {
        this.#keys.order = _value
    }

    /**
     * get cell order
     * @return {number}
     */
    get order() {
        return this.#keys.order
    }

    /**
     * set cell classes
     * @param _value {array} E.g. ['text-success']
     */
    set classes(_value) {
        this.#keys.classes = _value
    }

    /**
     * get cell classes
     * @return {array}
     */
    get classes() {
        return this.#keys.classes
    }

    set clickCallback(_function) {
        this.#keys.clickCallback = _function
    }

    build() {
        // iterate on object keys and remove undefined
        for (const prop in this.#keys) {
            if (this.#keys[prop] === undefined) {
                delete this.#keys[prop];
            }
        }

        return this.#keys
    }
}
