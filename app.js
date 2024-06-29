const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.arguments(bodyParser.json());

let budgets = [
  { id: 1, name: 'Groceries', amount: 100, category: 'Food' },
  { id: 2, name: 'Utilities', amount: 200, category: 'Bills' },
  { id: 3, name: 'Entertainment', amount: 50, category: 'Fun' }
];

//creating a budget item
app.post('/budget', (req, res) => {
    const {name, amount, category } = req.body;
    const id = budgets.length + 1;
    const newbudget = {id, name, amount, category};
    budgets.push(newbudget);
    res.status(201).send(newbudget)
})

// Read All
app.get('/budget', (req, res) => {
  res.status(200).send(budgets);
});

// Read One
app.get('/budget/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const budget = budgets.find(b => b.id === id);

  if (!budget) {
    return res.status(404).send({ error: 'Budget item not found' });
  }

  res.status(200).send(budget);
});

// Update
app.patch('/budget/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, amount, category } = req.body;
  const index = budgets.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).send({ error: 'Budget item not found' });
  }

  budgets[index] = { id, name, amount, category };
  res.send(budgets[index]);
});

// Delete
app.delete('/budget/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = budgets.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).send({ error: 'Budget item not found' });
  }

  const deletedItem = budgets.splice(index, 1);
  res.send(deletedItem);
})


//Starting the server
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})