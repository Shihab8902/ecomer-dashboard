require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const handleFileUpload = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Configure Cloudinary
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })


        // Upload the file buffer to Cloudinary
        cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    return res.status(500).json({ error: "Failed to upload file" });
                }

                res.status(200).json({
                    message: "File uploaded successfully",
                    result,
                });
            }
        ).end(file.buffer);
    } catch (error) {
        console.error("Error during file upload:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = handleFileUpload;
