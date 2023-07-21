
export default class SuTables {
    #tableId = undefined

    #TEMPLATES = {
        HEADERS: {
            html: '',
            order: 0,
            onClick: undefined,
            classes: [], // E.g. classes: ['text-danger']
            customStyle: '', // E.g. customStyle: 'font-size: 24px;'
            attrs: {}, // E.g. attrs: {scope: 'col'}
        },
        ROWS: {
            key: '', // row key attribute E.g. <tr data-su-key="<key>"></tr>
            order: 0,
            classes: [], // E.g. ['text-danger']
            customStyle: '', // E.g. 'font-size: 24px;'
            attrs: {},
            cells: []
        }
    }

    #SETTINGS = {
        /*
            Whenever to add data-su-order attribute to headers and rows
            this can be useful when you want to target specific cell in headers or rows
         */
        USE_ORDER_ATTR: {
            HEADERS: false, // E.g. <th data-su-order="<index>"></tr>
            ROWS: false, // E.g. <tr data-su-order="<index>"></tr>
            CELLS: false, // E.g. <td data-su-order="<index>"></tr>
        }
    }

    #headers = []
    #rows = []

    constructor(_tableId) {
        if (!_tableId || _tableId === '') {
            throw new Error('Table id is required!')
        }
        this.#tableId = _tableId
    }

    setHeaders(_headers) {
        if (!Array.isArray(_headers)) {
            throw new Error('Headers must be an array of objects.');
        }

        // Validate each header object and set default values if necessary
        _headers.forEach((header, index) => {
            if (typeof header !== 'object' || header === null) {
                throw new Error('Each header must be an object.');
            }

            // Apply default values from the template if some properties are missing
            const headerObj = {
                ...this.#TEMPLATES.HEADERS,
                ...header,
                order: header.order??index, // set default order if not defined
            };

            this.#headers.push(headerObj)
        });
    }

    setRows(_rows) {
        if (!Array.isArray(_rows)) {
            throw new Error('Rows must be an array of objects.');
        }

        // clear previous rows
        this.#rows = []

        // Validate each row object and set default values if necessary
        _rows.forEach((rowData) => {
            const rowObj = {
                ...this.#TEMPLATES.ROWS,
                ...rowData
            };
            this.#rows.push(rowObj)
        });
    }

    renderHeaders() {
        const tableElement = document.getElementById(this.#tableId);
        if (!tableElement) {
            throw new Error(`Table with id "${this.#tableId}" not found.`);
        }

        // remove previous thead if found
        if (tableElement.querySelector('thead')) tableElement.querySelector('thead').remove()

        const thead = document.createElement('thead')

        // Create the header row element
        const tr = document.createElement('tr');

        // Sort headers by order
        this.#headers.sort((a, b) => a.order - b.order);

        // Add each header to the header row
        this.#headers.forEach((header, index) => {
            const th = document.createElement('th');
            th.innerHTML = header.html;

            // set order attribute if enabled
            if (this.#SETTINGS.USE_ORDER_ATTR.HEADERS) th.dataset.suOrder = index

            // Set classes
            header.classes.forEach(headClass => {
                th.classList.add(headClass)
            })

            // Set css custom styling
            th.style = header.customStyle

            // Apply the attributes defined in the TEMPLATES object
            if (header.attrs) {
                for (const [attrName, attrValue] of Object.entries(header.attrs)) {
                    th.setAttribute(attrName, attrValue);
                }
            }

            // Add any other properties or event listeners if needed
            if (typeof header.onClick === 'function') {
                th.addEventListener('click', () => {
                    header.onClick()
                })
            }

            tr.appendChild(th);
        });

        // Append the header row to the table
        thead.append(tr)
        tableElement.appendChild(thead);
    }

    renderRows() {
        const tableElement = document.getElementById(this.#tableId);
        if (!tableElement) {
            throw new Error(`Table with id "${this.#tableId}" not found.`);
        }

        // remove previous tbody if found
        if (tableElement.querySelector('tbody')) tableElement.querySelector('tbody').remove()

        const tbody = document.createElement('tbody')

        // Sort rows by order
        this.#rows.sort((a, b) => a.order - b.order);

        // Add each header to the header row
        this.#rows.forEach((rowData, rowIndex) => {
            const rowCells = rowData.cells

            // Sort row cells by order
            rowCells.sort((a, b) => a.order - b.order);

            const tr = document.createElement('tr');

            // set row classes
            if (rowData.classes) {
                rowData.classes.forEach(rowDataClass => {
                    tr.classList.add(rowDataClass)
                })
            }

            // set row custom styling
            tr.style = rowData.customStyle

            // set row order attribute if enabled
            if (this.#SETTINGS.USE_ORDER_ATTR.ROWS) tr.dataset.suOrder = rowIndex

            // set row key attribute if found
            if (rowData.key) tr.dataset.suKey = rowData.key

            // iterate on row cells and add them into row
            rowCells.forEach((rowCell, index) => {
                const td = document.createElement('td')

                // add elements to cell
                if (rowCell.elements) {
                    rowCell.elements.forEach(element => {
                        td.appendChild(element)
                    })
                }

                // add html to cell
                if (typeof rowCell.html != 'undefined') {
                    td.append(rowCell.html)
                }

                // set cell order attribute if enabled
                if (this.#SETTINGS.USE_ORDER_ATTR.CELLS) td.dataset.suOrder = index

                // set cell key attribute if found
                if (rowCell.key) td.dataset.suKey = rowCell.key

                // Set cell classes
                if (rowCell.classes) {
                    rowCell.classes.forEach(rowCellClass => {
                        td.classList.add(rowCellClass)
                    })
                }

                // Set cell attributes
                if (rowCell.attrs) {
                    for (const [attrName, attrValue] of Object.entries(rowCell.attrs)) {
                        td.setAttribute(attrName, attrValue);
                    }
                }

                // Set custom css styling
                td.style = rowCell.customStyle

                // Add any other properties or event listeners if needed
                if (typeof rowCell.clickCallback === 'function') {
                    td.addEventListener('click', () => {
                        rowCell.clickCallback()
                    })
                }

                tr.appendChild(td)
            })

            tbody.append(tr)
        });

        tableElement.appendChild(tbody);
    }
}
