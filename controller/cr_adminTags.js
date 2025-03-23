const Tag = require("../model/tag");

// FETCH TAGS PAGE
exports.getManageTagsPage = async (req, res) => {
    try {
      const tagDocs = await Tag.find({}, "_id"); // Fetch only _id
      const tags = tagDocs.map(tag => tag._id); // Extract the string values
  
      res.render("adminTags", { tags, adminId: req.params.adminId });
    } catch (err) {
      console.error("Error loading tags:", err);
      res.status(500).send("Error loading tags.");
    }
  };

// ADD A TAG
exports.addTag = async (req, res) => {
    try {
        const { tag } = req.body;

        if (!tag || tag.trim() === "") {
            return res.status(400).send("Tag cannot be empty.");
        }

        // Check if tag exists
        const existingTag = await Tag.findById(tag.trim());
        if (existingTag) {
            return res.status(400).send("Tag already exists.");
        }

        // Create the tag
        await Tag.create({ _id: tag.trim() });
        res.sendStatus(200);
    } catch (err) {
        console.error("Error adding tag:", err);
        res.status(500).send("Error adding tag.");
    }
};

// DELETE A TAG
exports.deleteTag = async (req, res) => {
    try {
        const { tag } = req.body;

        if (!tag) {
            return res.status(400).send("Invalid tag.");
        }

        await Tag.deleteOne({ _id: tag }); // Delete tag by ID
        res.sendStatus(200);
    } catch (err) {
        console.error("Error deleting tag:", err);
        res.status(500).send("Error deleting tag.");
    }
};
