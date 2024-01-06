export function validateReservation(resValues, errValid) {
  let isValid = true;

  // Giorno e ora
  if (!resValues.giorno || !resValues.orario) {
    errValid.dateError = "Scegli un giorno e un orario";
    isValid = false;
  }

  // Nome
  if (!resValues.nome) {
    errValid.nameError = "Il campo 'nome' è richiesto!";
    isValid = false;
  } else if (resValues.nome.length < 2) {
    errValid.nameError = "Il campo 'nome' è troppo corto!";
    isValid = false;
  } else if (resValues.nome.length > 50) {
    errValid.nameError = "Il campo 'name' non può superare i 50 caratteri!";
    isValid = false;
  }

  // Telefono
  if (!resValues.telefono) {
    errValid.phoneError = "Il campo 'N° 'telefono' è richiesto!";
    isValid = false;
  } else if (resValues.telefono.length !== 10) {
    errValid.phoneError = "Il campo 'N° 'telefono' deve essere di 10 cifre!";
    isValid = false;
  }

  // N di persone
  if (!resValues.n_persone) {
    errValid.npersonError = "Seleziona una numero di ospiti!";
    isValid = false;
  } else if (resValues.n_persone < 1) {
    errValid.npersonError = "Il numero di persone deve essere almeno 1";
    isValid = false;
  }

  // Messaggio
  if (resValues.messaggio.length > 500) {
    errValid.messageError = "Il messaggio non può superare i 50 caratteri";
    isValid = false;
  }

  if (!isValid) {
    return;
  }
}
