
# SuTables

```text
[] Author: Suleiman
[] Created At: 23 Jul 2023
[] Last Update: 23 Jul 2023
```

A modular JavaScript plugin to build tables with ease

---

### Features
* Supports creating multiple tables in the same page.
* Can set the order of the table headers & rows.
* Can set custom classes, attributes & styling for table headers & rows.
* Can target specific cells inside the table for data changing.
* Fast & easy to use.

---

### Get Started

In order to start using `SuTables` follow the steps below.

Please note that an example file can be viewed: `example.html`, and the example code exists inside `script.js`

---

#### Step 1 - Create your HTML table

In the following example I've created new table with id `simple-table`

Also imported the `script.js` file that contains script to build the table

```html
<!doctype html>
<head>
    <title>SuTables</title>
</head>
<body>
    <div class="table-responsive">
        <table class="table table-hover table-bordered table-striped text-center" id="simple-table"></table>
    </div>

    <script src="./script.js" type="module"></script>
</body>
</html>
```


#### Step 2 - importing classes

We'll now work inside the `script.js` file

import all the required classes

```javascript
// file: script.js
import SuTables from './plugins/SuTables/SuTables.js';
import Button from './plugins/SuTables/elements/Button.js';
import Row from './plugins/SuTables/fields/Row.js';
import Cell from './plugins/SuTables/fields/Cell.js';
```

#### Step 2 - Set your data

```javascript
// file: script.js
const persons = [
    {
        id: 0,
        name: 'John Smith',
        age: 26,
        job: 'Programmer',
        address: 'United Kingdom'
    },
    {
        id: 1,
        name: 'John Doe',
        age: 40,
        job: 'Truck Driver',
        address: 'USA'
    },
]
```

#### Step 3 - Create new instance of SuTables

In the class constructor make sure to pass the table id you created in step 1

```javascript
// file: script.js

// create new instance by passing table id
const SuTablesIns = new SuTables('simple-table');
```

#### Step 4 - Create table headers

Table headers should be typeof `array of objects`

The html key is for setting the cell html

The order key is for setting the cell order (optional), Will follow your order if not set

```javascript
// file: script.js

// setup table headers
const tableHeaders = [
    {
        html: 'id',
        order: 0,
    },
    {
        html: 'Name',
        order: 1,
    },
    {
        html: 'Age',
        order: 2,
    },
    {
        html: 'Job',
        order: 3,
    },
    {
        html: 'Address',
        order: 4,
    },
    {
        html: 'Options',
        order: 5,
    },
]

// set and build table headers
SuTablesIns.setHeaders(tableHeaders)
SuTablesIns.renderHeaders()
```

#### Step 5 - Create table rows

Creating table rows can be tricky at first, But don't worry its easy.

```javascript
// file: script.js

// iterate on persons data and build table rows
const tableRows = []
persons.forEach(person => {
    // create new table row
    const row = new Row()
    
    /*
        set row key attribute (<tr data-su-key="<YOUR_KEY>"></tr>)
        this can be useful to target this row later
     */
    row.key = person.id
    // set row custom css styling
    row.customStyle = 'font-size: 16px; white-space: nowrap;'

    // create id cell
    const idCell = new Cell()
    
    /*
        set row key attribute (<td data-su-key="id"></tr>)
        this can be useful to target this row later
     */
    idCell.key = 'id'
    // set cell html
    idCell.html = person.id
    // create cell onClick callback
    idCell.clickCallback = () => {
        console.log('clicked inside id cell')
    }

    // create name cell
    const nameCell = new Cell()
    nameCell.key = 'name'
    nameCell.html = person.name

    // create age cell
    const ageCell = new Cell()
    ageCell.key = 'age'
    ageCell.html = person.age

    // create job cell
    const jobCell = new Cell()
    jobCell.key = 'job'
    jobCell.html = person.job

    // create address cell
    const addressCell = new Cell()
    addressCell.key = 'address'
    addressCell.html = person.address

    // create change name button
    const btnChangeName = new Button()
    btnChangeName.innerHTML = 'Change Name'
    btnChangeName.classes = ['btn', 'btn-success', 'btn-sm']
    btnChangeName.callback = () => {
        // change name cell
        nameCell.html = 'New Name'
        // render is required to apply new changes
        SuTablesIns.renderRows()
    }

    // create get name button
    const btnGetName = new Button()
    btnGetName.innerHTML = 'Get Name'
    btnGetName.classes = ['btn', 'btn-success', 'btn-sm', 'mx-2']
    btnGetName.callback = () => {
        alert(nameCell.html)
    }

    // create options cell
    const optionsCell = new Cell()
    optionsCell.key = 'options'
    // pass created buttons element to the cell (requies to be passed in array)
    optionsCell.elements = [btnChangeName.getElm(), btnGetName.getElm()]

    // set row cells
    row.cells = [
        idCell.build(),
        nameCell.build(),
        ageCell.build(),
        jobCell.build(),
        addressCell.build(),
        optionsCell.build(),
    ]

    tableRows.push(row.build())
})
```

#### Step 6 - Rendering table rows

```javascript
// file: script.js

// set and build table rows
SuTablesIns.setRows(tableRows)
SuTablesIns.renderRows()
```
