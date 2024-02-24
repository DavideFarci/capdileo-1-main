export function order_validations(resValues, max, pez) {
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

  // Email
  if (!resValues.email) {
    errValid.push("Il campo 'Email' è richiesto!");
  } else if (!resValues.email.includes("@")) {
    errValid.push("Il campo 'Email' deve includere '@'");
  } else if (
    !(resValues.email.endsWith(".com") || resValues.email.endsWith(".it"))
  ) {
    errValid.push("Il campo 'Email' deve terminare con '.com' o '.it'");
  } else if (resValues.email.length < 5) {
    errValid.push("Il campo 'Email' deve contenere almeno 5 caratteri");
  }

  // Telefono
  if (!resValues.telefono) {
    errValid.push("Il campo 'N° 'telefono' è richiesto!");
  } else if (resValues.telefono.startsWith("+39")) {
    errValid.push("Il 'N° 'telefono' non deve contenere il prefisso '+39'");
  }

  // Messaggio
  if (resValues.messaggio.length > 500) {
    errValid.push("Il messaggio non può superare i 500 caratteri");
  } else if (resValues.messaggio && resValues.messaggio.length < 5) {
    errValid.push("Il messaggio deve essere di almeno 5 caratteri");
  }

  // Privacy
  if (!resValues.privacy) {
    errValid.push("Accetta i termini della privacy");
  }
  // pezzi
  if (pez[0] > max[0]) {
    errValid.push("Il numero di pezzi al taglio richiesto non è disponibile per quest'orario");
  }
  if (pez[1] > max[1]) {
    errValid.push("Il numero di pizze al taglio richiesto non è disponibile per quest'orario");
  }

  return errValid;
}
