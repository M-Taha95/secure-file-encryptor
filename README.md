# Secure File Encryption & Decryption Tool OR Edu-Crypto
### An Interactive Cybersecurity Learning Platform for Students — Built with **Python** and **Flask**

---

## Project Overview

The **Secure File Encryption & Decryption Tool** is a complete cybersecurity learning platform that combines:

- Real AES-GCM file encryption  
- A child-friendly educational experience  
- Interactive animation-based cryptography lessons  
- A casino-style cipher game with 20+ random challenges  
- A leaderboard system for student motivation  

This project is designed for school children and beginners who want to learn cybersecurity concepts in a fun, safe, and modern way.

It demonstrates how cryptographic algorithms like **AES-GCM** and **PBKDF2** are used to secure sensitive files, using a clean and intuitive web interface.

---

## Key Features

### AES-GCM Encryption  
Industry-standard AES encryption with authentication to prevent tampering.

### Password & Keyfile Support  
Choose between:
- Password-based encryption  
- A 32-byte AES keyfile (`.key`)

### PBKDF2-HMAC-SHA256  
Secure password strengthening (390,000 iterations).

### Local-Only Processing  
All operations happen **on your own device** — nothing is uploaded.

### Learning Pages  
- Cyber-Robot Academy  
- Animated cipher explanations  
- Caesar, ROT13, XOR, Atbash, Substitution  
- Step-by-step transformation animations  

### Cipher Casino Game  
- 20+ random encryption/decryption levels  
- Difficulty scaling (Easy/Medium/Hard)  
- Player avatars  
- Unlockable badges  
- One-chance gameplay  
- Pop-up win/lose notifications  
- Infinite new rounds  
- Full interactive experience  

### Leaderboard System  
- Saves top player scores  
- Encourages friendly competition  
- Perfect for classrooms  

### Cross-Platform  
Works on **Windows**, **macOS**, and **Linux**.

---

## Technical Stack

| Category         | Technology                                               |
| ---------------- | -------------------------------------------------------- |
| **Backend**      | Python, Flask                                            |
| **Cryptography** | AES-GCM, PBKDF2-HMAC-SHA256 (`cryptography` library)     |
| **Frontend**     | HTML5, CSS3, JavaScript                                  |
| **Environment**  | `.env` configuration using `python-dotenv`               |

---

## How It Works

The system supports two encryption flows:

| Mode              | Description |
| ----------------- | ----------- |
| **Password Mode** | User-provided password is turned into a strong AES key using PBKDF2. |
| **Keyfile Mode**  | A downloaded `.key` file containing a 32-byte AES key is used directly. |

### Keyfile Generation
Use the **“Generate New Keyfile”** button to download a secure AES keyfile.

Keep it safe — it is needed for decrypting files encrypted with that key.

---

#Create & Activate Virtual Environment
Windows:
python -m venv venv
venv\Scripts\activate

macOS / Linux:
python -m venv venv
source venv/bin/activate

#Install Dependencies
pip install -r requirements.txt



 Usage Guide
 Encrypt a File

Upload any file (PDF, image, video, Word, etc.)

Enter password or upload keyfile

Choose Encrypt

Download your encrypted .enc file

# Decrypt a File

Upload the .enc file

Use the same password or keyfile

Choose Decrypt

Your original file is restored

# Security Notes

If you lose the .key file, the encrypted data cannot be recovered

All processing happens locally — nothing is uploaded

Strong passwords increase security

AES-GCM prevents tampering and ensures integrity

# Additional Features
# Cyber-Robot Academy

Animated lessons

Real-time cipher visualizations

Caesar, XOR, ROT13, Atbash & Substitution

Step-by-step walkthroughs

Interactive “Try It” areas

# Cipher Casino Game

20+ random algorithmic challenges per round

Difficulty levels:

Easy → Caesar, ROT13

Medium → Caesar, ROT13, XOR, Atbash

Hard → All + substitution

Player avatars

Unlockable badges

One-attempt gameplay

Pop-up win/lose feedback

Infinite replayability

# Leaderboard Page

Stores high scores

Encourages friendly competition

Great for the classroom or workshops

#Future Improvements

AES + RSA hybrid encryption

File compression before encryption

Multi-language UI (Arabic/English)

Teacher/Admin dashboard

Online multiplayer cipher competitions

# Author

Mohammed Taha -
Cybersecurity Student — Applied Science Private University
 2025
