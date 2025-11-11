# Raun Backend 

This is the Node.js/Express backend that powers the Raun application. It's built to securely manage user authentication and act as a reliable gateway for fetching real-time trading data using the Zerodha Kite Connect API.

<img width="1005" height="415" alt="image" src="https://github.com/user-attachments/assets/b8492653-8612-4097-ac79-0609028c6f4c" />


My goal here was to create a robust, modular, and secure API layer so the frontend can focus purely on presentation.


### Prerequisites

You'll need Node.js and a MongoDB instance (local or hosted, like MongoDB Atlas) for persistent storage.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd Raun-Backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or 
    # bun install 
    ```

3.  **Environment Variables:**
    Create a file named `.env` in the root directory and add the following variables.

    | Variable | Description | Source |
    | :--- | :--- | :--- |
    | `PORT` | The port the server will run on (e.g., `3000`). | |
    | `MONGODB_URI` | Your MongoDB connection string. | |
    | `JWT_SECRET` | A long, complex string for signing JWT access tokens. | |
    | `ZERODHA_API_KEY` | Your personal Zerodha Kite API Key. | |
    | `ZERODHA_API_SECRET` | Your personal Zerodha Kite API Secret. | |

4.  **Start the server:**
    ```bash
    node server.js
    ```
    The server will start on the port specified in your `.env` file (e.g., `http://localhost:3000`).

##  Tech Stack & Architecture

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB via Mongoose 
* **Authentication:** jwt token with bcrypt.
* **Trading API:** zerodha kite.
* **Redis:** for invalidating access token .

##  Key Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user. |
| `POST` | `/api/auth/login` | Log in and receive an `accessToken` cookie. |
| `GET` | `/api/auth/logout` | Clear the session cookie and log out. |

### Zerodha Trading Data (`/pro`)

These endpoints handle the trading account connection and data retrieval. Most of the data endpoints are protected by the `verifyToken` middleware.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/pro/kitelogin` | Initiates the redirection for the Zerodha login flow. |
| `GET` | `/pro/callback` | Handles the OAuth callback from Zerodha, exchanges the `request_token` for an `access_token`. |
| `GET` | `/pro/profile` | Fetches the user's trading profile details. |
| `GET` | `/pro/holdings` | Retrieves current stock holdings. |
| `GET` | `/pro/positions` | Retrieves live positions data. |
| `GET` | `/pro/funds` | Fetches margin/funds data (equity margins). |

---
