const Entry = require('../Models/Entry.js');

const submitEntry = async (req, res) => {
    try {
        // Parse the uploaded images from the request
        console.log(req.files.uploaded_images[0])
        console.log(req.body.name)
        console.log(req.files.other_images[0])
        
        const uploadedImagesBuffer = req.files.uploaded_images[0].buffer;
        console.log(uploadedImagesBuffer);
        const uploadedImagesContentType = req.files.uploaded_images[0].mimetype;
        console.log(uploadedImagesContentType);
        const otherImagesBuffer = req.files.other_images[0].buffer;
        const otherImagesContentType = req.files.other_images[0].mimetype;

        const newEntry = await Entry.create({
            name: req.body.name,
            num_of_products_used: req.body.num_of_products_used,
            uploaded_images: {
                data: uploadedImagesBuffer,
                contentType: uploadedImagesContentType
            },
            other_images: {
                data: otherImagesBuffer,
                contentType: otherImagesContentType
            },
            upvotes: req.body.upvotes || 0
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