export function order_validations(resValues, errValue) {
  let isValid = true;

  // Giorno e ora
  if (!resValues.giorno || !resValues.orario) {
    errValid = "Scegli un giorno e un orario";
    isValid = false;
  }

  // Nome
  if (!resValues.nome) {
    errValid = "Il campo 'nome' è richiesto!";
    isValid = false;
  } else if (resValues.nome.length < 2) {
    errValid = "Il campo 'nome' è troppo corto!";
    isValid = false;
  } else if (resValues.nome.length > 50) {
    errValid = "Il campo 'name' non può superare i 50 caratteri!";
    isValid = false;
  }

  // Telefono
  if (!resValues.telefono) {
    errValid = "Il campo 'N° 'telefono' è richiesto!";
    isValid = false;
  } else if (resValues.telefono.length !== 10) {
    errValid = "Il campo 'N° 'telefono' deve essere di 10 cifre!";
    isValid = false;
  }

  // N di persone
  if (!resValues.n_persone) {
    errValid = "Seleziona una numero di ospiti!";
    isValid = false;
  } else if (resValues.n_persone < 1) {
    errValid = "Il numero di persone deve essere almeno 1";
    isValid = false;
  }

  // Messaggio
  if (resValues.messaggio.length > 500) {
    errValid = "Il messaggio non può superare i 50 caratteri";
    isValid = false;
  }

  return isValid;
}
