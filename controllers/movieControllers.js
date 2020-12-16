const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const movie = require("../models/movies.js");

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Create all our routes and set up logic within those routes where required.
router.get("/api/movies", function(req, res) {
  movie.all(function(data) {
    res.json({ burger: data });
  });
});

router.post("/movies", function(req, res) {
  movie.create([
    "name", "sleepy"
  ], [
    req.body.name, req.body.sleepy
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/movies/:id", function(req, res) {
const obect = {deleted: req.body.devout}

  movie.update(obect, "id", req.params.id, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.json({ id: req.params.id});
    }
  });
});

router.delete("/movies/:id", function(req, res) {
  

  movie.delete(req.params.id, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
