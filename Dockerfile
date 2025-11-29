# Base image
FROM stirlingtools/stirling-pdf:latest

# Disable OCR and LibreOffice-heavy features for memory safety
ENV STIRLING_OCR_ENABLED=false
ENV STIRLING_OCR_LANGS=""
ENV STIRLING_LIBREOFFICE_ENABLED=false

# Expose backend API port only
EXPOSE 8080

# Start backend only
CMD ["stirling-pdf", "start", "--backend-only", "--port", "8080"]
