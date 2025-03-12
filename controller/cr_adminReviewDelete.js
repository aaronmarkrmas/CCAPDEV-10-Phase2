// controllers/adminReviewController.js

const Review = require('../model/review');

/**
 * POST /admin/:adminId/reviews/:reviewId/delete
 * - Deletes a specific review from the DB.
 */
exports.deleteReview = async (req, res) => {
  try {
    const { adminId, reviewId } = req.params;

    // Remove the review from the database
    await Review.findByIdAndDelete(reviewId);

    // Redirect back to the previous page (or a specific page)
    res.redirect('back');
    // or res.redirect(`/admin/${adminId}/somewhere`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
