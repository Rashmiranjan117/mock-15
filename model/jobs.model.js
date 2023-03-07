const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  name: String,
  position: String,
  contract: String,
  location: String,
});

const JobModel = mongoose.model("job", jobSchema);

module.exports = { JobModel };
