# tests/key,py
import secrets

secret_key = secrets.token_hex(32)  # 32바이트(256비트) 길이의 키 생성
print(secret_key)