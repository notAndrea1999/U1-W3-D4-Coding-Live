// Partiamo a definire i task del Calendario

// 1) cercare di capire quante celle creare per il mese corrente ( da considerare gli anni bisestili )

// 2) con l'esatto numero di giorni dovremo generare il numero corrispondente di celle nel calendario

// 3) visualizzare il nome del mese nell'h1

// 4) il giorno corrente dovrebbe "illuminarsi"

// 5) Rendere cliccabili le celle per poter salvare gli appuntamenti in quel dato giorno (applicare un bordo alla selezione)

// ______________________________________________________________________________

// 6) modificare meeting day con il giorno selezionato

// 7) salvare appuntamento con ora, stringa nel giorno selezionato

// 8) devo poter selezionare altri giorni e tornare a visualizzare il precedente con i suoi appuntamenti

// ______________________________________________________________________________

const appointments = [];

/* [
  [],[],[],[],[],[],[],
  [],[],[],[],[],[],[],
  [],[],[],["02:00 - test"],[],[],[],
  [],[],[],[],[],[],[],
] */

const monthNames = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

const now = new Date(); // creo la data per il momento attuale del caricamento della pagina

const daysInThisMonth = () => {
  const getYear = now.getFullYear(); // 2023
  const getMonth = now.getMonth(); // 6 per Luglio
  // getMonth() su una data ritorna l'indice numerico del mese in corso, partendo da 0
  // quello di cui ho bisogno è ottenere l'ULTIMO giorno valido del mese corrente
  // perchè tale numero corrisponde anche al numero di giorni totali del mese!

  // per ottenere l'ultimo momento valido del mese in corso, mi genero una data in cui
  // fornisco l'anno corrente, il mese SUCCESSIVO e _rimuovo_ un giorno
  const lastDayDate = new Date(getYear, getMonth + 1, 0); // oggetto che mi rappresenta l'istantanea del giorno ultimo di luglio
  // ottengo L'ULTIMO GORNO del mese PRECEDENTE! (molto convenientemente)
  const lastDayOfThisMonth = lastDayDate.getDate(); // 31 per luglio

  console.log("LAST DAY", lastDayOfThisMonth);

  return lastDayOfThisMonth;
};

const printCurrentMonthInH1 = function () {
  const title = document.querySelector("h1"); // seleziono l'h1
  const monthIndex = now.getMonth(); // indice del mese corrente, partendo da 0, questo mese ci darà 6
  const currentMonthText = monthNames[monthIndex]; // oggi dà Luglio, la stringa contenuta nell'array dei nomi dei mesi: monthNames

  title.innerText = currentMonthText;
};

const unselectPrevious = function () {
  // funzione chiamata dentro createDays() in dayCellDiv.onclick
  const previouslySelected = document.querySelector(".selected"); // precedente cella "selected", null se è il primo click in assoluto su una cella

  if (previouslySelected) {
    // finiamo qui se il mio click non è il primo della pagina e c'è già un precedente selected...
    previouslySelected.classList.remove("selected"); // rimuovo la classe all'elemento trovato
  }
};

const changeDayNumber = function (dayIndex) {
  // questa funzione si occuperà di cambiare il testo nello span con id "newMeetingDay"
  // con l'indice della cella che abbiamo cliccato + 1, per avere un numero in base 1 corrispondente al numero della cella
  // selezioniamo lo span
  const dayNumberSpan = document.getElementById("newMeetingDay");
  dayNumberSpan.innerText = dayIndex + 1;

  dayNumberSpan.classList.add("hasDay"); // dà uno stile più carino al numero una volta cambiato il testo
};

const showAppointments = function (dayPosition) {
  // questa funzione si occuperà di:
  // - prelevare gli appuntamenti (stringhe) dallo spazio dello scaffale del giorno corrispondente: dayPosition
  const daysAppointments = appointments[dayPosition]; // seleziono il sotto-array corrispondente al giorno da visualizzare

  console.log(daysAppointments);

  const ulAppointments = document.getElementById("appointmentsList"); // riferimento al contenitore della lista <ul>

  ulAppointments.innerHTML = ""; // svuoto in ogni caso il contenitore: <ul></ul>

  // e creo tanti <li> quante stringhe ci sono nell'array del giorno: appointments[dayPosition]
  daysAppointments.forEach((appointmentStr) => {
    const newLi = document.createElement("li");
    newLi.innerText = appointmentStr;
    ulAppointments.appendChild(newLi); // pushamo i <li> in <ul>
  });

  // dovrà togliere il display: none; dal div relativo agli appuntamenti
  const appointmentsContainer = document.getElementById("appointments");
  appointmentsContainer.style.display = "block";
};

const saveMeeting = function (event) {
  event.preventDefault(); // evitiamo il refresh al click del bottone nel form
  // a questo punto siamo liberi di selezionare i dati che ci servono da salvare
  const meetingTime = document.getElementById("newMeetingTime"); // reference all'input type time
  const meetingName = document.getElementById("newMeetingName"); // reference all'input type text

  const meetingString = meetingTime.value + " - " + meetingName.value; // mi compongo la stringa con i valori dei due input

  const selectedDay = document.getElementById("newMeetingDay").innerText; // prendo il numero del giorno dallo span (è uguale al numero della cella)
  const dayIndex = parseInt(selectedDay) - 1; // lo converto a numero e lo trasformo in un indice in base 0 da usare con un array

  console.log("DAY INDEX", dayIndex);
  console.log("Meeting Text", meetingString);

  appointments[dayIndex].push(meetingString); // pusho nell'array corrispondente al giorno che è uno dei sotto-array di "appointments" precedentemente creato (vedi in cima alla pagina)
  // usiamo quindi l'indice estratto dal testo dello span del meetingDay per selezionare un sotto-array di un array che li contiene tutti

  // console.log(appointments);

  showAppointments(dayIndex); // abilito la sezione appuntamenti passando l'indice del giorno di cui visualizzeremo in basso gli appuntamenti

  // resettiamo i campi del form per evitare un'inserimento accidentale degli stessi dati
  meetingTime.value = "";
  meetingName.value = "";
};

const createDays = function (days) {
  // funzione richiamata a fondo pagina al caricamento della pagina nel browser

  const calendar = document.getElementById("calendar"); // riferimendo al div del calendario

  for (let i = 0; i < days; i++) {
    // utilizziamo questo ciclo per eseguire qualcosa un tot numero di volte === al numero in "days"
    appointments.push([]); // creiamo tanti spazi (sotto-array) nell'array appointments, per l'esatto numero di giorni che dobbiamo gestire
    // saranno array inizialmente vuoti che aspetteranno di ricevere le stringhe degli appuntamenti man mano che verranno creati

    const dayCellDiv = document.createElement("div"); // creo un nuovo div
    // <div></div>
    dayCellDiv.classList.add("day"); // gli do la classe per lo stile (visualizzarne 7 per linea e altri stili)
    // <div class="day"></div>

    // su OGNI cella del calendario agganciamo un eventListener, una funzione, per tutti diversa che quando clicchiamo la cella verrà eseguita
    dayCellDiv.onclick = function (event) {
      // console.log(i + 1, event);

      // questa funzione fa un po' di cose:

      unselectPrevious(); // deseleziona eventuali elementi selezionati al precedente click

      event.currentTarget.classList.add("selected"); // seleziona la cella corrente

      changeDayNumber(i); // cambia il numero in meetingDay in basso (nella zona degli appuntamenti)

      // controlla se ci sono appuntamenti nello stesso spazio corrispondente al giorno, tramite lo stesso indice che l'ha generato: appointments[i]
      if (appointments[i].length > 0) {
        // siamo qui se l'array del giorno cliccato ha elementi (stringhe)
        showAppointments(i); // sblocchiamo la sezione appointments e mostriamo i relativi appuntamenti come list-items
      } else {
        // siamo qui se l'array del giorno cliccato NON HA elementi
        // in tal caso nascondiamo di nuovo la sezione appointments
        const appointmentsContainer = document.getElementById("appointments");
        appointmentsContainer.style.display = "none";
      }
    };

    const cellValue = document.createElement("h3"); // creo h3
    // <h3></h3>
    cellValue.innerText = i + 1; // aggiungo il numero del giorno

    const today = now.getDate(); // leggo il valore ritornato dal chiedere all'oggetto now che giorno del mese è oggi

    // i + 1 mi darà 12 + 1 = 13, se oggi è 13 ci sarà corrispondenza..
    if (i + 1 === today) {
      // e finiremo qui, andando a colorare il giorno di oggi, che cambierà ad ogni prossimo giorno
      cellValue.classList.add("color-epic");
    }

    // inserimento di h3 in div
    dayCellDiv.appendChild(cellValue);
    // inserimento di div con h3 in calendar
    calendar.appendChild(dayCellDiv);
  }
};

const numberOfDays = daysInThisMonth(); // estraggo dalla funzione daysInThisMonth un valore numerico che passerò a createDays

printCurrentMonthInH1(); // eseguo il cambio di testo per l'h1 col nome del mese

createDays(numberOfDays); // eseguo il loop e l'assegnazione degli onclick agli elementi, con altri annessi e connessi :)

const formNode = document.querySelector("form"); // seleziono il form..
formNode.onsubmit = saveMeeting; // per agganciare al suo evento onsubmit la funzione saveMeeting
// che inserisce stringhe nei sotto array di appointments. L'evento viene scaturito dal click su un bottone type="submit"

// console.log("global scope");

// console.log("APPOINTMENTS", appointments);

// window.onload = function () {
// window.onload è il modo corretto di aspettare che la pagina si sia caricata prima di effettare un'operazione, che sia anche una selezione del DOM
//   console.log("page loaded");
// };
