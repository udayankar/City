from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()

def hashed_password(password):
    password = password_hash.hash(password)
    return password