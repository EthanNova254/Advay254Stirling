const { PDFDocument } = require('pdf-lib');
const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const { urls } = req.body; // array of PDF URLs
    const mergedPdf = await PDFDocument.create();
    for(const url of urls){
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const pdf = await PDFDocument.load(response.data);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach(p => mergedPdf.addPage(p));
    }
    const pdfBytes = await mergedPdf.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.from(pdfBytes));
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
