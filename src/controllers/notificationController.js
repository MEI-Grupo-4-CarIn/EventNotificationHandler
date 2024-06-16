const admin = require("../frameworks/firebase");
const Token = require("../frameworks/database/tokenModel");
const Logger = require("../frameworks/logging/logger");

const processMessage = async (msg) => {
  const { userId, title, body } = JSON.parse(msg.content.toString());

  if (!userId || !title || !body) {
    Logger.error("Invalid message format. userId, title, and body are required.");
    return;
  }

  try {
    const user = await Token.findOne({ userId });

    if (user) {
      const tokens = user.tokens;
      const payload = {
        notification: {
          title: title,
          body: body,
        },
      };

      const multicastMessage = {
        tokens: tokens,
        notification: payload.notification,
      };

      const response = await admin.messaging().sendEachForMulticast(multicastMessage);

      const tokensToRemove = [];
      response.responses.forEach((result, index) => {
        const error = result.error;
        if (error) {
          Logger.error(`Error sending message to token ${tokens[index]}: ${error.message}`, { stack: error.stack });
          if (error.code === "messaging/invalid-registration-token" || error.code === "messaging/registration-token-not-registered") {
            tokensToRemove.push(tokens[index]);
          }
        }
      });

      if (tokensToRemove.length > 0) {
        await Token.updateOne({ userId }, { $pull: { tokens: { $in: tokensToRemove } } });
        Logger.info(`Removed invalid tokens for userId ${userId}:`, { tokens: tokensToRemove });
      }
    } else {
      Logger.info(`No tokens found for userId ${userId}`);
    }
  } catch (err) {
    Logger.error(`Error processing message for userId ${userId}: ${err.message}`, { stack: err.stack });
  }
};

module.exports = { processMessage };
