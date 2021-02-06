const express = require("express");

/**
 * API Root Router instance
 */

const rootRouter = express.Router();

/**
 * Register sub routes
 */
rootRouter.use("/breakdown", require("./breakdown"));

/**
 * Endpoint for unmatched routes
 */
rootRouter.use((req, res) => {
  res.sendStatus(404);
});


module.exports = rootRouter;