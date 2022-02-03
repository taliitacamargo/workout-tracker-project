const router = require("express").Router();
const Workout  = require("../models/Workout");



router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration " },
            },
        },
    ])
        .then((workout) => {
            // console.log(workout);
            res.json(workout);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
        .then((workout) => {
            res.json(workout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(
        req.params.id,
        {
            $push: {
                exercises: req.body
            },
        })
        .then((workout) => {
            res.json(workout)
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                },
            },
        },
    ])
        .sort({ day: "desc" })
        .limit(7)
        .sort({ day: "asc" })
        .then(workouts => {
            res.json(workouts)
        })
        .catch((err) => {
            res.status(400).json(err);
        })
});




module.exports = router;
