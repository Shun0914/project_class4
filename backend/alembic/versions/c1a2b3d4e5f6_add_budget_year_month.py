"""add budget_year and budget_month to budgets

Revision ID: c1a2b3d4e5f6
Revises: 9bdb04fccc73
Create Date: 2026-02-16 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from datetime import datetime


# revision identifiers, used by Alembic.
revision: str = 'c1a2b3d4e5f6'
down_revision: Union[str, None] = '9bdb04fccc73'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. 年・月カラムを追加（既存行にはデフォルト値を設定）
    now = datetime.now()
    op.add_column('budgets', sa.Column('budget_year', sa.Integer(), nullable=False, server_default=str(now.year)))
    op.add_column('budgets', sa.Column('budget_month', sa.Integer(), nullable=False, server_default=str(now.month)))

    # 2. server_default を削除（今後の行は明示的に指定する）
    op.alter_column('budgets', 'budget_year', server_default=None)
    op.alter_column('budgets', 'budget_month', server_default=None)

    # 3. 旧ユニーク制約を削除（user_id 単独）
    #    MySQL ではインデックス名で削除
    try:
        op.drop_constraint('user_id', 'budgets', type_='unique')
    except Exception:
        try:
            op.drop_index('user_id', table_name='budgets')
        except Exception:
            pass

    # 4. 新しい複合ユニーク制約を追加
    op.create_unique_constraint('uq_user_budget_yearmonth', 'budgets', ['user_id', 'budget_year', 'budget_month'])


def downgrade() -> None:
    op.drop_constraint('uq_user_budget_yearmonth', 'budgets', type_='unique')
    op.drop_column('budgets', 'budget_month')
    op.drop_column('budgets', 'budget_year')
    op.create_unique_constraint('user_id', 'budgets', ['user_id'])
