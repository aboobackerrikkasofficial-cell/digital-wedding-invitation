import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.smartwedding.app',
  appName: 'Smart Wedding',
  webDir: 'out',
  server: {
    // To use the static build (Standalone App), comment out the 'url' line below.
    // To use Live Reload (Development), uncomment 'url' and ensure it matches your laptop's IP.
    // url: 'http://10.39.230.105:3000', 
    cleartext: true,
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#fdfbf0",
      showSpinner: true,
      androidScaleType: "CENTER_CROP",
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#fdfbf0",
    }
  }
};

export default config;
