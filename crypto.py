# crypto.py
import os
from typing import Tuple
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

# Constants (tweak PBKDF2_ITERS depending on target hardware)
HEADER_TAG = b'ENCRYPTEDv1'  # version header for password-based
HEADER_KEYTAG = b'ENCRYPTEDk1'  # version header for raw-key based
SALT_SIZE = 16
NONCE_SIZE = 12
KEY_LEN = 32  # AES-256
PBKDF2_ITERS = 390_000

def derive_key_from_password(password: bytes, salt: bytes) -> bytes:
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=KEY_LEN,
        salt=salt,
        iterations=PBKDF2_ITERS,
    )
    return kdf.derive(password)

def encrypt_bytes_with_password(plaintext: bytes, password: str) -> bytes:
    salt = os.urandom(SALT_SIZE)
    key = derive_key_from_password(password.encode('utf-8'), salt)
    aesgcm = AESGCM(key)
    nonce = os.urandom(NONCE_SIZE)
    ct = aesgcm.encrypt(nonce, plaintext, associated_data=None)
    return HEADER_TAG + salt + nonce + ct

def decrypt_bytes_with_password(blob: bytes, password: str) -> bytes:
    if not blob.startswith(HEADER_TAG):
        raise ValueError("Not a password-encrypted file (invalid header).")
    offset = len(HEADER_TAG)
    salt = blob[offset:offset+SALT_SIZE]; offset += SALT_SIZE
    nonce = blob[offset:offset+NONCE_SIZE]; offset += NONCE_SIZE
    ct = blob[offset:]
    key = derive_key_from_password(password.encode('utf-8'), salt)
    aesgcm = AESGCM(key)
    return aesgcm.decrypt(nonce, ct, associated_data=None)

def encrypt_bytes_with_key(plaintext: bytes, key: bytes) -> bytes:
    if len(key) != KEY_LEN:
        raise ValueError("Raw key must be 32 bytes long.")
    aesgcm = AESGCM(key)
    nonce = os.urandom(NONCE_SIZE)
    ct = aesgcm.encrypt(nonce, plaintext, associated_data=None)
    return HEADER_KEYTAG + nonce + ct

def decrypt_bytes_with_key(blob: bytes, key: bytes) -> bytes:
    if not blob.startswith(HEADER_KEYTAG):
        raise ValueError("Not a keyfile-encrypted blob.")
    offset = len(HEADER_KEYTAG)
    nonce = blob[offset:offset+NONCE_SIZE]; offset += NONCE_SIZE
    ct = blob[offset:]
    aesgcm = AESGCM(key)
    return aesgcm.decrypt(nonce, ct, associated_data=None)
