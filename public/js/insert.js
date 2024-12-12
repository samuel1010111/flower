'use strict';

(function() {

    let flowerIdField;
    let nameField;
    let unitPriceField;
    let stockField;
    let farmerField;
    let resultarea;

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        // Get elements by their ID
        resultarea = document.getElementById('resultarea');
        flowerIdField = document.getElementById('flowerId'); 
        nameField = document.getElementById('name');
        unitPriceField = document.getElementById('unitPrice');
        stockField = document.getElementById('stock');
        farmerField = document.getElementById('farmer');

        // Corrected the typo from getElementByflowerId to getElementById
        document.getElementById('submit').addEventListener('click', send);

        // Use flowerIdField (capital 'I') instead of floweridField
        flowerIdField.addEventListener('focus', clear);
    }

    function clear() {
        flowerIdField.value = ''; 
        nameField.value = '';      
        unitPriceField.value = ''; 
        stockField.value = '';     
        farmerField.value = '';    
        resultarea.textContent = ''; 
        resultarea.removeAttribute('class'); 
    }

    async function send() {
        const flower = {
            flowerId: +flowerIdField.value,  
            name: nameField.value,
            unitPrice: +unitPriceField.value,
            stock: +stockField.value,
            farmer: farmerField.value
        };

        try {
            const options = {
                method: 'POST',
                body: JSON.stringify(flower),
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors'
            };
            const response = await fetch('http://localhost:4000/api/flowers', options);
            const result = await response.json();

            updateStatus(result);
        } catch (err) {
            updateStatus({ message: err.message, type: 'error' });
        }
    }

    function updateStatus(status) {
        resultarea.textContent = status.message;
        resultarea.setAttribute('class', status.type);
    }

})();
