const { PDFDocument } = require('pdf-lib');

module.exports = async (req, res) => {
  try {
    const { title, author, subject, keywords } = req.body;
    const pdf = await PDFDocument.load(req.file.buffer);
    if(title) pdf.setTitle(title);
    if(author) pdf.setAuthor(author);
    if(subject) pdf.setSubject(subject);
    if(keywords) pdf.setKeywords(keywords.split(','));
    const pdfBytes = await pdf.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.from(pdfBytes));
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
