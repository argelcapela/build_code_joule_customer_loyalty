/**
 * 
 * @Before(event = { "CREATE" }, entity = "testejouleSrv.Purchases")
 * @param {Object} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(request) {
    const { Products, Customers } = cds.entities;

    // Extract the purchase data from the request
    const purchaseData = request.data;

    // Fetch the selected product to get the price
    const product = await SELECT.one.from(Products).where({ ID: purchaseData.selectedProduct_ID });

    if (product) {
        // Set the purchase value based on the product price
        purchaseData.purchaseValue = product.price;

        // Calculate reward points (one tenth of the purchase value)
        const rewardPoints = Math.floor(product.price / 10);

        // Update the purchase data with calculated reward points
        purchaseData.rewardPoints = rewardPoints;
    }

    // Fetch the related customer
    const customer = await SELECT.one.from(Customers).where({ ID: purchaseData.customer_ID });

    if (customer) {
        // Update the customer's total purchase value and total reward points
        customer.totalPurchaseValue += purchaseData.purchaseValue;
        customer.totalRewardPoints += purchaseData.rewardPoints;

        // Update the customer entity
        await UPDATE(Customers).set({
            totalPurchaseValue: customer.totalPurchaseValue,
            totalRewardPoints: customer.totalRewardPoints
        }).where({ ID: customer.ID });
    }
};