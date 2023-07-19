import SuTables from './libs/SuTables/SuTables.js';
import Button from './libs/SuTables/elements/Button.js';

const SuTablesIns = new SuTables('myTable');

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
        html: 'Phone',
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

const testBtn = new Button()
testBtn.innerHTML = 'Hello <strong>World</strong>'
testBtn.classes = ['btn', 'btn-success']
testBtn.callback = () => {
    tableRows[0]['cells'][0]['html'] = parseInt(tableRows[0]['cells'][0]['html']) + 1
    SuTablesIns.setRows(tableRows)
    SuTablesIns.renderRows()
    console.log('clicked')
}

const tableRows = [
    {
        order: 0,
        customStyle: 'font-size: 16px;',
        cells: [
            {
                html: '0',
                order: 0,
            },
            {
                html: 'Suleiman',
                order: 1,
            },
            {
                html: '26',
                order: 2,
            },
            {
                html: '052-870-5533',
                order: 3,
            },
            {
                html: 'Bueina-Nujedat',
                order: 4,
            },
            {
                classes: ['text-center'],
                html: testBtn.getElm(),
                order: 4,
                onClick: () => {
                    // tableRows[0]['cells'][0]['html'] = parseInt(tableRows[0]['cells'][0]['html']) + 1
                    // SuTablesIns.setRows(tableRows)
                    // SuTablesIns.renderRows()
                    // console.log('clicked')
                }
            },
        ]
    },
]




SuTablesIns.setHeaders(tableHeaders)
SuTablesIns.renderHeaders()
SuTablesIns.setRows(tableRows)
SuTablesIns.renderRows()
