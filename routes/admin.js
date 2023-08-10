const router = require('express').Router()
const passport = require("passport")
const { Admin, Patients } = require("../models")


router.get('/', (req, res) => {
    res.render('adminLogin.ejs')
})

router.post('/', (req, res) => {
    // console.log(req.body);
    // console.log(req.body.username);
    // console.log(req.body.password);
    // Admin.register({ username: req.body.username }, req.body.password)
    //     .then((admin) => {
    //         passport.authenticate("local")(req, res, () => {
    //             res.redirect('/')
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })

    const admin = new Admin({
        username: req.body.username,
        password: req.body.password
    })

    req.login(admin, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/api/admin/home")
            })
        }
    })


})

router.get('/home', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("home.ejs")
    }
    else {
        res.redirect("/")
    }
})

router.get("/register", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("registerPatient.ejs")
    } else {
        res.redirect('/')
    }
})

router.post('/register', (req, res) => {
    const patient = new Patients(req.body)
    patient.save().then(() => {
        res.render("success.ejs", {
            subTitle: "Success",
            subject: "added"
        })
    })
})

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/')
        }
    })
})

router.get("/view", async(req, res) => {
    const patients = await Patients.find();
    if (req.isAuthenticated()) {
        res.render("viewlist.ejs", {
            option: "Search",
            buttonName: "search",
            url: "search",
            patients: patients 
        })
    }
    else {
       // res.render("/")
    }
})
router.get("/search", async(req, res) => {
    const patients = await Patients.find();
    if (req.isAuthenticated()) {
        res.render("search.ejs", {
            option: "Search",
            buttonName: "search",
            url: "search",
            patients: patients 
        })
    }
    else {
       // res.render("/")
    }
})

// router.post("/search", (req, res) => {
//     Patients.findOne({ patient_id: req.body.patient_id }).then((data) => {
//         if (data) {
//             res.render("searchResults.ejs", data)
//         }
//         else {
//             res.render("searchFailure.ejs", {
//                 url: "search"
//             })
//         }
//     })
// })
router.post("/search", async (req, res) => {
    try {
        const data = await Patients.findOne({ patient_id: req.body.patient_id });
        console.log(data);
        if (data) {
            //res.render("searchResults.ejs", data);
            res.render("result.ejs", {
                option: "Update",
                buttonName: "update",
                url: "update",
                patient:data
            });
        } else {
            res.render("searchFailure.ejs", {
                url: "search"
            });
        }
    } catch (error) {
        console.error(error);
        res.json({ msg: error.message });
    }
});



router.get("/update/:patient_id", async(req, res) => {
    // Use req.params.patient_id to access the patient ID from the URL
    const patientId = req.params.patient_id;
    const patient = await Patients.findOne({ _id: patientId });
    if (req.isAuthenticated()) {
        res.render("updatepage", {
            option: "Update",
            buttonName: "update",
            url: "update",
            patientId: patientId, // Pass the patient ID to the view
            patient:patient
        });
    } else {
        res.redirect('/');
    }
});


router.post('/update', async (req, res) => {
    try {
        const updatedPatient = await Patients.findOneAndUpdate(
            { patient_id: req.body.id },
            req.body,
            { new: true } // To return the updated data
        );

        if (updatedPatient) {
            res.render("success.ejs", {
                subTitle: "Updated",
                subject: "update"
            });
        } else {
            res.render('searchFailure', {
                url: "update"
            });
        }
    } catch (error) {
        console.error(error);
        res.json({ msg: error.message }); // Send error message as JSON response
    }
});





router.get("/delete:id", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("search.ejs", {
            option: "Delete",
            buttonName: "Delete",
            url: "delete"
        })
    }
    else {
        res.redirect('/')
    }
})

router.post('/delete/:id', async (req, res) => {
    try {
        const patientId = req.params.id;
        const deletedPatient = await Patients.findOneAndDelete({ _id: patientId });

        if (deletedPatient) {
            res.render("success.ejs", {
                subTitle: "Deleted",
                subject: "delete"
            });
        } else {
            // res.render('searchFailure', {
            //     url: "delete"
            // });
        }
    } catch (error) {
        console.error(error);
        res.json({ msg: error.message });
    }
});




module.exports = router