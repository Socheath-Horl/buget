import React from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import DisplayBalance from './DisplayBalance';

const DisplayBalances = ({incomeTotal, expenseTotal}) => {
  return (
    <Segment textAlign='center'>
      <Grid columns={2} divided>
        <Grid.Column>
          <DisplayBalance title='Income:' value={incomeTotal} color='green' />
        </Grid.Column>
        <Grid.Column>
          <DisplayBalance title='Expenses:' value={expenseTotal} color='red' />
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default DisplayBalances