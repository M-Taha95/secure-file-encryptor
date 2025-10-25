from flask import Flask, render_template, request, send_file, redirect, url_for, flash
from dotenv import load_dotenv
from io import BytesIO
import os, base64
from crypto import (
    encrypt_bytes_with_password,
    decrypt_bytes_with_password,
    encrypt_bytes_with_key,
    decrypt_bytes_with_key
)

load_dotenv()
app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", os.urandom(16))

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/process", methods=["POST"])
def process():
    file = request.files.get("file")
    password = request.form.get("password", "").strip()
    keyfile = request.files.get("keyfile")
    action = request.form.get("action")

    if not file:
        flash("Please upload a file.")
        return redirect(url_for("index"))

    data = file.read()

    try:
        if keyfile and keyfile.filename:
            key_b64 = keyfile.read().strip()
            key = base64.b64decode(key_b64)
            result = encrypt_bytes_with_key(data, key) if action == "encrypt" else decrypt_bytes_with_key(data, key)
        else:
            if not password:
                flash("Password required if no keyfile provided.")
                return redirect(url_for("index"))
            result = encrypt_bytes_with_password(data, password) if action == "encrypt" else decrypt_bytes_with_password(data, password)

        filename = file.filename + ".enc" if action == "encrypt" else file.filename.replace(".enc", "")
        mem = BytesIO(result)
        mem.seek(0)
        return send_file(mem, as_attachment=True, download_name=filename)

    except Exception as e:
        flash(f"Error: {e}")
        return redirect(url_for("index"))

@app.route("/generate-key")
def generate_key():
    key = os.urandom(32)
    key_b64 = base64.b64encode(key)
    mem = BytesIO(key_b64)
    mem.seek(0)
    return send_file(mem, as_attachment=True, download_name="keyfile.key")

if __name__ == "__main__":
    app.run(debug=True)
