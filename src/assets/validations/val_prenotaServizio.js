export function validateReservation(resValues, errValid) {
  let isValid = true;

  // Giorno e ora
  if (!resValues.giorno || !resValues.orario) {
    errValid.push("Scegli un giorno e un orario");
    isValid = false;
  }

  // Nome
  if (!resValues.nome) {
    errValid.push("Il campo 'nome' è richiesto!");
    isValid = false;
  } else if (resValues.nome.length < 2) {
    errValid.push("Il campo 'nome' è troppo corto!");
    isValid = false;
  } else if (resValues.nome.length > 50) {
    errValid.push("Il campo 'name' non può superare i 50 caratteri!");
    isValid = false;
  }

  // Telefono
  if (!resValues.telefono) {
    errValid.push("Il campo 'N° 'telefono' è richiesto!");
    isValid = false;
  }

  // N di persone
  if (!resValues.n_persone) {
    errValid.push("Seleziona una numero di ospiti!");
    isValid = false;
  } else if (resValues.n_persone < 1) {
    errValid.push("Il numero di persone deve essere almeno 1");
    isValid = false;
  }

  // Messaggio
  if (resValues.messaggio.length > 500) {
    errValid.push("Il messaggio non può superare i 50 caratteri");
    isValid = false;
  }

  return errValid;
}
