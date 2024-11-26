# MediCount Tracker

## Build Instructions

1. Clone the repository on the main branch using the git clone command.

2. Make sure you have [NodeJS](https://nodejs.org/en/download/package-manager) installed as well as the Expo Go app on your mobile device.

3. Initialize a new Firebase project with Firebase Authentication and Firestore Database services enabled. Replace with your own instance code in the FirebaseConfig.ts file in the project directory.

4. Adjust your Firestore security rules to the code below.
```
    service cloud.firestore {
        match /databases/{database}/documents {
            match /users/{uid}/{document=**} {
                allow read, write: if request.auth != null && request.auth.uid == uid;
            }
        }
    }
```

5. From the main project directory in a command line, issue the following command to install required dependencies:
```
    npm install
```

6. In the project, there should be an .env.example file. Copy that file and rename it to .env. This is where your private environmental variables and secrets are stored. Get a Roboflow API key from the API docs section of [Roboflow](https://universe.roboflow.com/abstract/pillcount/model/3) for the pill counting feature. If you do not see one, you may have to create an account. Change the value of the environmental variable in the .env file.

## Execution Instructions
1. Make sure your environment variables are already set up in the .env file.

2. In a terminal instance, navigate to the base project directory and issue the following command:
```
    npx expo start
```

3. After a few seconds, a QR code should show up. Scan that QR code with your mobile device. It should prompt you to open in Expo Go. After going to Expo Go, the application should be up and running.