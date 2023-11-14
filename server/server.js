const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://siriusblackazka:azkabann@cluster0.ar5fu2f.mongodb.net/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const todosSchema = new mongoose.Schema({
    tasks: String,
});
const Todos = mongoose.model('todos', todosSchema);

app.get('/api/getTodos', async (req, res) => {
    try {
        const data = await Todos.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/addTodo', async (req, res) => {
    try {
        const newTodo = await Todos.create(req.body);
        res.json(newTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/deleteTodo/:id', async (req, res) => {
    try {
      const deletedTodo = await Todos.findByIdAndDelete(req.params.id);
      return res.status(deletedTodo ? 200 : 404).json(deletedTodo || { error: 'Todo not found' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.put('/api/updateTodo/:id', async (req, res) => {
    try {
        const updatedTodo = await Todos.findByIdAndUpdate( req.params.id,{ tasks: req.body.tasks });
        return res.status(updatedTodo ? 200 : 404).json(updatedTodo || { error: 'Todo not found' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});