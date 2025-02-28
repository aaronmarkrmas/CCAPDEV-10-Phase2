const { Reply } = require('../CCAPDEV-10-Phase2/model/restaurant');

exports.deleteReply = async (req, res) => {
    try {
        const { replyId } = req.params;
        
        // find and delete the reply
        const deletedReply = await Reply.findOneAndDelete({ replyId });

        if (!deletedReply) {
            return res.status(404).json({ error: 'Reply not found' });
        }

        res.status(200).json({ message: 'Reply deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete reply' });
    }
};
