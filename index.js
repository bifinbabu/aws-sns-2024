// Import required AWS SDK modules for SNS (Simple Notification Service)
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

// Asynchronous function to send an SMS message using AWS SNS
async function sendSMSMessage(sns, params) {
  try {
    // Create a new PublishCommand with the specified parameters
    const command = new PublishCommand(params);

    // Send the SMS message using the SNS client and the created command
    const message = await sns.send(command);

    // Return the result of the message sending operation
    return message;
  } catch (error) {
    console.error("Error sending SMS message:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
}

// Main asynchronous function (IIFE) to send an SMS message
(async () => {
  try {
    // Define parameters for the SMS message
    const params = {
      Message: `Your OTP code is: ${Math.random().toString().substring(2, 8)}`, // Generate a 6-digit OTP code
      PhoneNumber: "+918075720035", // Recipient's phone number
      MessageAttributes: {
        "AWS.SNS.SMS.SenderID": {
          DataType: "String",
          StringValue: "String",
        },
      },
    };

    // Create an SNS client with the specified configuration
    const sns = new SNSClient({
      region: "ap-south-1", // AWS region from environment variables
      credentials: {
        accessKeyId: "", // AWS access key from environment variables
        secretAccessKey: "", // AWS secret key from environment variables
      },
    });

    // Send the SMS message using the defined SNS client and parameters
    const result = await sendSMSMessage(sns, params);
    console.log("SMS message sent successfully:", result);
  } catch (error) {
    console.error("Failed to send SMS message:", error);
  }
})();
