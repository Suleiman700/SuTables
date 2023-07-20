import SuTables from './libs/SuTables/SuTables.js';
import Button from './libs/SuTables/elements/Button.js';
import Row from './libs/SuTables/fields/Row.js';
import Cell from './libs/SuTables/fields/Cell.js';

// your data (array of objects)
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

// create new instance by passing table id
const SuTablesIns = new SuTables('simple-table');

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

// iterate on persons and build table rows
const tableRows = []
persons.forEach(person => {
    // create table row
    const firstRow = new Row()
    firstRow.key = person.id
    firstRow.customStyle = 'font-size: 16px;'

    // create id cell
    const idCell = new Cell()
    idCell.key = 'id'
    idCell.html = person.id
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

    // create button
    const testBtn = new Button()
    testBtn.innerHTML = 'Get Name'
    testBtn.classes = ['btn', 'btn-success']
    testBtn.callback = () => {
        nameCell.html = 'New Name'

        // render is required to apply new changes
        SuTablesIns.renderRows()
    }

    // create options cell
    const optionsCell = new Cell()
    optionsCell.key = 'options'
    optionsCell.html = testBtn.getElm()

    // set row cells
    firstRow.cells = [
        idCell.build(),
        nameCell.build(),
        ageCell.build(),
        jobCell.build(),
        addressCell.build(),
        optionsCell.build(),
    ]

    tableRows.push(firstRow.build())
})

// set and build table rows
SuTablesIns.setRows(tableRows)
SuTablesIns.renderRows()
