const { PDFDocument } = require('pdf-lib');
const sharp = require('sharp');

module.exports = async (req, res) => {
  try {
    const { pages = '1' } = req.body;
    const pdf = await PDFDocument.load(req.file.buffer);
    const pageIndices = pages.split(',').map(p => parseInt(p)-1);
    const images = [];
    for (const idx of pageIndices) {
      const page = pdf.getPages()[idx];
      const pngBytes = await page.renderToPng(); // pdf-lib doesn’t render natively; placeholder for lightweight lib
      images.push(pngBytes);
    }
    res.setHeader('Content-Type', 'image/png');
    res.send(images[0]); // return first thumbnail as example
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
