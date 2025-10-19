import React, { useEffect, useState } from "react";
import {
  Typography, Paper, IconButton, TextField, Tooltip,
  Snackbar, Alert, CircularProgress
} from "@mui/material";
import { Delete, Save, Email, Edit } from "@mui/icons-material";

import { db, ensureAnon, auth } from "./firebase"; // ← usamos ensureAnon correctamente
import {
  addDoc, collection, deleteDoc, doc, getDocs, limit,
  query, serverTimestamp, updateDoc, where,
} from "firebase/firestore";

export default function NoteBox() {
  const [uid, setUid] = useState(null);
  const [note, setNote] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [docId, setDocId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState({ open: false, type: "success", msg: "" });

  // 1) Garantiza sesión (anónima si no hay otra) y carga la nota del usuario
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setBusy(true);
        const user = await ensureAnon();             // ✅ INVOCADO, no .then sobre la función
        if (!mounted) return;
        const currentUid = user?.uid || auth.currentUser?.uid || null;
        setUid(currentUid);

        if (!currentUid) return;

        // carga 1 nota del usuario si existe
        const q = query(collection(db, "notes"), where("userId", "==", currentUid), limit(1));
        const snap = await getDocs(q);
        if (!mounted) return;
        if (!snap.empty) {
          const d = snap.docs[0];
          setDocId(d.id);
          const data = d.data();
          const text = data?.text || "";
          setNote(text);
          const hayTexto = text.trim().length > 0;
          setIsSaved(hayTexto);
          setIsEditing(!hayTexto);
        }
      } catch (e) {
        console.error(e);
        setToast({ open: true, type: "error", msg: "No se pudo cargar/abrir sesión." });
      } finally {
        if (mounted) setBusy(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleSave = async () => {
    if (!uid) {
      setToast({ open: true, type: "warning", msg: "No hay sesión. Recarga la página." });
      return;
    }
    if (!note.trim()) {
      setToast({ open: true, type: "warning", msg: "La nota está vacía." });
      return;
    }
    setBusy(true);
    try {
      if (docId) {
        await updateDoc(doc(db, "notes", docId), {
          text: note,
          userId: uid,                        // ✅ Respeta tus reglas
          updatedAt: serverTimestamp(),
        });
      } else {
        const ref = await addDoc(collection(db, "notes"), {
          text: note,
          userId: uid,                        // ✅ Respeta tus reglas
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        setDocId(ref.id);
      }
      setIsSaved(true);
      setIsEditing(false);
      setToast({ open: true, type: "success", msg: "Nota guardada en Firestore." });
    } catch (e) {
      console.error(e);
      setToast({ open: true, type: "error", msg: "Error al guardar en Firestore." });
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!uid || !docId) return;
    setBusy(true);
    try {
      await deleteDoc(doc(db, "notes", docId));
      setDocId(null);
      setNote("");
      setIsSaved(false);
      setIsEditing(true);
      setToast({ open: true, type: "success", msg: "Nota eliminada." });
    } catch (e) {
      console.error(e);
      setToast({ open: true, type: "error", msg: "No se pudo eliminar." });
    } finally {
      setBusy(false);
    }
  };

  const handleShareByEmail = () => {
    const subject = "Compartir nota";
    const body = encodeURIComponent(note);
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const disabledUI = !uid || busy;

  return (
    <Paper style={{ padding: 16, marginBottom: 16 }}>
      {!uid ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <CircularProgress size={22} /> <span>Conectando con Firestore…</span>
        </div>
      ) : isEditing ? (
        <TextField
          fullWidth
          multiline
          minRows={6}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Escribe tu nota aquí..."
        />
      ) : (
        <Typography sx={{ whiteSpace: "pre-wrap" }}>{note || "—"}</Typography>
      )}

      <div style={{ marginTop: 16, display: "flex", gap: 8, justifyContent: "flex-end", alignItems: "center" }}>
        {busy && <CircularProgress size={22} />}
        {isEditing ? (
          <Tooltip title="Guardar en Firestore">
            <span>
              <IconButton onClick={handleSave} disabled={disabledUI}>
                <Save />
              </IconButton>
            </span>
          </Tooltip>
        ) : (
          <>
            <Tooltip title="Editar">
              <span>
                <IconButton onClick={() => setIsEditing(true)} disabled={disabledUI}>
                  <Edit />
                </IconButton>
              </span>
            </Tooltip>

            {isSaved && (
              <Tooltip title="Eliminar">
                <span>
                  <IconButton onClick={handleDelete} disabled={disabledUI}>
                    <Delete />
                  </IconButton>
                </span>
              </Tooltip>
            )}

            {isSaved && (
              <Tooltip title="Compartir por email">
                <span>
                  <IconButton onClick={handleShareByEmail} disabled={disabledUI || !note.trim()}>
                    <Email />
                  </IconButton>
                </span>
              </Tooltip>
            )}
          </>
        )}
      </div>

      <Snackbar
        open={toast.open}
        autoHideDuration={2500}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.type}
          variant="filled"
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </Paper>
  );
}