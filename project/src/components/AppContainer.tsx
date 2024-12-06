import * as React from "react";
import { BaseNavigationContainer } from '@react-navigation/core';
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { AuthScreen } from "./auth/AuthScreen";
import { HomeScreen } from "./HomeScreen";
import { CommunityScreen } from "./screens/CommunityScreen";
import { MessagesScreen } from "./screens/MessagesScreen";
import { EventsScreen } from "./screens/EventsScreen";

const StackNavigator = stackNavigatorFactory();

export function AppContainer() {
    return (
        <stackLayout className="h-full">
            <BaseNavigationContainer>
                <StackNavigator.Navigator
                    initialRouteName="Auth"
                    screenOptions={{
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: "#4F46E5"
                        },
                        headerTintColor: "white"
                    }}
                >
                    <StackNavigator.Screen
                        name="Auth"
                        component={AuthScreen}
                        options={{ headerShown: false }}
                    />
                    <StackNavigator.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ title: "Church Community" }}
                    />
                    <StackNavigator.Screen
                        name="Community"
                        component={CommunityScreen}
                        options={{ title: "Community" }}
                    />
                    <StackNavigator.Screen
                        name="Messages"
                        component={MessagesScreen}
                        options={{ title: "Messages" }}
                    />
                    <StackNavigator.Screen
                        name="Events"
                        component={EventsScreen}
                        options={{ title: "Events" }}
                    />
                </StackNavigator.Navigator>
            </BaseNavigationContainer>
        </stackLayout>
    );
}