import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase.js';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { Box, Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, 
         Checkbox, IconButton, Typography, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import firebaseApp from './../../../lib/firebase';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  const fetchTodos = async () => {
    if (!user?.uid) return null;

    try {
      const q = query(collection(db, "todos"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const todoList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTodos(todoList);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await addDoc(collection(db, "todos"), {
        text: newTodo,
        completed: false,
        userId: user.uid,
        createdAt: new Date()
      });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, {
        completed: !completed
      });
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Todo List
      </Typography>
      
      <Box component="form" onSubmit={addTodo} sx={{ mb: 2, display: 'flex' }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          sx={{ mr: 1 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </Box>
      
      <List>
        {todos.length === 0 ? (
          <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', py: 2 }}>
            No tasks yet. Add one above!
          </Typography>
        ) : (
          todos.map((todo) => (
            <ListItem key={todo.id} dense>
              <Checkbox
                edge="start"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id, todo.completed)}
                color="primary"
              />
              <ListItemText
                primary={todo.text}
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'text.secondary' : 'text.primary'
                }}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => deleteTodo(todo.id)} size="small">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
} 