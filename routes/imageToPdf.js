const { PDFDocument } = require('pdf-lib');
const sharp = require('sharp');

module.exports = async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;
    const image = await sharp(imageBuffer).png().toBuffer();
    const pdfDoc = await PDFDocument.create();
    const img = await pdfDoc.embedPng(image);
    const page = pdfDoc.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    const pdfBytes = await pdfDoc.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.from(pdfBytes));
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
