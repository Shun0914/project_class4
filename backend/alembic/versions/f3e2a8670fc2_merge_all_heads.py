"""merge_all_heads

Revision ID: f3e2a8670fc2
Revises: 5b9281fbcdf0, b82b24165090
Create Date: 2026-02-12 21:49:41.858137

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f3e2a8670fc2'
down_revision: Union[str, None] = ('5b9281fbcdf0', 'b82b24165090')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
