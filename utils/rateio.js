class Creditors {
  name = '';
  cnpj = '';
  value = 0.0;

  createCreditors(params) {
    const { name, cnpj } = params;
    this.validateFields(cnpj);

    this.name = name;
    this.cnpj = cnpj;
  }

  validateFields(cnpj) {
    if (!cnpj) throw new Error('Is Empty');
    const newCnpj = cnpj
      .replace('.', '')
      .replace('.', '')
      .replace('-', '')
      .replace('/', '');
    if (newCnpj.length !== 14) throw new Error('cnpj other than 14.');
  }
}

class Transaction {
  id = 0;
  dh_register = '';
  total_value = 0.0;

  createTransaction(params) {
    const { id, value } = params;
    this.validateFields(id, value);

    this.id = id;
    this.total_value = parseFloat(value);
    this.dh_register = new Date().toLocaleString();
  }

  validateFields(idTransaction, totalValue) {
    if (!idTransaction || !totalValue) throw new Error('Is Empty');
    if (totalValue <= 0) throw new Error('value transaction invalid!');
    if (typeof totalValue !== 'number')
      throw new Error('value transaction invalid!');
  }
}

class Apportionment {
  prorate(creditors, transactions, id) {
    const transaction = transactions.find((v) => v.id === id);
    if (!transaction) {
      throw new Error('Transaction not found.');
    }
    const { total_value } = transaction;

    let sum_values = 0.0;
    let value = (total_value / creditors.length).toFixed(2);

    let [real, cents] = value.toString().split('.');

    creditors.map((creditor, i) => {
      if (creditors.length === i + 1) {
        const isZero = cents.substring(1, 0);

        if (value * creditors.length < total_value) cents++;
        else if (value * creditors.length > total_value) cents--;

        if (isZero == 0) cents = '0' + cents;
        value = parseFloat(real + '.' + cents);
      }

      creditor.value = parseFloat(value);

      sum_values += parseFloat(creditor.value);
    });

    if (sum_values.toFixed(2) !== total_value.toFixed(2).toString()) {
      throw new Error('Different total value.');
    }
  }
}

// ======= Main (Inicio) ======== //

const transactions = [];

// Criação de Credores
const alpha = new Creditors();
alpha.createCreditors({ name: 'Usuario Alpha', cnpj: '21.032.242/0001-37' });
const beta = new Creditors();
beta.createCreditors({ name: 'Usuario Beta', cnpj: '32.877.480/0001-60' });
const gamma = new Creditors();
gamma.createCreditors({ name: 'Usuario Gamma', cnpj: '57.881.386/0001-05' });
const delta = new Creditors();
delta.createCreditors({ name: 'Usuario Delta', cnpj: '57.881.386/0001-06' });

// Criada Lista de credores
const creditors = [alpha, beta, gamma, delta];

// Criada as transações
const transaction1 = new Transaction();
transaction1.createTransaction({ id: 123, value: 832.53 });
validId(transaction1);

const transaction2 = new Transaction();
transaction2.createTransaction({ id: 225, value: 100 });
validId(transaction2);

const transaction3 = new Transaction();
transaction3.createTransaction({ id: 456, value: 15.23 });
validId(transaction3);

const transaction4 = new Transaction();
transaction4.createTransaction({ id: 489, value: 245.85 });
validId(transaction4);

// Rateio entre os credores
const apportionment = new Apportionment();
apportionment.prorate(creditors, transactions, 489);

// Tabela de transactions e payments
const table_transactions = [transactions];
const table_payments = [creditors];

console.log('Transactions: ', table_transactions);
console.log('Payments: ', table_payments);

function validId(transaction) {
  const find = transactions.find((f) => f.id == transaction.id);
  if (find) throw new Error('There is already a transaction with this id.');
  transactions.push(transaction);
}
