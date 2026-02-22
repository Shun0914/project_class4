"""merge heads

Revision ID: 8a805ae92ec9
Revises: d4e5f6a7b8c9, e1d6b9e065fd
Create Date: 2026-02-22 01:50:47.331174

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8a805ae92ec9'
down_revision: Union[str, None] = ('d4e5f6a7b8c9', 'e1d6b9e065fd')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
