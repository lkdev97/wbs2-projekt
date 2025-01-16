# wbs2-projekt
=======
# WBS2-Projekt

IT2000 Webbasierte Systeme 2
Sommersemester 23  
**Gruppe 4:** Ganswint, Stefan, Ndong-Gomo, Cedric Junior, Skorbyashchenskyy, Dmytro, Lars Köhler
https://moodle.thm.de/course/view.php?id=5763

Dies ist das README-Dokument für das WBS2-Projekt, das im Rahmen der Prüfungsleistung für Aufgabenblatt 6 entwickelt wird. In diesem Projekt werden die folgenden Anforderungen umgesetzt:

## Anforderungen

- Spielerregistrierung: Jeder Spieler muss sich zunächst registrieren.
- Freundesliste: Spieler können andere Spieler als Freunde hinzufügen.
- Online-Status: Spieler können sehen, ob ihre Freunde online sind.
- Duelle: Spieler können ihre Freunde herausfordern und an Duellen teilnehmen.
- Quizduell-Funktion: Ein Duell besteht aus zehn Fragen mit jeweils vier Antwortmöglichkeiten.
- Statistik: Es wird eine Statistik bereitgestellt, in der Spieler ihre Gewinnrate und gegen wen sie gespielt haben einsehen können.
- Fragenverwaltung: Administratoren haben die Möglichkeit, Fragen zu verwalten.

Zusätzlich wird eine OpenAPI (Swagger)-Dokumentation implementiert, um die API-Routen zu testen. Die DTOs (Data Transfer Objects) werden mit den OpenAPI-Decorators ausgestattet.

## Technologien und Anforderungen

Das Projekt erfüllt die folgenden technischen und fachlichen Anforderungen:

1. Frontend-Framework: Es wird eines der folgenden Frontend-Frameworks verwendet: Angular, React oder Vue.
2. Backend-Framework: Das Backend wird mit NestJS entwickelt.
3. Datenbank: Die Daten werden mit TypeORM und SQLite persistiert.
4. Websockets: Websockets werden verwendet, um eine benutzerfreundliche Erfahrung zu bieten.
5. Autorisierung: Es wird eine passende Autorisierung mit Sessions und Rechten implementiert.
6. Statische Route: Das Frontend ist über eine statische Route von NestJS aus erreichbar, um das NestJS Session-System zu ermöglichen.

## Installation und Ausführung

Folgende Schritte sind erforderlich, um das Projekt lokal zum Laufen zu bringen:

1. Klone das Repository auf deinen lokalen Computer.
2. Gehe in das Verzeichnis des Frontend-Projekts (Angular, React oder Vue) und führe die entsprechenden Befehle zur Installation der Abhängigkeiten aus.
3. Gehe in das Verzeichnis des Backend-Projekts (NestJS) und führe die Befehle zur Installation der Abhängigkeiten aus.
4. Stelle sicher, dass eine lokale SQLite-Datenbank vorhanden ist und konfiguriere die Verbindungsinformationen im Backend.
5. Starte das Backend mit dem Befehl `npm run start` oder `npm run start:dev`.
6. Starte das Frontend mit dem Befehl `npm start` oder einem entsprechenden Befehl für das verwendete Framework.
7. Öffne einen Webbrowser und navigiere zur entsprechenden Adresse, um auf das Frontend zuzugreifen.

## API-Dokumentation

Die API-Dokumentation basierend auf der OpenAPI-Spezifikation kann unter folgender URL eingesehen werden: [API-Dokumentation](http://localhost:3000/api/docs).

Bitte beachte, dass das Projekt gemäß den Anforderungen der Vorlesung umgesetzt wurde und die Funktionen entsprechend implementiert sind.

Viel Spaß bei der Nutzung des revolutionären Mobile-Games!

