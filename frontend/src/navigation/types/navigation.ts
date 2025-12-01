export type HomeStackParamList = {
    Home: undefined;
    ReviewDetail: { review: any };
    ReviewWrite: undefined;
    ReviewEdit: { review: any };
    Feed: undefined;
    FollowList: { userId: number; type: "followers" | "followings" };
    UserProfile: { userId: number };
    SearchUser: undefined;
};

export type GroupStackParamList = {
    GroupHome: undefined;
    GroupExplore: undefined;
    GroupCreate: undefined;
    GroupDetail: { groupId: number };
    GroupFeedCreate: { groupId: number; leaderId: number };
    FeedDetail: { feedId: number };
    GroupReviewCreate: { feedId: number };
    GroupRequestInbox: { groupId: number };   //  수정
};


export type UserStackParamList = {
    MyPageHome: undefined;
    ProfileEdit: undefined;
};

