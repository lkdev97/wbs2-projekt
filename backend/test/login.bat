@ECHO OFF
curl -X POST "http://localhost:3000/login" -H "Content-Type: application/json" -d "{\"username\": \"neuer_benutzer\", \"password\": \"passwort\"}"
