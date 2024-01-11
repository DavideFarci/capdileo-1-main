export function monthConvert(mese) {
  const mesi = {
    gennaio: 1,
    febbraio: 2,
    marzo: 3,
    aprile: 4,
    maggio: 5,
    giugno: 6,
    luglio: 7,
    agosto: 8,
    settembre: 9,
    ottobre: 10,
    novembre: 11,
    dicembre: 12,
  };

  // Conversione da nome a numero
  if (typeof mese === "string") {
    if (mesi.hasOwnProperty(mese.toLowerCase())) {
      return mesi[mese.toLowerCase()];
    }
  }

  // Conversione da numero a nome
  for (const item in mesi) {
    if (mesi.hasOwnProperty(item) && mesi[item] == mese) {
      return item.charAt(0).toUpperCase() + item.slice(1);
    }
  }
}

export function numberInCalendar(dayOrMonth) {
  let calendarNum = "";
  if (dayOrMonth < 10) {
    const strDayOrMonth = dayOrMonth.toString();
    calendarNum = "0" + strDayOrMonth;
    return calendarNum;
  } else {
    return dayOrMonth;
  }
}
