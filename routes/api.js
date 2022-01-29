const router = require("express").Router();
const Workout = require("../models/index");



router.get("/api/workouts", (req, res) => {
    Workout.aggregate9([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration"},
            },
        },
    ])
    .then((workout) => {
        res.json(workout);
    })
    .catch((err) => {
        res.json(err)
    });
});

router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
    .then((workout) => {
        res.json(workout);
    })
    .catch((err) => {
        res.json(err)
    });
});

