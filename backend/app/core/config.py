from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OPENAI_API_KEY: str
    MONGO_URI: str 
    SECRET_KEY: str
    CAREER_KEY: str 

    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    GOOGLE_REDIRECT_URI: str

    KAKAO_CLIENT_ID: str
    KAKAO_CLIENT_SECRET: str
    KAKAO_REDIRECT_URI: str

    NAVER_CLIENT_ID: str
    NAVER_CLIENT_SECRET: str
    NAVER_REDIRECT_URI: str

    SMTP_SERVER: str
    SMTP_PORT: int
    SMTP_USER: str
    SMTP_PASSWORD: str
    FRONTEND_URL: str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
