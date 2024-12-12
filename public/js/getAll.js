'use strict';

(function() {

    document.addEventListener('DOMContentLoaded', init);

    async function init() {
        try {
            // Fetch flower data from the specified endpoint
            const response = await fetch('http://localhost:4000/api/flowers', { mode: 'cors' });
            const result = await response.json();

            // Get the table body element where the flower data will be displayed
            const resultset = document.getElementById('resultset');

            // Iterate over each flower and create a table row
            for (const flower of result) {
                const tr = document.createElement('tr');
                tr.appendChild(createCell(flower.flowerId));  
                tr.appendChild(createCell(flower.name));
                tr.appendChild(createCell(flower.unitPrice));
                tr.appendChild(createCell(flower.stock));
                tr.appendChild(createCell(flower.farmer));   
                resultset.appendChild(tr);
            }
        } catch (err) {
            console.error('Error fetching flower data:', err);
        }
    } // end of init

    function createCell(data) {
        const td = document.createElement('td');
        td.textContent = data !== undefined ? data : 'N/A'; 
        return td;
    }

})();
