import 'dotenv/config'

export default {
  expo: {
    name: 'city-diary',
    slug: 'city-diary',
    privacy: 'public',
    // platforms: ['ios', 'web'],
    description:
      'A mobile app that allows users to create and explore captured geolocated sound.',
    version: '1.0.0',
    icon: './assets/cityDiary_building.png',
    splash: {
      image: './assets/cityDiary_building.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    // ios: {
    //   bundleIdentifier: 'com.cityDiary',
    //   googleServicesFile: './GoogleService-Info.plist',
    // },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseUrl: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    },
  },
  name: 'city-diary',
}
