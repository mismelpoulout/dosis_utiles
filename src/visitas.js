// View.js
import React, { useState, useEffect } from 'react';
import firebase from './components/firebase';  // Ajusta la ruta según la ubicación real del archivo

const View = () => {
  const [visitas, setVisitas] = useState(0);

  useEffect(() => {
    const obtenerVisitasDesdeFirestore = async () => {
      const visitasRef = firebase.firestore().collection('contadorVisitas').doc('contador');

      try {
        const documento = await visitasRef.get();

        if (documento.exists) {
          setVisitas(documento.data().cantidad);

          // Llamada a la función para incrementar las visitas
          await incrementarVisitasEnFirestore();
        } else {
          console.error('El documento no existe.');
        }
      } catch (error) {
        console.error('Error al obtener el número de visitas desde Firestore', error);
      }
    };

    obtenerVisitasDesdeFirestore();
  }, []); // La dependencia vacía garantiza que el efecto se ejecute solo en el montaje

  const incrementarVisitasEnFirestore = async () => {
    const visitasRef = firebase.firestore().collection('contadorVisitas').doc('contador');
    try {
      // Usa la operación atómica 'update' para incrementar el contador
      await visitasRef.update({ cantidad: firebase.firestore.FieldValue.increment(1) });
    } catch (error) {
      console.error('Error al incrementar el contador de visitas en Firestore', error);
    }
  };

  return (
    <div>
      <h3>Visitas {visitas}</h3>
    </div>
  );
};

export default View;