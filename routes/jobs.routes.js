const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { JobModel } = require("../model/jobs.model");
const express = require("express");

const jobsRouter = express.Router();

jobsRouter.get("/", async (req,res) => {
  try {
    let data = await JobModel.find();
    res.send(data);
  } catch (err) {
    res.send("Something went wrong");
  }
});


jobsRouter.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let data = await JobModel.find({ _id: id });
    res.send(data);
  } catch (err) {
    res.send("Something went wrong");
  }
});

jobsRouter.post("/admin", async (req, res) => {
  let data = req.body;
  try {
    let job = new JobModel(data);
    await job.save();
    res.send("New Data Added");
  } catch (err) {
    res.send("Something went wrong while posting new job.");
  }
});

jobsRouter.patch("/admin/:id", async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  try {
    let job = await JobModel.findByIdAndUpdate({ _id: id }, data);
    res.send("Data updated");
  } catch (err) {
    res.send("something went wrong while updating");
  }
});

jobsRouter.delete("/admin/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await JobModel.findByIdAndDelete({ _id: id });
    res.send("Data deleted");
  } catch (err) {
    res.send("Something wrong while Deleting");
  }
});
module.exports = { jobsRouter };
