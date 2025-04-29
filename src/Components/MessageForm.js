import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const MessageForm = ({ onSave, editingMessage, cancelEdit }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    mensagem: '',
    data: '',
    privacidade: 'público'
  });

  useEffect(() => {
    if (editingMessage) {
      setFormData(editingMessage);
    } else {
      setFormData({ titulo: '', mensagem: '', data: '', privacidade: 'público' });
    }
  }, [editingMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ titulo: '', mensagem: '', data: '', privacidade: 'público' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="formTitulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formData">
            <Form.Label>Data</Form.Label>
            <Form.Control
              type="date"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="formMensagem">
        <Form.Label>Mensagem</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPrivacidade">
        <Form.Label>Privacidade</Form.Label>
        <Form.Select name="privacidade" value={formData.privacidade} onChange={handleChange}>
          <option value="público">Público</option>
          <option value="privado">Privado</option>
        </Form.Select>
      </Form.Group>
      <div className="d-flex justify-content-end">
        {editingMessage && (
          <Button variant="secondary" className="me-2" onClick={cancelEdit}>
            Cancelar
          </Button>
        )}
        <Button type="submit" variant="primary">
          {editingMessage ? 'Atualizar' : 'Salvar'}
        </Button>
      </div>
    </Form>
  );
};

export default MessageForm;