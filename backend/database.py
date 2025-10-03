from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import MetaData, Table, Column, Integer, String, Text, TIMESTAMP, text
from config import DATABASE_URL

engine = create_async_engine(DATABASE_URL, echo=True)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
metadata = MetaData()

suspicious_domains = Table(
    "suspicious_domains",
    metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("domain", String(255), nullable=False, unique=True),
    Column("reason", Text),
    Column("date_added", TIMESTAMP, server_default=text("CURRENT_TIMESTAMP")),
)

async def ensure_table_exists():
    try:
        async with engine.begin() as conn:
            await conn.run_sync(metadata.create_all)
    except Exception as e:
        raise e