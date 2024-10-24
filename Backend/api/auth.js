const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
const config = require('config');
const User = require('../models/User');
const Company = require('../models/Company');
const Admin = require('../models/Admin')
const service = require('../models/Service');
const AuctionModel = require('../models/Auction');
const ClearedList = require('../models/ClearedList');
// const service = require('../models/Service')
const { encryption } = require('../middleware/hasing')
// const gravatar = require('gravatar');
// const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const { response } = require('express');
const RoomModel = require('../models/AuctionRoom');
// const { default: Service } = require('../../src/Components/ServicePage/Service');
// router.get('/get',(req,res)=>{res.send("server is running")});
router.get('/', auth, async (req, res) => {
    try {
        const User = await User.findById(req.user.id).select('-password');
        const Company = await Company.findById(req.user.id).select('-password');
        if (req.session.email) {
            res.status(200).send({ loggedIn: true });
        }
        // else if(Company){
        //     res.status(200).send({ loggedIn: true,UserType:Company });

        // }
        else {
            res.status(200).send({ loggedIn: false });
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error');
    }
});
// router.get('/',auth,async (req,res)=>{
//     try{
//         const User = await User.findById(req.user.id).select('-password');
//     } catch(err){
//         console.error(err.message)
//         res.status(500).send('Server Error');

//     }
// });

// [
//     check("email","plz enter valid email").isEmail(),
//     check("password","enter pass more than 4 letters").exists()
// ]

// router.post('/',async (req,res)=>{
//     const errors =validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()});
//     }

//     // console.log(req.body);

//     const {email,password}= req.body;
//     try{
//         let user = await User.findOne({email:email});
//         let company= await Company.findOne({email:email});

//         if(!user && !Company){
//             res.status(400).json({errors:[{msg:'Invalid User'}]});
//         }
//         const isMatch = password === user.password;

//         // const isMatch =await bcrypt.compare(password,user.password);
//         if(!isMatch){
//             res.status(400).json({errors:[{msg:'Invalid Credential'}]});
//         }
//         const payload ={
//             user:{
//                 id : user.id
//             }
//         }

//         jwt.sign(
//             payload,
//             config.get('jwtToken'),
//             {expiresIn:360000},
//             (err,token)=>{
//                 if(err){
//                     throw err;
//                 }
//                 res.json({token});
//             }
//             )
//     }catch(err){console.error(err.message);
//         res.status(500).send('Server Error');
//     }    
// });
router.post('/', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // console.log(req.body);

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (!user) {
            res.status(400).json({ errors: [{ msg: 'Invalid User' }] });
        }
        const isMatch = (password === user.password);

        // const isMatch =await bcrypt.compare(password,user.password);
        if (!isMatch) {
            res.status(400).json({ errors: [{ msg: 'Invalid Credential' }] });
        }
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtToken'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) {
                    throw err;
                }
                res.json({ token });
            }
        )
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/SignUpFarmer', encryption, async (req, res) => {
    try {
        console.log(req.body);
        const EmailExist = await User.findOne({ email: req.body.email });
        if (EmailExist) return res.status(200).send("Email exist");
        else {

            const newUser = await User.create({
                name: req.body.name,
                mobileno: req.body.mobileno,
                email: req.body.email,
                password: req.body.password,
                // userType: req.body.type
            });
            // console.log("Printed"); 
            console.log(newUser);
            if (newUser) {
                res.json({ success: true, msg: "successfully created company." })
            }
            else {
                res.status(401).json({ success: false, msg: "company is not created." })
            }
            // newUser.save();
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error');

    }
});
router.post('/SignUpCompany', encryption, async (req, res) => {
    try {
        // console.log(req.body);
        const EmailExist = await Company.findOne({ email: req.body.email });
        if (EmailExist) return res.status(200).send("Email exist");
        else {
            const newCom = await Company.create({
                name: req.body.name,
                mobileno: req.body.mobileno,
                email: req.body.email,
                password: req.body.password,
                // userType: req.body.type
            });
            console.log("Printed", newCom);
            if (newCom) {
                res.json({ success: true, msg: "successfully created company." })
            }
            else {
                res.status(401).json({ success: false, msg: "company is not created." })
            }

            // newCom.save().then((result) => {
            //     console.log("Saved");
            //     res.redirect('/');
            // }).catch(err => res.status(300).send(err));
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error');

    }
});
router.post('/SignUpAdmin', encryption, async (req, res) => {
    try {
        console.log(req.body);
        const EmailExist = await Admin.findOne({ email: req.body.email });
        if (EmailExist) return res.status(200).send("Email exist");
        else {
            const newAd = await Admin.create({
                name: req.body.name,
                mobileno: req.body.mobileno,
                email: req.body.email,
                password: req.body.password,
                // userType: req.body.type
            });
            console.log("Printed", newAd);
            if (newAd) {
                res.json({ success: true, msg: "successfully created Admin." })
            }
            else {
                res.status(401).json({ success: false, msg: "Admin is not created." })
            }

            //     newAd.save().then((result) => {
            //         console.log("Saved");
            //         res.redirect('/');
            //     }).catch(err => res.status(300).send(err));
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error');
    }
});
// router.login('/LoginFarmer',async(req,res)=>{
//     try{
//         console.log(req.body);
//         const EmailExist = await User.findOne({ email: req.body.email });
//         if(EmailExist){
// Login route for Farmer
router.post("/LoginFarmer", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user && await bcrypt.compare(password, user.password)) {
        const payload = {
            user: {
                id: user._id,
                email: user.email,
                type: "Farmer"
            }
        };

        jwt.sign(
            payload,
            config.get('jwtToken'),
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
                res.status(200).json({
                    success: true,
                    message: `Hello ${user.name}, You Logged in successfully!`,
                    name: user.name,
                    type: "Farmer"
                });
            }
        );
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

// Login route for Company
router.post("/LoginCompany", async (req, res) => {
    const { email, password } = req.body;
    const company = await Company.findOne({ email: email });

    if (company && await bcrypt.compare(password, company.password)) {
        const payload = {
            user: {
                id: company._id,
                email: company.email,
                type: "Company"
            }
        };

        jwt.sign(
            payload,
            config.get('jwtToken'),
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
                res.status(200).json({
                    success: true,
                    message: `Hello ${company.name}, You Logged in successfully!`,
                    name: company.name,
                    type: "Company"
                });
            }
        );
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

// Login route for Admin
router.post("/LoginAdmin", async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });

    if (admin && await bcrypt.compare(password, admin.password)) {
        const payload = {
            user: {
                id: admin._id,
                email: admin.email,
                type: "Admin"
            }
        };

        jwt.sign(
            payload,
            config.get('jwtToken'),
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
                res.status(200).json({
                    success: true,
                    message: `Hello ${admin.name}, You Logged in successfully!`,
                    name: admin.name,
                    type: "Admin"
                });
            }
        );
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});


// Service request route (protected)
router.post("/Service", auth, async (req, res) => {
    try {
        const EmailExist = await service.findOne({ email: req.user.email });
        if (EmailExist) {
            return res.status(400).json({ success: false, msg: "Already Requested!!!" });
        } else {
            const newSer = await service.create({
                email: req.user.email,
                mobileno: req.body.mobileno,
                acre: req.body.acre,
                ptype: req.body.ptype,
                date1: req.body.date1,
                du1: req.body.du1,
                du2: req.body.du2,
                type: req.body.type,
                mtype: JSON.stringify(req.body.mtype),
            });

            if (newSer) {
                res.json({ success: true, msg: "Successfully requested for harvesting." });
            } else {
                res.status(400).json({ success: false, msg: "Request is not accepted." });
            }
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
});

// Create Room route (protected, admin only)
router.post('/CreateRoom', auth, async (req, res) => {
    try {
        const NameExist = await RoomModel.findOne({ Name: req.body.Name });
        if (NameExist) {
            return res.status(400).json({ success: false, msg: "Room already exists!" });
        }

        const createRoom = await RoomModel.create({
            Name: req.body.Name,
            description: req.body.description,
            Code: req.body.Code,
            StartBid: req.body.StartBid,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
        });

        if (createRoom) {
            let data = await AuctionModel.create({
                Bid: req.body.StartBid,
                Room: req.body.Code,
                User: "Admin"
            });
            res.json({ success: true, msg: "Successfully created room for the Auction." });
        } else {
            res.status(400).json({ success: false, msg: "Room is not created." });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Admin Home route (protected, admin only)
router.get("/AdminHome", auth, async (req, res) => {
    try {
        const currentDate = new Date();
        const room = await RoomModel.find({ endDate: { $gt: currentDate } });
        const Service = await service.find({});

        if (room && Service) {
            res.status(200).json({ room, Service });
        } else {
            res.status(404).json({ message: "Not Found!" });
        }
    } catch (e) {
        console.log("Error->", e);
        res.status(500).send('Server Error');
    }
});               


router.post('/ClearReqForm', async (req, res) => {
    try {
          console.log("service req body", req.body);
          // const user = await Admin.findOne({email:req.body.email });
          const Service = await service.findOne({ email: req.body.email });
          console.log(Service + "db service acceass");
          const ReqExist = req.body.email;
          console.log(ReqExist + "this is request email");
          // if(user){
          if (!ReqExist) return res.status(200).send("No such request exists!!!");
          else {

                const ClearList = await ClearedList.create({
                      email: req.body.email,
                      tResidue: req.body.tResidue,
                      tgrain: req.body.tgrain,
                      sdate: req.body.sdate

                      // userType: req.body.type
                });
                await Service.remove({
                      email: req.body.email,


                      // userType: req.body.type
                });
                // console.log("Printed",newSer);
                if (ClearList) {
                      res.json({ success: true, msg: "Request is successfully removed from Pending Requests && added to ClearedList.." })
                }
                else {
                      res.status(401).json({ success: false, msg: "Request is still in pendingList." })
                }
                // newCom.save().then((result) => {
                //     console.log("Saved");
                //     res.redirect('/');
                // }).catch(err => res.status(300).send(err));
          }

    } catch (err) {
          console.error(err.message)
          res.status(500).send('Server Error');

    }
});

module.exports = router;