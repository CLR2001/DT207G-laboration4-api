# ◈ Laboration 4 API
Detta repository innehåller ett API för laboration 4 i kursen DT207G.

Detta API hanterar sparandet och skapandet av användarkonton. För säkerhet sparas inga lösenord i ren text på databasen. Vissa routes på API är låsta och går endast att komma åt efter en lyckad autentisering med hjälp av jsonwebtoken.

## ⬀ Länk till API
API:et finns tillgängligt på följande URL: [https://lab4.api.clr-server.com/](https://lab4.api.clr-server.com/)

## ✦ Databas och Scheman
Detta API använder NoSQL-databassystemet MongoDB.

### 1. Users:
| Attribut | Data |
| :--- | :--- |
| username | { type: String, required: true, unique: true } |
| email | { type: String, required: true, unique: true } |
| password | { type: String, required: true } |

## ⚙ Användning
| Metod | Ändpunkt | Beskrivning |
| :--- | :--- | :--- |
| POST | `authentication/register` | Registrerar användare. |
| POST | `authentication/login` | Loggar in användare. | 
| GET | `authentication/verify` | Verifierar en token och returnerar status beroende på om verifieringen lyckades eller inte. |
| GET | `/secret` | Returnerar blob-data av en jpg |

Följande JSON-objekt behöver skickas med vid registrering:
```bash
{
    "username": "användarnamn",
    "email": "e-post",
    "password": "lösenord"
  }
```
Följande JSON-objekt behöver skickas med vid inloggning:
```bash
{
    "username": "användarnamn eller e-post",
    "password": "lösenord"
  }
```

## ⬢ Utvecklare
**Ludvig Rosenqvist** — *Student*
🔗 [GitHub](https://github.com/CLR2001)