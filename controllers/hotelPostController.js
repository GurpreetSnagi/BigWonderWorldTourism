const { v4: uuidv4 } = require('uuid');
const Hotel = require("../models/hotel");
const Application = require("../models/Application");

const postHotelView = (req, res) => {

    res.render("postHotel", {
      user: req.user
    });
  };
  
  // Handle form submission

  const submitNewHotel =  async (req, res) => {
    const { title, city, description, country, type, price } = req.body;
  
    // if (!name || !email || !password || !confirm) {
    //   return res.render('register', {error: 'Please enter all fields.'});
    // }
    const hotel = new Hotel({
        id: uuidv4(),
        title: title,
        city: city,
        description: description,
        country: country,
        type: type,
        price: price,
        creatorName: req.user.name,
        creatorEmail: req.user.email
      });
    
      try {
        await hotel.save();
        console.log("Hotel saved");
        res.redirect('/create-hotel-success');
      } catch (error) {
        res.status(500).send(error);
      }
  };

  const submitHotelSuccess = (req, res) => {

    res.render("jobPostSuccess", {
        message: "Hotel is posted successfully",
        user: req.user
    });
  };

  const myPostingsView = async (req, res) => {
    try {
        const email = req.user.email;
        const jobPostings =  await Job.find({ creatorEmail: email });
        //console.log(jobPostings)
        res.render("viewMyPostings", {
            jobPostings: jobPostings,
            user: req.user
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    
  };

  

  
  module.exports = {
    postHotelView,
    submitNewHotel,
    submitHotelSuccess,
    myPostingsView
  };
  