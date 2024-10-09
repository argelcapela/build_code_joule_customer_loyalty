/**
 * 
 * @On(event = { "CREATE" }, entity = "testejouleSrv.Redemptions")
 * @param {Object} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function(request) {
    const { Redemptions, Customers } = cds.entities;

    // Extract the redemption data from the request
    const { customer_ID, redeemedAmount } = request.data;

    // Ensure the customer_ID and redeemedAmount are defined
    if (!customer_ID || redeemedAmount === undefined) {
        return request.error(400, 'Customer ID and redeemed amount must be provided.');
    }

    // Fetch the customer record
    const customer = await SELECT.one.from(Customers).where({ ID: customer_ID });

    // Ensure the customer exists
    if (!customer) {
        return request.error(404, 'Customer not found.');
    }

    // Calculate the new total reward points and total redeemed reward points
    const newTotalRewardPoints = customer.totalRewardPoints - redeemedAmount;
    const newTotalRedeemedRewardPoints = customer.totalRedeemedRewardPoints + redeemedAmount;

    // Ensure the customer has enough reward points to redeem
    if (newTotalRewardPoints < 0) {
        return request.error(400, 'Insufficient reward points.');
    }

    // Update the customer's reward points
    customer.totalRewardPoints = newTotalRewardPoints;
    customer.totalRedeemedRewardPoints = newTotalRedeemedRewardPoints;

    // Update the customer record in the database
    await UPDATE(Customers).set({
        totalRewardPoints: newTotalRewardPoints,
        totalRedeemedRewardPoints: newTotalRedeemedRewardPoints
    }).where({ ID: customer_ID });
};