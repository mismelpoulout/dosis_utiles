import React, { useState } from 'react';
import { Typography, Paper, IconButton, TextField } from '@mui/material';
import { Delete, Save, Email } from '@mui/icons-material';

const NoteBox = () => {
  const [note, setNote] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setNote('');
    setIsSaved(false);
  };

  const handleShareByEmail = () => {
    const subject = 'Compartir nota';
    const body = encodeURIComponent(note);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };
  const redBackgroundStyle = {
    backgroundColor: '#85b282',
    padding: '10px',
    borderRadius: '5px',
  };
  return (
    <>
     <Paper style={redBackgroundStyle}>
        <Typography variant="body1" style={{ color: 'white' }}>
          Blog de ANOTACIONES
        </Typography>
      </Paper>
    <Paper style={{ padding: 16, marginBottom: 16 }}>
      {isEditing ? (
        <TextField
          fullWidth
          multiline
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Escribe tu nota aquí..."
        />
      ) : (
        <Typography>{note}</Typography>
      )}
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
        {isEditing ? (
          <IconButton onClick={handleSave}>
            <Save />
          </IconButton>
        ) : (
          <>
            <IconButton onClick={() => setIsEditing(true)}>
              Editar
            </IconButton>
            {isSaved && (
              <IconButton onClick={handleDelete}>
                <Delete />
              </IconButton>
            )}
            {isSaved && (
              <IconButton onClick={handleShareByEmail}>
                <Email />
              </IconButton>
            )}
          </>
        )}
      </div>
    </Paper>
 </>
  );
};

export default NoteBox;
