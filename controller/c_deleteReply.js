const { replies } = require("../model/reply");

exports.deleteReply = async (req, res) => {
    try {
        const { reviewId } = req.params;

        // Find and delete the reply
        const deletedReply = await replies.findOneAndDelete({ reviewId });

        if (!deletedReply) {
            return res.status(404).json({ error: "Reply not found" });
        }

        console.log("Reply deleted:", deletedReply);
        res.status(200).json({ message: "Reply deleted successfully" });
    } catch (error) {
        console.error("Error deleting reply:", error);
        res.status(500).json({ error: "Failed to delete reply" });
    }
};
