"""fix budget unique constraint - drop user_id unique, keep composite

Revision ID: d4e5f6a7b8c9
Revises: c1a2b3d4e5f6
Create Date: 2026-02-16 18:00:00.000000

"""
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = 'd4e5f6a7b8c9'
down_revision: Union[str, None] = 'c1a2b3d4e5f6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # MySQL では FK を満たすインデックスが必要なため、
    # 先に通常の INDEX を作成してから UNIQUE INDEX を削除する
    op.execute('CREATE INDEX ix_budgets_user_id ON budgets (user_id)')
    op.execute('ALTER TABLE budgets DROP INDEX user_id')


def downgrade() -> None:
    op.execute('CREATE UNIQUE INDEX user_id ON budgets (user_id)')
    op.execute('DROP INDEX ix_budgets_user_id ON budgets')
