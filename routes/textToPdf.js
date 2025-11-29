const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

module.exports = async (req, res) => {
  try {
    const { text = 'Hello world', pageSize = 'A4', orientation = 'portrait' } = req.body;
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    page.drawText(text, { x: 50, y: 800, font, size: 18, color: rgb(0, 0, 0) });
    const pdfBytes = await pdfDoc.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.from(pdfBytes));
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
