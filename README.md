# Uhmegle Video Integration Server

Questo server gestisce l'integrazione con uhmegle.com per il ripristino dei dati utente all'avvio delle videochiamate.

## Prerequisiti

- Node.js 14.x o superiore
- npm o yarn
- Un account su un servizio di hosting gratuito (es. Render, Railway, Heroku)
- Un repository GitHub

## Installazione

1. Clona il repository
   ```bash
   git clone https://github.com/tu-utente/uhmegle-video-integration.git
   cd uhmegle-video-integration
   ```

2. Installa le dipendenze
   ```bash
   npm install
   ```

3. Crea un file `.env` nella radice del progetto con le seguenti variabili:
   ```
   PORT=3000
   UHMEGLE_WEBHOOK_SECRET=tuo_segreto_sicuro
   NODE_ENV=production
   ```

## Avvio in locale

```bash
# Modalità sviluppo (con riavvio automatico)
npm run dev

# Modalità produzione
npm start
```

## Endpoint disponibili

- `GET /` - Pagina di benvenuto
- `GET /health` - Controllo stato del server
- `POST /api/webhooks/video-call` - Webhook per le videochiamate

## Deploy su Render (Gratuito)

1. Fai il fork di questo repository sul tuo account GitHub
2. Vai su [Render](https://render.com) e crea un nuovo "Web Service"
3. Connetti il tuo repository GitHub
4. Configura il servizio:
   - **Name**: uhmegle-video-integration (o un nome a tua scelta)
   - **Region**: Scegli il più vicino a te
   - **Branch**: main (o master)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `PORT`: 10000 (o quello che preferisci)
     - `UHMEGLE_WEBHOOK_SECRET`: il_tuo_segreto
     - `NODE_ENV`: production

5. Clicca su "Create Web Service"

## Configurazione di uhmegle.com

1. Vai alle impostazioni del tuo account su uhmegle.com
2. Aggiungi il seguente webhook URL: `https://tuo-servizio-render.onrender.com/api/webhooks/video-call`
3. Imposta il segreto del webhook come definito nella variabile `UHMEGLE_WEBHOOK_SECRET`

## Sicurezza

- Tutte le richieste ai webhook sono verificate tramite firma HMAC-SHA256
- Assicurati di mantenere segreto il tuo `UHMEGLE_WEBHOOK_SECRET`
- Non committare mai file `.env` su GitHub

## Licenza

Questo progetto è open source e disponibile sotto la [MIT License](LICENSE).