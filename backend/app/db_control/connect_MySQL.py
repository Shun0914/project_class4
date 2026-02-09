from sqlalchemy import create_engine

import os, tempfile
from dotenv import load_dotenv

# 環境変数の読み込み
load_dotenv()

# データベース接続情報
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_NAME = os.getenv('DB_NAME')
SSL_CA_PATH = os.getenv('SSL_CA_PATH')

# MySQLのURL構築
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# SSL証明書ファイルのパスを絶対パスに変換
# # connect_MySQL.pyの場所から見た相対パス
# current_dir = os.path.dirname(os.path.abspath(__file__))
# backend_dir = os.path.dirname(current_dir)  # db_controlの親ディレクトリ（backend）
# cert_path = os.path.join(backend_dir, "DigiCertGlobalRootG2.crt.pem")
 
# PEMを環境変数から読み取り、クラウド側でtmpファイルに保存しパスを返す関数
def prepare_ca_file_from_env() -> str | None:
    pem = os.getenv("PEM_CONTENT")  # CA証明書本文
    if not pem:
        return None
    pem = pem.replace("\\n", "\n")   # \n文字列を改行に置き替え
    ca_path = os.path.join(tempfile.gettempdir(), "mysql-ca.pem")
    with open(ca_path, "w") as f:
        f.write(pem)
    return ca_path

ca_path = prepare_ca_file_from_env()

connect_args = {}
if ca_path:
    connect_args = {"ssl": {"ca": ca_path, "check_hostname": False}}

# エンジンの作成
engine = create_engine(
    DATABASE_URL,
    echo=True,
    pool_pre_ping=True,
    pool_recycle=3600,
    connect_args=connect_args,
)



