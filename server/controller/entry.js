const Entry = require('../Models/Entry.js');

const submitEntry = async (req, res) => {
    try {
        // Parse the uploaded images from the request
        console.log(req.files.uploaded_images)
        console.log(req.body.name)
        // console.log(req.files.other_images)
        const uploadedImages = req.files.uploaded_images.map(file => ({
            data: file.buffer,
            contentType: file.mimetype
        }));
        // let otherImages = [];

        // if (Array.isArray(req.body.other_images)) {
        // otherImages = req.body.other_images.map(url => ({ url }));
        // } else if (typeof req.body.other_images === 'string') {
        // otherImages = [{ url: req.body.other_images }];
        // }
        const newEntry = await Entry.create({
            name: req.body.name,
            num_of_products_used: req.body.num_of_products_used,
            uploaded_images: uploadedImages,
            products_links: req.body.products_links, 
            // other_images: otherImages,
            // upvotes: req.body.upvotes || 0
        });

        res.status(201).json({
            success: true,
            message: "Entry submitted successfully",
            data: newEntry,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Entry could not be submitted",
            error: error.message,
        });
    }
};

module.exports = { submitEntry };