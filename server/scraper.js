const puppeteer = require('puppeteer');

(async () => {
  const productLink = ['https://www.myntra.com/tops/stylecast+x+slyck/stylecast-x-slyck-styled-high-neck-styled-back-top/27909896/buy'
  ];
  const productDetails = [];
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  for (const product of productLink) {
    await page.goto(product);
    await page.waitForSelector('.image-grid-image');

    const imageUrl = await page.$eval('.image-grid-image', div => {
      const style = div.style.backgroundImage;
      const urlMatch = style.match(/url\("(.+)"\)/);
      return urlMatch ? urlMatch[1] : null;
    });

    const productName = await page.$eval('.pdp-title', el => el.innerText);
    const productPrice = await page.$eval('.pdp-price', el => el.innerText);

    console.log(`Product Details for "${product}":`);
    console.log(`Image URL: ${imageUrl}`);
    console.log(`Name: ${productName}`);
    console.log(`Price: ${productPrice}`);

    productDetails.push({ product, imageUrl, productName, productPrice });
  }

  await browser.close();
})();

