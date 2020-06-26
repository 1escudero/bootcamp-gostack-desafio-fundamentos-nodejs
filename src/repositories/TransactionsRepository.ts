import Transaction from '../models/Transaction';

interface CheckBalance {
  outcome: number;
}
interface Create {
  income: number;
  outcome: number;
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface ReturnAll {
  transactions: Transaction[];
  balance: Record<string, number>;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private incomeBalance: number[] = [];

  private outcomeBalance: number[] = [];

  private total = 0;

  private income = 0;

  private outcome = 0;

  private result = 0;

  constructor() {
    this.transactions = [];
  }

  public all(): ReturnAll {
    const { income } = this;
    const { outcome } = this;
    const { total } = this;
    const { transactions } = this;
    const balance = { income, outcome, total };

    return { transactions, balance };
  }

  public getBalance({ outcome }: CheckBalance): number {
    this.result = this.total - outcome;
    return this.result;
  }

  public create({ income, outcome, title, value, type }: Create): Transaction {
    this.incomeBalance.push(income);
    this.outcomeBalance.push(outcome);
    const transaction = new Transaction({ title, value, type });

    this.income = this.incomeBalance.reduce((acc, cv) => acc + cv, 0);
    this.outcome = this.outcomeBalance.reduce((acc, cv) => acc + cv, 0);
    this.total = this.income - this.outcome;

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
