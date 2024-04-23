
function extractDetails(message) {
    console.log(message)
    if (!message.toLowerCase().includes("credited")){
        return {}; // Return empty object if the message is not a credit message
    }
    // Regular expression to match the UTR number (12 digits)
    const utrRegex = /\b\d{12}\b/;
    // Regular expression to match the amount (assuming it may include commas and decimal points)
    const amountRegex = /(?:Rs\.|INR)\s?(\d{1,3}(?:,\d{3})*)(\.\d+)?/;
    // Extracting UTR number
    const utrMatch = message.match(utrRegex);
    const utrNumber = utrMatch ? utrMatch[0] : undefined;
    // Extracting Amount
    const amountMatch = message.match(amountRegex);
    const amount = amountMatch ? amountMatch[1].replace(/,/g, '') : undefined; // Remove commas for standardization

    return {
        utrNumber: utrNumber,
        amount: amount ? parseFloat(amount) : undefined // Convert to number
    };
}

module.exports = {
    extractDetails
}