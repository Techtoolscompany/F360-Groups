export type MainStackParamList = {
    Home: undefined;
    Community: undefined;
    Messages: undefined;
    Events: undefined;
    CourseDetails: {
        courseId: string;
    };
    Profile: {
        userId: string;
    };
    GroupChat: {
        groupId: string;
    };
};