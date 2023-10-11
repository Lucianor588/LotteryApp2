/* Lógica JavaScript */
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBBKsqGC59c-CAjjxeot3mfCbXeVJ91BTg",
  authDomain: "lotteryappproyect.firebaseapp.com",
  databaseURL: "https://lotteryappproyect-default-rtdb.firebaseio.com",
  projectId: "lotteryappproyect",
  storageBucket: "lotteryappproyect.appspot.com",
  messagingSenderId: "169735735392",
  appId: "1:169735735392:web:06de2f7bf1738846e21b05",
  measurementId: "G-R64MKPS2FG"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('recommendation-form');
    const number1Input = document.getElementById('number1');
    const number2Input = document.getElementById('number2');
    const number3Input = document.getElementById('number3');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const number1 = number1Input.value;
        const number2 = number2Input.value;
        const number3 = number3Input.value;

        // Guardar los números de recomendación en Firebase Realtime Database
        const dbRef = ref(database, 'recommendations');
        set(dbRef, { number1, number2, number3 })
            .then(() => {
                alert('Recomendaciones guardadas con éxito en Firebase.');
            })
            .catch((error) => {
                console.error('Error al guardar recomendaciones en Firebase:', error);
            });

        // Limpiar los campos después de guardar
        number1Input.value = '';
        number2Input.value = '';
        number3Input.value = '';
    
    const dbRef = ref(database, 'recommendations');
get(dbRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log('Datos en la base de datos de Firebase:', data);
    } else {
      console.log('No se encontraron datos en la base de datos de Firebase.');
    }
  })
  .catch((error) => {
    console.error('Error al recuperar datos de Firebase:', error);
  });
    // Recuperar los números de recomendación almacenados en el LocalStorage
    const storedRecommendations = localStorage.getItem('recommendations');
    if (storedRecommendations) {
        try {
            const recommendations = JSON.parse(storedRecommendations);
            number1Input.value = recommendations.number1 || '';
            number2Input.value = recommendations.number2 || '';
            number3Input.value = recommendations.number3 || '';
        } catch (error) {
            console.error('Error al parsear los números de recomendación:', error);
        }
    }
});
/* Fin de lógica JavaScript */