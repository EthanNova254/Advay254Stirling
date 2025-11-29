const pdf = require('html-pdf-node');

module.exports = async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const options = { format: 'A4', printBackground: true };
    const file = { content: fileBuffer.toString('utf8') };
    const pdfBuffer = await pdf.generatePdf(file, options);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
