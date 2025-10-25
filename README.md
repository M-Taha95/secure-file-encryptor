# 🔐 Secure File Encryption & Decryption Tool

### Protecting digital data through advanced cryptography — built with **Python** and **Flask**

---

## 📘 Project Overview

The **Secure File Encryption & Decryption Tool** is a cybersecurity project that demonstrates how cryptographic algorithms like **AES-GCM** and **PBKDF2** can protect sensitive data from unauthorized access.

It allows users to securely **encrypt and decrypt any file type** (documents, images, videos, or audio) through an intuitive web interface — ensuring confidentiality, integrity, and privacy.

---

## 🧠 Key Features

- 🔒 **AES-GCM Encryption**
  Industry-standard AES encryption with authentication for tamper-proof data protection.

- 🔑 **Password & Keyfile Options**
  Users can secure files using a password or a 32-byte symmetric key file.

- 🧬 **Key Derivation with PBKDF2**
  Transforms weak passwords into strong cryptographic keys using PBKDF2-HMAC-SHA256 with 390,000 iterations.

- 💻 **Local-Only Processing**
  All operations occur locally in memory — no data is transmitted or stored externally.

- 🧾 **Cross-Platform Compatibility**
  Works seamlessly on Windows, macOS, and Linux.

---

## 🧩 Technical Stack

| Category         | Technology                                               |
| ---------------- | -------------------------------------------------------- |
| **Backend**      | Python, Flask                                            |
| **Cryptography** | AES-GCM (via `cryptography` library), PBKDF2-HMAC-SHA256 |
| **Frontend**     | HTML5, CSS3                                              |
| **Environment**  | `.env` configuration using `python-dotenv`               |

---

## ⚙️ How It Works

You can use this app in **two modes**:

| Mode              | Description                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| **Password Mode** | Encrypt or decrypt using a password (derived into a secure AES key).                           |
| **Keyfile Mode**  | Use a pre-generated `.key` file containing a 32-byte Base64 key for encryption and decryption. |

### 🔑 Generating a Keyfile

Click the **“Generate New Keyfile”** button in the app.
A `.key` file will be downloaded automatically.
Keep it safe — it’s required for decrypting files encrypted with that key.

---

## 🧱 Project Structure

secure-file-encryptor/
│
├── app.py # Main Flask backend
├── crypto.py # AES encryption/decryption logic
├── .env # Secret keys and admin credentials
├── .gitignore # Hidden sensitive and cache files
├── requirements.txt # Dependencies list
├── README.md # Documentation
│
├── templates/
│ └── index.html # Frontend web interface
│
└── static/
└── style.css # Styling and layout

---

## 💡 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/secure-file-encryptor.git
cd secure-file-encryptor

2️⃣ Create and Activate Virtual Environment

Windows:

python -m venv venv
venv\Scripts\activate


macOS / Linux:

python -m venv venv
source venv/bin/activate

3️⃣ Install Dependencies
pip install -r requirements.txt

4️⃣ Configure .env

Create a .env file in the root folder:

SECRET_KEY=your_random_secret_here
FERNET_KEY=your_generated_key_here
ADMIN_USER=admin
ADMIN_PASS=strongpassword123


Generate the keys:

python -c "import secrets; print(secrets.token_hex(16))"
python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"

5️⃣ Run the App
python app.py


Then open your browser and visit:

http://127.0.0.1:5000

🧩 Usage Guide
🔐 Encrypt a File

1. Upload your file (any type: .docx, .pdf, .jpg, .mp4, etc.).

2 . Enter a password or upload a keyfile.

3. Choose Encrypt → click Process File.

4 . The encrypted file will download (filename ends with .enc).

🔓 Decrypt a File

1. Upload the .enc file.

2 .Use the same password or keyfile used during encryption.

3 . Choose Decrypt → click Process File.

4  . Your original file will be restored.

🔒 Security Notes

The .key file must be kept safe — losing it means losing access to encrypted data.

This tool performs local encryption only — no data is uploaded anywhere.

Always use strong passwords for password-based encryption.


📚 Future Improvements

Add file compression before encryption.

Implement user authentication.

Enable hybrid AES + RSA encryption for key exchange.

Add a multi-language interface (English, Arabic).


👨‍💻 Author

Mohammed Taha
Cybersecurity Student — Applied Science University
📅 Year: 2025

```
