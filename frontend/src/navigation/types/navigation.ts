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
    GroupHome: undefined;       // 내가 가입한 그룹 목록
    GroupExplore: undefined;    // 미가입 그룹 탐색
    GroupCreate: undefined;     // 그룹 생성
    GroupDetail: { groupId: number }; // 상세
    GroupFeedCreate: { groupId: number; leaderId: number };//그룹 피드 생성
    FeedDetail: { feedId: number };                     //피드 상세
    GroupReviewCreate: { feedId: number };              //리뷰 생성
    GroupRequestInboxScreen: { groupId: number };                       //그룹 요청 수신함
};

