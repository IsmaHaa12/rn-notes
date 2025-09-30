import React, { Suspense } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './src/theme';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = React.lazy(() => import('./src/screens/HomeScreen'));
const NotesScreen = React.lazy(() => import('./src/screens/NotesScreen'));
const EditNoteScreen = React.lazy(() => import('./src/screens/EditNoteScreen'));

export type RootStackParamList = {
  Tabs: undefined;
  EditNote: { id?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function HeaderLogo() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 6 }}>
      <Ionicons name='planet' size={18} color={colors.primary2} style={{ marginRight: 8 }} />
      <Text style={{ color: colors.text, fontWeight: '700' }}>Neon Notes</Text>
    </View>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0f172a', borderTopColor: colors.border },
        tabBarActiveTintColor: colors.primary2,
        tabBarInactiveTintColor: colors.muted,
      }}
    >
      <Tab.Screen
        name='Home'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name='home-outline' color={color} size={size} />,
        }}
      >
        {() => <HomeScreen />}
      </Tab.Screen>

      <Tab.Screen
        name='All'
        options={{
          title: 'All',
          tabBarIcon: ({ color, size }) => <Ionicons name='albums-outline' color={color} size={size} />,
        }}
      >
        {() => <NotesScreen showPinnedOnly={false} />}
      </Tab.Screen>

      <Tab.Screen
        name='Pinned'
        options={{
          title: 'Pinned',
          tabBarIcon: ({ color, size }) => <Ionicons name='star-outline' color={color} size={size} />,
        }}
      >
        {() => <NotesScreen showPinnedOnly={true} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.bg,
    card: '#0f172a',
    text: colors.text,
    primary: colors.primary,
    border: colors.border,
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={MyTheme}>
          <StatusBar style='light' translucent={false} backgroundColor='#0f172a' />
          <Suspense fallback={<Text style={{ padding: 16, color: colors.text }}>Loading…</Text>}>
            <Stack.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: '#0f172a', height: 72 },
                headerTitle: () => <HeaderLogo />,
                headerTitleAlign: 'left',
                headerTintColor: colors.text,
                headerShadowVisible: false,
              }}
            >
              <Stack.Screen name='Tabs' component={Tabs} />
              <Stack.Screen name='EditNote' component={EditNoteScreen} options={{ title: 'Edit Note' }} />
            </Stack.Navigator>
          </Suspense>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
