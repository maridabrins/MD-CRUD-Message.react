import React from 'react';
import { Table, Button } from 'react-bootstrap';

const MessageTable = ({ messages, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover responsive className="mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Mensagem</th>
          <th>Data</th>
          <th>Privacidade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((msg) => (
          <tr key={msg.id}>
            <td>{msg.id}</td>
            <td>{msg.titulo}</td>
            <td>{msg.mensagem}</td>
            <td>{msg.data}</td>
            <td>{msg.privacidade}</td>
            <td>
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={() => onEdit(msg)}
              >
                Editar
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(msg.id)}
              >
                Excluir
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MessageTable;