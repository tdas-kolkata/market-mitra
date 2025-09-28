import dotenv
import os

dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
dotenv.load_dotenv(dotenv_path)

print(os.getenv("DB_URL"))