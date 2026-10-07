
import {Provider} from 'react-redux';
import store from './store/store';
import { Container, Typography } from '@mui/material';
import AddHabitForm from './components/add-habit-form';
import HabitList from './components/habitList';
import HabitStats from './components/HabitStats';

function App() {
  return (
      <Provider store={store}>
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" align="center">
          Habit Tracker
        </Typography>
        <AddHabitForm/>
        <HabitList />
        <HabitStats />
      </Container>
      </Provider>
  )
}

export default App

