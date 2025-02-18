export type chatListState = {
  email: string;
  fullname: string;
  id: string;
  id_friendship: string;
  photo_profile: string;
  username: string;
  message?: string;
  from?: string; // FROM means the one who send the message
  created_at?: Date;
}[];

export type homeAction = {
  type: "add";
  payload: chatListState;
};

export function homeReducer(state: chatListState, action: homeAction) {
  switch (action.type) {
    case "add":
      return [...action.payload];
    default:
      return state;
  }
}
