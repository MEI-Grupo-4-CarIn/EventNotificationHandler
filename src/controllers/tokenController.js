const Token = require("../frameworks/database/tokenModel");
const Logger = require("../frameworks//logging/logger");

class TokenController {
  async addToken(req, res) {
    const { userId, token } = req.body;

    if (!userId || !token) {
      return res.status(400).json({ message: "userId and token are required" });
    }

    try {
      let userTokens = await Token.findOne({ userId });

      if (userTokens) {
        if (!userTokens.tokens.includes(token)) {
          userTokens.tokens.push(token);
          await userTokens.save();
          Logger.info(`Token added for userId ${userId}: ${token}`);
        } else {
          Logger.info(`Token already exists for userId ${userId}: ${token}`);
        }
      } else {
        userTokens = new Token({ userId, tokens: [token] });
        await userTokens.save();
        Logger.info(`New user created and token added for userId ${userId}: ${token}`);
      }

      res.status(200).json({ message: "Token added successfully" });
    } catch (error) {
      Logger.error(`Error adding token for userId ${userId}: ${error.message}`, { stack: error.stack });
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = TokenController;
