const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const app = express();
app.use(express.json());

const htmlToPdfRoute = require('./routes/htmlToPdf');
const textToPdfRoute = require('./routes/textToPdf');
const imageToPdfRoute = require('./routes/imageToPdf');
const mergePdfRoute = require('./routes/mergePdf');
const splitPdfRoute = require('./routes/splitPdf');
const watermarkPdfRoute = require('./routes/watermarkPdf');
const compressPdfRoute = require('./routes/compressPdf');
const metadataPdfRoute = require('./routes/metadataPdf');
const thumbnailsRoute = require('./routes/thumbnails');
const mergeFromUrlsRoute = require('./routes/mergeFromUrls');

// Routes
app.use('/api/html-to-pdf', upload.single('file'), htmlToPdfRoute);
app.use('/api/text-to-pdf', textToPdfRoute);
app.use('/api/image-to-pdf', upload.single('file'), imageToPdfRoute);
app.use('/api/merge-pdf', upload.array('files'), mergePdfRoute);
app.use('/api/split-pdf', upload.single('file'), splitPdfRoute);
app.use('/api/watermark-pdf', upload.single('file'), watermarkPdfRoute);
app.use('/api/compress-pdf', upload.single('file'), compressPdfRoute);
app.use('/api/set-metadata', upload.single('file'), metadataPdfRoute);
app.use('/api/pdf-thumbnail', upload.single('file'), thumbnailsRoute);
app.use('/api/merge-pdf-urls', mergeFromUrlsRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Stirling PDF backend running on port ${PORT}`));
