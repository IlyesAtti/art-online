Documentație Proiect: Art-Online
Descriere Generală
Art-Online este o aplicație web care permite utilizatorilor să creeze, să editeze și să vizualizeze postări. Utilizatorii pot adăuga imagini prin furnizarea unui link către imagine. De asemenea, postările pot fi marcate ca "Publicate" sau "Nepublicate" și vor fi afișate pe pagina principală doar cele publicate.

Cerințe de Sistem
Node.js v14 sau mai nou
NPM v6 sau mai nou (inclus cu Node.js)
MySQL v8.0 sau mai nou

Setare Inițială

1. Clonarea proiectului
Clonați proiectul din repository-ul său:

bash

git clone https://github.com/IlyesAtti/art-online.git
cd art-online

2. Configurarea MySQL
Creați o bază de date MySQL numită art-online:

sql

CREATE DATABASE art_online;
Configurați un utilizator MySQL și acordați acces la baza de date art_online:

sql

CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON art_online.* TO 'username'@'localhost';
FLUSH PRIVILEGES;

3. Configurarea Backend-ului
Navigați în directorul api:

bash

cd api
Instalați dependențele necesare:

bash

npm install
Configurați conexiunea la baza de date în src/app.module.ts:

typescript

TypeOrmModule.forRoot({
   type: 'mysql',
   host: 'localhost',
   port: 3306,
   username: 'username',  // Înlocuiți cu utilizatorul MySQL
   password: 'password',  // Înlocuiți cu parola MySQL
   database: 'art_online',
   entities: [User, Post],
   synchronize: true,
 }),

Rulați serverul backend:

bash

npm run start

4. Configurarea Frontend-ului
Navigați în directorul art-online:

bash

cd ../art-online
Instalați dependențele necesare:

bash

npm install
Configurați adresa backend-ului în src/config.js (dacă este necesar).

Rulați aplicația frontend:

bash

npm run dev

Funcționalități

Autentificare și Înregistrare: Utilizatorii se pot autentifica sau înregistra pentru a crea postări.
Crearea Postărilor: Utilizatorii autentificați pot crea postări noi, cu linkuri către imagini.
Editarea Postărilor: Utilizatorii pot edita postările existente, inclusiv schimbarea statusului între publicat/nepublicat.
Vizualizarea Postărilor Publicate: Pe pagina principală, utilizatorii pot vizualiza doar postările publicate.

Testare

Testarea Manuală: Aplicația poate fi testată manual prin accesarea interfeței web și utilizarea funcționalităților disponibile.
Testarea API: API-urile backend-ului pot fi testate utilizând Postman sau orice altă unealtă similară, pentru a trimite cereri HTTP și a verifica răspunsurile.

Depanare

Erori de Conexiune la Baza de Date: Verificați configurarea în app.module.ts și asigurați-vă că baza de date MySQL rulează și este accesibilă.
Erori de Autentificare: Verificați dacă cookie-urile sunt gestionate corect și că token-ul JWT este valid.

Posibile Îmbunătățiri

Finalizarea opțiunii de încărcare imagine.
Implementarea unui sistem de comentarii pentru postări.
Adăugarea unei funcționalități de căutare pentru postări.
Îmbunătățirea interfeței utilizatorului cu un design mai modern.

Live preview: https://www.loom.com/share/fe235d18d03a485faab8c88d36e465c0?sid=c9cdb429-64aa-4354-8f9c-bcb9c046138d