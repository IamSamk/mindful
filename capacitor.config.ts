
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.mindful',
  appName: 'mindful-mcapp',
  webDir: 'dist',
  server: {
    url: "https://3c6430e4-5d37-4545-b4c5-3a87c161c451.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  ios: {
    contentInset: 'always',
    limitsNavigationsToAppBoundDomains: true,
    backgroundColor: "#FFFFFF"
  },
  android: {
    backgroundColor: "#FFFFFF",
    allowMixedContent: true,
    buildOptions: {
      keystorePath: null,
      keystorePassword: null,
      keystoreAlias: null,
      keystoreAliasPassword: null,
      releaseType: null,
      compileSdkVersion: 33,
      minSdkVersion: 22,
      targetSdkVersion: 33
    }
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FFFFFF"
    }
  }
};

export default config;
