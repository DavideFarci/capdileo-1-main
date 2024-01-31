export function validateReservation(resValues) {
  let errValid = [];
  // Giorno e ora
  if (!resValues.giorno || !resValues.orario) {
    errValid.push("Scegli un giorno e un orario");
  }

  // Nome
  if (!resValues.nome) {
    errValid.push("Il campo 'nome' è richiesto!");
  } else if (resValues.nome.length < 2) {
    errValid.push("Il campo 'nome' è troppo corto!");
  } else if (resValues.nome.length > 50) {
    errValid.push("Il campo 'name' non può superare i 50 caratteri!");
  }

  // Telefono
  if (!resValues.telefono) {
    errValid.push("Il campo 'N° 'telefono' è richiesto!");
  }

  // N di persone
  if (!resValues.n_persone) {
    errValid.push("Seleziona una numero di ospiti!");
  } else if (resValues.n_persone < 1) {
    errValid.push("Il numero di persone deve essere almeno 1");
  }

  // Messaggio
  if (resValues.messaggio.length > 500) {
    errValid.push("Il messaggio non può superare i 50 caratteri");
  }

  return errValid;
}
