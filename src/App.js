// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import MessageForm from './Components/MessageForm';
import MessageTable from './Components/MessageTable';
import { loadMessages, saveMessages } from './services/storageService'; // Importando o serviço

function App() {
  const [messages, setMessages] = useState([]);
  const [editingMessage, setEditingMessage] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Usando o serviço para carregar as mensagens
    setMessages(loadMessages());
  }, []);

  useEffect(() => {
    // Usando o serviço para salvar as mensagens
    saveMessages(messages);
  }, [messages]);

  const handleSave = (msg) => {
    if (msg.id) {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? msg : m))
      );
      setFeedback('Mensagem atualizada com sucesso!');
    } else {
      const newId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;
      setMessages((prev) => [...prev, { ...msg, id: newId }]);
      setFeedback('Mensagem adicionada com sucesso!');
    }
    setEditingMessage(null);
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleEdit = (msg) => setEditingMessage(msg);

  const handleCancelEdit = () => setEditingMessage(null);

  const handleDelete = (id) => {
    if (window.confirm('Deseja realmente excluir esta mensagem?')) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setFeedback('Mensagem excluída com sucesso!');
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Gerenciador de Mensagens</h1>

      {feedback && <Alert variant="success">{feedback}</Alert>}

      <MessageForm
        onSave={handleSave}
        editingMessage={editingMessage}
        cancelEdit={handleCancelEdit}
      />

      <MessageTable
        messages={messages}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Container>
  );
}

export default App;
