
export default class Row {
    #keys = {
        key: undefined,
        order: undefined,
        customStyle: undefined,
        cells: undefined,
    }

    constructor() {}

    /**
     * set row key attribute
     * @param _value {string} E.g. 123
     */
    set key(_value) {
        this.#keys.key = _value
    }

    /**
     * get row key
     * @return {string}
     */
    get key() {
        return this.#keys.key
    }

    /**
     * set row order
     * @param _value {number} E.g. 0
     */
    set order(_value) {
        this.#keys.order = _value
    }

    /**
     * get row order
     * @return {number}
     */
    get order() {
        return this.#keys.order
    }

    /**
     * set row order
     * @param _value {string} E.g. 'font-size: 18px;'
     */
    set customStyle(_value) {
        this.#keys.customStyle = _value
    }

    /**
     * get row order
     * @return {number}
     */
    get customStyle() {
        return this.#keys.customStyle
    }

    /**
     * set row cells
     * @param _value {[{}]}
     */
    set cells(_cells) {
        this.#keys.cells = _cells
    }

    /**
     * get row cells
     * @return {number}
     */
    get cells() {
        return this.#keys.cells
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
