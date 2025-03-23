const Report = require('../model/report');
const Review = require('../model/review');
const Customer = require('../model/customer');
const Restaurant = require('../model/restaurant'); 

exports.getDetailedView = async (req, res) => {
  try {
    const reports = await Report.find({});
    const detailedReports = [];

    for (const report of reports) {
      const review = await Review.findById(report.postId);
      if (!review) continue;
      console.log("🔍 Review restaurantId:", review.restaurantId);
      const customer = await Customer.findOne({ email: review.customerEmail });
      const reporter = await Customer.findOne({ email: report.reporterEmail });
      const restaurant = await Restaurant.findById(review.restaurantId);
      console.log("🍽️ Fetched restaurant:", restaurant);
      const formattedDate = new Date(review.datePosted).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      detailedReports.push({
        _id: report._id,
        reason: report.reason,
        dateReported: report.dateReported,
        isResolved: report.isResolved,
        review: {
          _id: review._id,
          rating: review.rating,
          reviewTitle: review.reviewTitle,
          reviewText: review.reviewText,
          datePosted: review.datePosted,
          dateFormatted: formattedDate,
          media: review.media || [],
        },
        customer: {
          username: customer?.username || "Unknown",
          pfp: customer?.pfp || null,
        },
        reporter: {
          email: report.reporterEmail,
          username: reporter?.username || "Unknown Reporter"
        },
        restaurant: {
          
          name: restaurant?.restoName || "Unknown Restaurant"
        },
        reporterEmail: report.reporterEmail
      });
    }
    

  

    const noReports = detailedReports.length === 0;

    res.render("adminDetailedReports", {
      reports: detailedReports,
      adminId: req.params.adminId,
      noReports
    });

  } catch (err) {
    console.error("Error loading detailed reports:", err);
    res.status(500).send("Server error");
  }
};

