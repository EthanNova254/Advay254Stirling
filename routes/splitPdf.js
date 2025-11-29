const { PDFDocument } = require('pdf-lib');

module.exports = async (req, res) => {
  try {
    const { pageRanges } = req.body; // e.g., "1-3,5"
    const pdf = await PDFDocument.load(req.file.buffer);
    const newPdf = await PDFDocument.create();
    const ranges = pageRanges.split(',').map(r => r.split('-').map(Number));
    for (const range of ranges) {
      const [start, end] = range.length === 2 ? range : [range[0], range[0]];
      const pages = await newPdf.copyPages(pdf, Array.from({ length: end-start+1 }, (_, i) => start-1+i));
      pages.forEach(page => newPdf.addPage(page));
    }
    const pdfBytes = await newPdf.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.from(pdfBytes));
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
