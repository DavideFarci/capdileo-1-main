this.isValid = true;

// Nome
if (!this.reservationValues.nome) {
  this.nameError = "Il campo 'nome' è richiesto!";
  this.isValid = false;
} else if (this.name.length < 2) {
  this.nameError = "Il campo 'nome' è troppo corto!";
  this.isValid = false;
} else if (this.name.length > 50) {
  this.nameError = "Il campo 'name' non può superare i 50 caratteri!";
  this.isValid = false;
}

// Telefono
if (!this.reservationValues.telefono) {
  this.phoneError = "Il campo 'N° 'telefono' è richiesto!";
  this.isValid = false;
} else if (this.reservationValues.telefono.length !== 10) {
  this.phoneError = "Il campo 'N° 'telefono' deve essere di 10 cifre!";
  this.isValid = false;
}

// N di persone
if (!this.reservationValues.n_persone) {
  this.npersonError = "Seleziona una numero di ospiti!";
  this.isValid = false;
} else if (this.reservationValues.n_persone < 1) {
  this.npersonError = "Il numero di persone deve essere almeno 1";
  this.isValid = false;
}

// Messaggio
if (this.reservationValues.messaggio.length > 500) {
  this.messageError = "Il messaggio non può superare i 50 caratteri";
  this.isValid = false;
}

if (!this.isValid) {
  return;
}
