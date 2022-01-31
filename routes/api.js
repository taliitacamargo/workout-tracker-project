const router = require("express").Router();
const { Workout } = require("../models/index");



router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
            },
        },
    ])
        .then((workout) => {
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
    Workout.updateOne(req.body, {
        where: {
            id: req.params.id
        },
    })
        .then(workoutData => {
            if (!workoutData) {
                res.status(404).json(err);
                return;
            }
            res.json(workoutData)
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// router.delete("/api/workouts/:id", async (req, res) => {
//     try{
//     const workoutData = await Workout.destroy({
//         where: {
//              id: req.params.id 
//             }
//     });
//     if (!workoutData) {
//         res.status(404).json(err)
//         return;
//     }
//     res.status(200).json("success");
// })
//     .catch(err => {
//         res.status(500).json(err);
//     });


module.exports = router;
