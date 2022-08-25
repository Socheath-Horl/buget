import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import MainHeader from './components/MainHeader';
import './App.css';
import { NewEntryForm } from './components/NewEntryForm';
import DisplayBalance from './components/DisplayBalance';
import DisplayBalances from './components/DisplayBalances';
import EntryLines from './components/EntryLines';
import ModalEdit from './components/ModalEdit';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEntries } from './actions/entries.actions';

function App() {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [entry, setEntry] = useState();
  const {isOpen, id} = useSelector(state => state.modals);
  const entries = useSelector(state => state.entries);

  useEffect(() => {
    const index = entries.findIndex(entry => entry.id === id);
    setEntry(entries[index]);
  }, [isOpen, id, entries]);

  useEffect(() => {
    let totalIncomes = 0;
    let totalExpeses = 0;
    entries.map((entry) => {
      if (entry.isExpense) {
        return (totalExpeses += Number(entry.value));
      }
      return (totalIncomes += Number(entry.value));
    });
    setTotal(totalIncomes - totalExpeses);
    setExpenseTotal(totalExpeses);
    setIncomeTotal(totalIncomes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEntries());
  }, [dispatch]);
  
  return (
    <Container>
      <MainHeader title='Budget' />
      <DisplayBalance title='Your Balance:' value={total} size='small' />
      <DisplayBalances incomeTotal={incomeTotal} expenseTotal={expenseTotal} />

      <MainHeader title='History' type='h3' />
      <EntryLines entries={entries} />

      <MainHeader type='h3' title='Add new transaction' />
      <NewEntryForm />
      <ModalEdit isOpen={isOpen} {...entry} />
    </Container>
  );
}

export default App;

