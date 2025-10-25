#Secure File Encryption & Decryption Tool

A simple Flask app that encrypt and decryprt arbitarary files (text, images, videos, PDFs, Office files) using AES-GCM. Supports password-based (PBKDF2) and raw keyfile flows.


1. Create a Python venv and activate:
```bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate