const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

module.exports = async (req, res) => {
  try {
    const { text = 'WATERMARK', position = 'bottom-right' } = req.body;
    const pdf = await PDFDocument.load(req.file.buffer);
    const font = await pdf.embedFont(StandardFonts.HelveticaBold);
    const pages = pdf.getPages();
    pages.forEach(page => {
      const { width, height } = page.getSize();
      let x = 50, y = 50;
      if (position === 'bottom-right') x = width - 200;
      page.drawText(text, { x, y, font, size: 24, color: rgb(0.5,0.5,0.5), opacity: 0.5 });
    });
    const pdfBytes = await pdf.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.from(pdfBytes));
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
