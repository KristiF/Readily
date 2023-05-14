Welcome to Readily, the service that fetches and summarizes the latest articles for you. 

In readArticles we have a python script which fetches, summarizes, and categorizes the articles which are then pushed to the database. 
In readily-app, we have the web app. 

#Setup:

The firebase config keys are stored as environment variables in the file readily-app/.env.local. The file has the following format: 

NEXT_PUBLIC_FIREBASE_PROJECT_ID=""

NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL=""

NEXT_PUBLIC_FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n-----END PRIVATE KEY-----\n"

NEXT_PUBLIC_FIREBASE_API_KEY=""

NEXT_PUBLIC_AUTH_DOMAIN=""

NEXT_PUBLIC_FIREBASE_PROJECT_ID=""

NEXT_PUBLIC_STORAGE_BUCKET=""

NEXT_PUBLIC_MESSAGING_SENDERID=""

NEXT_PUBLIC_APP_ID=""

After that the app can be ran from "readily-app" by running "npm run dev" in the console. In order to build it, you run "npm run build" in the cli.
