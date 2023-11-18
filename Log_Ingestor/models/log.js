const mongoose = require("mongoose");
const logScheme = new mongoose.Schema({
  level: String,
  message: String,
  resourceId: String,
  timestamp: Date,
  traceId: String,
  spanId: String,
  commit: String,
  metadata: {
    parentResourceId: String,
  }
});
const Log = mongoose.model("Log", logScheme);

//text index for $text query
logScheme.index({ "$**": "text" });
module.exports = Log;