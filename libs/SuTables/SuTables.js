
export default class SuTables {
    #tableId = undefined

    #TEMPLATES = {
        HEADERS: {
            html: '',
            order: 0,
            onClick: undefined,
            classes: [], // E.g. ['text-danger']
            customStyle: '', // E.g. 'font-size: 24px;'
            attrs: {
                scope: 'col',
            },
        },
        ROWS: {
            order: 0,
            classes: [], // E.g. ['text-danger']
            customStyle: '', // E.g. 'font-size: 24px;'
            attrs: {},
            cells: []
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
        this.#headers.forEach((header) => {
            const th = document.createElement('th');
            th.innerHTML = header.html;

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

        // Sort headers by order
        this.#rows.sort((a, b) => a.order - b.order);

        // Add each header to the header row
        this.#rows.forEach((rowData) => {
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

            // iterate on row cells and add them into row
            rowCells.forEach(rowCell => {
                const td = document.createElement('td')
                // td.innerHTML = rowCell.html
                td.append(rowCell.html)
                // console.log(rowCell.html)

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
                if (typeof rowCell.onClick === 'function') {
                    td.addEventListener('click', () => {
                        rowCell.onClick()
                    })
                }

                tr.appendChild(td)
            })

            tbody.append(tr)
        });

        tableElement.appendChild(tbody);
    }

}
