const { PDFDocument } = require('pdf-lib');

module.exports = async (req, res) => {
  try {
    const pdf = await PDFDocument.load(req.file.buffer);
    const compressedPdf = await PDFDocument.create();
    const pages = await compressedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach(page => compressedPdf.addPage(page));
    const pdfBytes = await compressedPdf.save({ useObjectStreams: true });
    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.from(pdfBytes));
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
