import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type === 'income') {
      const income = value;
      const outcome = 0;
      const response = this.transactionsRepository.create({
        income,
        outcome,
        title,
        value,
        type,
      });
      return response;
    }
    const outcome = value;
    const total = this.transactionsRepository.getBalance({ outcome });

    if (total >= 0) {
      const income = 0;
      const response = this.transactionsRepository.create({
        income,
        outcome,
        title,
        value,
        type,
      });
      return response;
    }
    throw Error('Insuficient Balance');
  }
}

export default CreateTransactionService;
