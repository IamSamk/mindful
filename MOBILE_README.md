
# Mobile App Deployment Instructions

This project has been set up to work as a mobile application using Capacitor, which allows you to run your web app as a native iOS or Android application.

## Prerequisites

- Node.js and npm installed on your computer
- For iOS: Mac computer with Xcode installed
- For Android: Android Studio installed

## Getting Started

Follow these steps to run the app on a mobile device:

1. **Clone the repository to your local machine**
   ```
   git clone <your-github-repo-url>
   cd <your-repo-directory>
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Build the web app**
   ```
   npm run build
   ```

4. **Add iOS and/or Android platforms**
   
   For iOS:
   ```
   npx cap add ios
   ```
   
   For Android:
   ```
   npx cap add android
   ```

5. **Sync the web build with the native projects**
   ```
   npx cap sync
   ```

## Running on iOS (requires macOS)

1. **Open the iOS project in Xcode**
   ```
   npx cap open ios
   ```

2. **Select your device or simulator**
   In Xcode, select your physical device or simulator from the dropdown near the top left.

3. **Run the app**
   Click the play button in Xcode.

## Running on Android

1. **Open the Android project in Android Studio**
   ```
   npx cap open android
   ```

2. **Connect your Android device or start an emulator**

3. **Run the app**
   Click the play button in Android Studio.

## Important Note About App ID Changes

If you've previously created a native build with a different app ID and need to update it:

1. Remove the existing platforms:
   ```
   npx cap remove android
   npx cap remove ios
   ```

2. Re-add the platforms:
   ```
   npx cap add android
   npx cap add ios
   ```

3. Sync the changes:
   ```
   npx cap sync
   ```

This ensures the new app ID is properly applied to all native files.

## Making Changes

After making changes to the web code:

1. **Rebuild the web app**
   ```
   npm run build
   ```

2. **Sync changes to native projects**
   ```
   npx cap sync
   ```

3. **Run the app again**
   Follow the steps above for iOS or Android.

## Troubleshooting

If you encounter issues:

1. Make sure all dependencies are installed
2. Check that the build completed successfully
3. Ensure Capacitor sync was successful
4. For iOS, check that you have the right certificates and provisioning profiles
5. For Android, verify that USB debugging is enabled on your device

### Android-Specific Issues

If you see an error about `capacitor.settings.gradle` not existing:

1. Try removing the Android platform and adding it again:
   ```
   npx cap remove android
   npx cap add android
   ```

2. If that doesn't work, make sure your project structure is correct:
   ```
   npm run build
   npx cap sync
   ```

3. If issues persist, check that your Android Studio and Capacitor versions are compatible. You might need to update:
   ```
   npm install @capacitor/android@latest
   npm install @capacitor/core@latest
   npm install @capacitor/cli@latest
   npx cap sync
   ```

## Additional Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [iOS Development Guide](https://capacitorjs.com/docs/ios)
- [Android Development Guide](https://capacitorjs.com/docs/android)
