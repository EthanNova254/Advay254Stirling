const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const app = express();
app.use(express.json());

const htmlToPdf = require('./routes/htmlToPdf');
const textToPdf = require('./routes/textToPdf');
const imageToPdf = require('./routes/imageToPdf');
const mergePdf = require('./routes/mergePdf');
const splitPdf = require('./routes/splitPdf');
const watermarkPdf = require('./routes/watermarkPdf');
const compressPdf = require('./routes/compressPdf');
const metadataPdf = require('./routes/metadataPdf');
const thumbnails = require('./routes/thumbnails');
const mergeFromUrls = require('./routes/mergeFromUrls');

app.use('/api/html-to-pdf', upload.single('file'), htmlToPdf);
app.use('/api/text-to-pdf', textToPdf);
app.use('/api/image-to-pdf', upload.single('file'), imageToPdf);
app.use('/api/merge-pdf', upload.array('files'), mergePdf);
app.use('/api/split-pdf', upload.single('file'), splitPdf);
app.use('/api/watermark-pdf', upload.single('file'), watermarkPdf);
app.use('/api/compress-pdf', upload.single('file'), compressPdf);
app.use('/api/set-metadata', upload.single('file'), metadataPdf);
app.use('/api/pdf-thumbnail', upload.single('file'), thumbnails);
app.use('/api/merge-pdf-urls', mergeFromUrls);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Stirling PDF backend running on port ${PORT}`));
