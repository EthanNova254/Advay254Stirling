# Advay254Stirling

A lightweight, fully-featured PDF backend for HTML/Text/Image to PDF, merging, splitting, watermarking, compressing, metadata, thumbnails, and merging PDFs from URLs. Designed to be zero-config, deployable on Render free-tier, and usable directly with HTTP requests (n8n ready).

---

## Features

1. HTML → PDF (/api/html-to-pdf)
2. Text → PDF (/api/text-to-pdf)
3. Image → PDF (/api/image-to-pdf)
4. Merge PDFs (/api/merge-pdf)
5. Split PDF (/api/split-pdf)
6. Watermark PDF (/api/watermark-pdf)
7. Compress PDF (/api/compress-pdf)
8. Set PDF Metadata (/api/set-metadata)
9. Generate PDF Thumbnails (/api/pdf-thumbnail)
10. Merge PDFs from URLs (/api/merge-pdf-urls)

---

## Deployment on Render

1. Create a new Web Service on Render.
2. Connect your GitHub repository with this project.
3. Set Environment:
   - Build Command: npm install
   - Start Command: node server.js
4. Port: Render sets automatically via PORT environment variable. No .env required.
5. Deploy. After deployment, your backend URL will look like: https://your-app.onrender.com

---

## Usage / API

Use POST requests with multipart/form-data or application/json depending on the endpoint.

### 1 HTML → PDF
curl -X POST "https://your-app.onrender.com/api/html-to-pdf" -F "file=@example.html" --output output.pdf

### 2 Text → PDF
curl -X POST "https://your-app.onrender.com/api/text-to-pdf" -H "Content-Type: application/json" -d '{"text":"Hello world","pageSize":"A4"}' --output output.pdf

### 3 Image → PDF
curl -X POST "https://your-app.onrender.com/api/image-to-pdf" -F "file=@example.png" --output output.pdf

### 4 Merge PDFs
curl -X POST "https://your-app.onrender.com/api/merge-pdf" -F "files=@file1.pdf" -F "files=@file2.pdf" --output merged.pdf

### 5 Split PDF
curl -X POST "https://your-app.onrender.com/api/split-pdf" -F "file=@input.pdf" -H "Content-Type: application/json" -d '{"pageRanges":"1-3,5"}' --output split.pdf

### 6 Watermark PDF
curl -X POST "https://your-app.onrender.com/api/watermark-pdf" -F "file=@input.pdf" -H "Content-Type: application/json" -d '{"text":"CONFIDENTIAL","position":"bottom-right"}' --output watermarked.pdf

### 7 Compress PDF
curl -X POST "https://your-app.onrender.com/api/compress-pdf" -F "file=@input.pdf" --output compressed.pdf

### 8 Set PDF Metadata
curl -X POST "https://your-app.onrender.com/api/set-metadata" -F "file=@input.pdf" -H "Content-Type: application/json" -d '{"title":"My Book","author":"Advay","subject":"Story","keywords":"kids,story"}' --output metadata.pdf

### 9 PDF Thumbnails (first page)
curl -X POST "https://your-app.onrender.com/api/pdf-thumbnail" -F "file=@input.pdf" -H "Content-Type: application/json" -d '{"pages":"1"}' --output thumbnail.png

### 10 Merge PDFs from URLs
curl -X POST "https://your-app.onrender.com/api/merge-pdf-urls" -H "Content-Type: application/json" -d '{"urls":["https://example.com/file1.pdf","https://example.com/file2.pdf"]}' --output merged_from_urls.pdf

---

## Notes

- No environment variables required; backend runs on Render free-tier by default.
- All endpoints return PDF (or PNG for thumbnails).
- Can be used directly in n8n HTTP Request nodes.
- Lightweight, memory-efficient, ready for zero-config deployment.

---

## License

MIT License
