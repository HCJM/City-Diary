import { registerRootComponent } from 'expo';
import { seeding } from './seedDb/seeds';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

registerRootComponent(App);

//run the seeding function once, then comment it out as the dummy data will be stored in the fire store DB

// seeding()


