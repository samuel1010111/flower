'use strict';

(function () {
    let flowerIdField, nameField, unitPriceField, stockField, farmerField, resultArea, searchButton, updateButton, formFields;

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        // Get elements by their ID
        flowerIdField = document.getElementById('flowerId');
        nameField = document.getElementById('name');
        unitPriceField = document.getElementById('unitPrice');
        stockField = document.getElementById('stock');
        farmerField = document.getElementById('farmer');
        resultArea = document.getElementById('resultarea');
        searchButton = document.getElementById('submit');
        updateButton = document.getElementById('update');
        formFields = document.getElementById('formFields');

        // Attach event listeners
        searchButton.addEventListener('click', searchFlower);
        updateButton.addEventListener('click', updateFlower);
        document.getElementById('clear').addEventListener('click', clearFields);
        document.getElementById('home').addEventListener('click', goHome);
    }

    async function searchFlower() {
        const key = document.getElementById('keylist').value;
        const value = document.getElementById('searchvalue').value.trim();

        if (!value) {
            updateStatus('Please enter a search value.', 'error');
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/api/flowers/${key}/${value}`);
            if (!response.ok) throw new Error('Failed to fetch data');
            const result = await response.json();

            if (result.length > 0) {
                populateFields(result[0]);
                formFields.classList.remove('hidden');
                updateButton.classList.remove('hidden');
                updateStatus('Flower found.', 'success');
            } else {
                updateStatus('No matching flower found.', 'error');
            }
        } catch (err) {
            updateStatus(`Error: ${err.message}`, 'error');
        }
    }

    function populateFields(flower) {
        flowerIdField.value = flower.flowerId || '';
        nameField.value = flower.name || '';
        unitPriceField.value = flower.unitPrice || '';
        stockField.value = flower.stock || '';
        farmerField.value = flower.farmer || '';
    }

    async function updateFlower() {
        const flower = {
            flowerId: +flowerIdField.value,
            name: nameField.value,
            unitPrice: +unitPriceField.value,
            stock: +stockField.value,
            farmer: farmerField.value
        };

        try {
            const options = {
                method: 'PUT',
                body: JSON.stringify(flower),
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors'
            };

            const response = await fetch('http://localhost:4000/api/flowers', options);
            if (!response.ok) throw new Error('SUCESS UPDATED');
            const result = await response.json();

            if (result.message) {
                updateStatus(result.message, 'success');
            } else {
                updateStatus('Your data is updated successfully.', 'success');
            }

            clearFields(); // Clear fields after successful update
        } catch (err) {
            updateStatus(`Error: ${err.message}`, 'error');
        }
    }

    function updateStatus(message, type) {
        resultArea.textContent = message;
        resultArea.setAttribute('class', type);
    }

    function clearFields() {
        document.getElementById('searchvalue').value = '';
        flowerIdField.value = '';
        nameField.value = '';
        unitPriceField.value = '';
        stockField.value = '';
        farmerField.value = '';
        formFields.classList.add('hidden');
        updateButton.classList.add('hidden');
        updateStatus('', '');
    }

    function goHome() {
        window.location.href = '/';
    }

})();
