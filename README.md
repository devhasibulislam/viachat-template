# ViaChat Template

> Chatting app allows you to communicate with your customers in web chat rooms.

# Features

## Pages

- Authentication
  - Login
  - Registration x OTP
  - Reset x Password

## Notable

- OTP & Reset link confirm by Email
- Intuitive and Responsive design

# Tech Stack

## Frontend

## Backend

# Development

```bash
git clone https://github.com/devhasibulislam/viachat-template.git
cd viachat-template

cd client
npm install

cd ..

cd server
npm install
```

## Client `.env.local`

```bash
NEXT_PUBLIC_BASE_URL="http://localhost:8080/api"
```

## Server `.env`

```bash
PORT=8080
ORIGIN_URL="http://localhost:3000"

APP_NAME="ViaChat"
TOKEN_EXPIRY="1h"
TOKEN_SECRET="676b21729d60b85dcfba950ab7cb4c49909ef52935ac61fd8a1aebf61752692b"
ATLAS_URI=""

MAIL_HOST="smtp.gmail.com"
MAIL_USER=""
MAIL_PASS=""

CLOUD_NAME=""
API_KEY=""
API_SECRET=""
```

# Links

- [x] Client - [https://viachatt.vercel.app](https://viachatt.vercel.app)
- [x] Server - [https://api-viachat.vercel.app](https://api-viachat.vercel.app)

# Author

- [Hasibul Islam](https://bento.me/devhasibulislam)
