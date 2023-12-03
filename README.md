# Via Chat Template

> Chatting app allows you to communicate with your customers in web chat rooms!

# Development

> You can use it by making it your own!

## Reference

- [x] Inspiration Link: [Click Here](https://themesbrand.com/chatvia-tailwind/layouts/index.html)
- [ ] Client Side Link: [Click Here](https://viachat-template-csr.vercel.app)
- [ ] Server Side Link: [Click Here](https://viachat-template-ssr.vercel.app)

## Clone Repository

```bash
git clone -b master https://github.com/devhasibulislam/viachat-template.git
cd viachat-template

cd client
yarn install

cd server
yarn install
```

## Setting Up Environment

> Environment setting that let your project completely done!

### `Client` Environment

```bash
NEXT_PUBLIC_BASE_URL="http://localhost:8080/api"
```

### `Server` Environment

```bash
# Port number
PORT=8080

# Origin URL
ORIGIN_URL="http://localhost:3000"

# MongoDB Atlas URI
DB_Name="viachat-template"
ATLAS_URI="mongodb://localhost:27017/viachat-template"

# JWT secret
TOKEN_SECRET="8fd66885579f568092507e57a9336bb8"

# Cloudinary credentials
CLOUD_NAME="CLOUDINARY_CLOUD_NAME"
API_KEY="CLOUDINARY_API_KEY"
API_SECRET="CLOUDINARY_API_SECRET"

# Nodemailer Credentials
APP_SERVICE="GMAIL_APP_SERVICE"
APP_EMAIL="GMAIL_APP_EMAIL"
APP_PASSWORD="GMAIL_APP_PASSWORD"
```

# Installing TypeScript `Server`

```bash
yarn init
```

```bash
yarn add express typescript @types/node @types/express ts-node
```

```bash
yarn tsc --init
```

```bash
yarn add nodemon concurrently @types/cors -D
```

```bash
"scripts": {
    "build": "rimraf dist && yarn tsc",
    "prestart": "yarn run build",
    "start": "node dist/index.js",
    "preserve": "yarn run build",
    "serve": "concurrently \"yarn tsc -w\"  \"nodemon dist/index.js\""
},
```

# Author

- [Hasibul Islam](https://bento.me/devhasibulislam)
- [Sadia Khanum](https://www.facebook.com/devsadiakhan)
