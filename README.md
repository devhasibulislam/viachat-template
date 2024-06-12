# Via Chat Template

> Chatting app allows you to communicate with your customers in web chat rooms!

# Development

> You can use it by making it your own!

## Reference

- [x] Inspiration Link: [Click Here](https://themesbrand.com/chatvia-tailwind/layouts/index.html)
- [x] Client Side Link: [Click Here](https://viachat-template-csr.vercel.app)
- [x] Server Side Link: [Click Here](https://viachat-template-ssr.vercel.app)
- [x] `Postman` Collection Link: [Click Here](https://close-quarters-coworking.postman.co/workspace/ProjectX~c2dfb062-e262-42dd-a371-4dc370ab050a/collection/24099405-26a29e36-7117-4fd7-b393-dc45a85a0f39?action=share&creator=24099405)

## Clone Repository

```bash
git clone -b master https://github.com/devhasibulislam/viachat-template.git
cd viachat-template

cd client
yarn install

cd ..

cd server
yarn install
```

## Setting Up Environment

> Environment setting that let your project completely done!

### `Client` `.env.local` Environment

```bash
NEXT_PUBLIC_BASE_URL="http://localhost:8080/api"
```

### `Server` `.env` Environment

```bash
# Port number
PORT=8080

# Origin URL
ORIGIN_URL="http://localhost:3000"

# MongoDB Atlas URI
APP_NAME="ViaChat"
ATLAS_URI="mongodb://localhost:27017/viachat-template"

# JWT secret
TOKEN_SECRET="8fd66885579f568092507e57a9336bb8"

# Cloudinary credentials
CLOUD_NAME="CLOUDINARY_CLOUD_NAME"
API_KEY="CLOUDINARY_API_KEY"
API_SECRET="CLOUDINARY_API_SECRET"

# Nodemailer Credentials
MAIL_HOST="smtp.gmail.com"
MAIL_USER="YOUR_EMAIL_ADDRESS"
MAIL_PASS="EMAIL_APP_PASSWORD"
```
