const Entry = require('../Models/Entry.js');
const puppeteer = require('puppeteer');

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

const getAllEntries = async (req, res) => {
    try {
        const entries = await Entry.find({});
        res.status(200).json({
            success: true,
            data: entries,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Could not fetch entries",
            error: error.message,
        });
    }
};

const getEntryProducts = async (req, res) => {
    try {
        const entry = await Entry.findById(req.params.id);
        if (!entry) {
            return res.status(404).json({
                success: false,
                message: "Entry not found",
            });
        }
        res.status(200).json({
            success: true,
            data: entry.products_links,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Could not fetch entry products",
            error: error.message,
        });
    }
};

const upvoteEntry = async (req, res) => {
    try {
        const entry = await Entry.findById(req.params.id);
        if (!entry) {
            return res.status(404).json({
                success: false,
                message: "Entry not found",
            });
        }
        entry.upvotes += 1;
        await entry.save();
        res.status(200).json({
            success: true,
            message: "Entry upvoted successfully",
            data: entry,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Could not upvote entry",
            error: error.message,
        });
    }
};

async function navigateToPage(page, url, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        return true;
      } catch (error) {
        console.error(`Attempt ${i + 1} to navigate to ${url} failed:`, error);
        if (i === retries - 1) {
          throw error;
        }
      }
    }
  }
  
  const getEntryProductDetails = async (req, res) => {
    try {
      const entry = await Entry.findById(req.params.id);
      if (!entry) {
        return res.status(404).json({ success: false, message: 'Entry not found' });
      }
  
      const productDetails = [];
      const browser = await puppeteer.launch({
        headless: false,
        args: ['--disable-http2']
      });
      const page = await browser.newPage();
  
      for (const productLink of entry.products_links) {
        try {
            await page.goto(productLink ,{ timeout: 60000 });
            await page.waitForSelector('.image-grid-image', { timeout: 60000 });
        
            const imageUrl = await page.$eval('.image-grid-image', div => {
              const style = div.style.backgroundImage;
              const urlMatch = style.match(/url\("(.+)"\)/);
              return urlMatch ? urlMatch[1] : null;
            });
        
            const productName = await page.$eval('.pdp-title', el => el.innerText);
            const productPrice = await page.$eval('.pdp-price', el => el.innerText);
            const productDesc = await page.$eval('.pdp-name', el => el.innerText);
        
            console.log(`Product Details for "${productLink}":`);
            console.log(`Image URL: ${imageUrl}`);
            console.log(`Name: ${productName}`);
            console.log(`Price: ${productPrice}`);
        
            productDetails.push({ productLink, imageUrl, productName, productPrice, productDesc });
        }
            catch (error) {
                console.error(`Error fetching details for ${productLink}: ${error.message}`);
            }
        }
        
            await browser.close();
        res.status(200).json({ success: true, data: productDetails });
    } catch (error) {
      console.error('Error fetching product details:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

module.exports = {
    submitEntry,
    getAllEntries,
    getEntryProducts,
    upvoteEntry,
    getEntryProductDetails,
};