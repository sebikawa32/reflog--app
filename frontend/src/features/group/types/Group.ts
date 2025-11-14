export type GroupMember = {
    id: number;
    joinedAt: string;
    user: {
        id: number;
        nickname: string;
    };
};

export type Group = {
    id: number;
    groupName: string;
    description?: string;
    members?: GroupMember[];
};
