# MediCount Tracker

Make sure you have the following software installed:
- [NodeJS](https://nodejs.org/en/download/package-manager)
- [Expo Go](https://expo.dev/go) (mobile device)

## Build Instructions

1. Clone the repository on the main branch using the git clone command.

2. Initialize a new [Firebase](https://console.firebase.google.com/) web app project. Within the <em>FirebaseConfig.ts</em> file in the project directory, replace the existing <strong>firebaseConfig</strong> with your own values.

3. Enable the Firebase Authentication service via email and password.

4. Enable the Firestore Database service. When creating the database, you may start in either test mode or production mode. If using production mode, adjust your Firestore security rules to the code below:
    ```
    service cloud.firestore {
        match /databases/{database}/documents {
            match /users/{uid}/{document=**} {
                allow read, write: if request.auth != null && request.auth.uid == uid;
            }
        }
    }
    ```

5. From the main project directory in a command line, issue the following command to install all required dependencies:
    ```
    npm install
    ```

6. In the project, there should be an <em>.env.example</em> file. Copy that file and rename it to <em>.env</em>. This is where your private environmental variables and secrets are stored. Get a Roboflow API key from the [API Docs](https://universe.roboflow.com/abstract/pillcount/model/3/documentation) section. If you do not see one, you may have to create a new account. Change the value of the environmental variable in the <em>.env</em> file.

## Execution Instructions

1. Make sure your environment variables are already set up in the private <em>.env</em> file.

2. In a terminal instance, navigate to the base project directory and issue the following command:
    ```
    npx expo start
    ```

3. After a few seconds, a QR code should show up. Scan that QR code with your mobile device's camera. It should prompt you to open Expo Go. After navigating to Expo Go, the application should be up and running.