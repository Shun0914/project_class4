"""merge branches

Revision ID: 51b370abebc8
Revises: 158da60e58be, b82b24165090
Create Date: 2026-02-11 23:51:01.280921

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '51b370abebc8'
down_revision: Union[str, None] = ('b82b24165090')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
