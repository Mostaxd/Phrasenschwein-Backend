# Phrasenschwein-Backend

Dies ist ein Node.js-Server für das Phrasenschwein-Projekt. Der Server verbindet sich mit einer MySQL-Datenbank und stellt eine Reihe von REST-APIs bereit, um Mitarbeiteraufzeichnungen und -gebühren zu verwalten.

## Vorraussetzungen

- Node.js und npm
- MySQL

## Installation

1. Klonen Sie das Repository
2. Installieren Sie die Abhängigkeiten:
`cd phrasenschwein`
`npm install`

3. Erstellen Sie eine MySQL-Datenbank und konfigurieren Sie die Verbindungseinstellungen im `mysqlConnection`-Objekt in `server.js`.

4. Starten Sie den Server: `node server.js`

## API-Endpunkte

Der Server stellt die folgenden API-Endpunkte bereit:

- `GET /employees`: Eine Liste aller Mitarbeiter abrufen.
- `GET /employees/:name`: Die Details eines Mitarbeiters mit dem angegebenen Namen abrufen.
- `POST /api/employees/:name`: Einen neuen Mitarbeiter mit dem angegebenen Namen hinzufügen.ssss
- `DELETE /employees/:name`: Einen Mitarbeiter mit dem angegebenen Namen löschen.
- `PUT /employees/:name/charge`: Einem Mitarbeiter mit dem angegebenen Namen eine Gebühr in Höhe von 1 € hinzufügen.
- `PUT /employees/reset`: Den Kontostand aller Mitarbeiter auf 0 € zurücksetzen.
- `GET /login/:name/:password`: Sich mit dem angegebenen Mitarbeiter-Namen und Passwort anmelden.

## License
Das Projekt ist unter der MIT License lizensiert.
