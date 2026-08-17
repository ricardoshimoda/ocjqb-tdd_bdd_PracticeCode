const { Given } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');

Given('the following pets', async function (dataTable) {
    try{
        // First, get all existing pets and Delete all existing pets
        const response = await axios.get(`${this.baseUrl}/pets`);
        assert.strictEqual(response.status, 200);

        for (const pet of response.data) {
            const deleteResponse = await axios.delete(`${this.baseUrl}/pets/${pet.id}`);
            assert.strictEqual(deleteResponse.status, 204);
        }

        // Load the database with new pets from the data table
        for (const row of dataTable.hashes()) {
            const payload = {
                name: row.name,
                category: row.category,
                available: ['True', 'true', '1'].includes(row.available),
                gender: row.gender,
                birthday: row.birthday
            };

            const postResponse = await axios.post(`${this.baseUrl}/pets`, payload);
            assert.strictEqual(postResponse.status, 201);
        }
    } catch (error) {
        console.error('Error in loading test data:', error.message);
        throw error;
    }
  // Add try catch
});
