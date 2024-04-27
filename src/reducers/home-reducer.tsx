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

type homeAction = {
  type: "add";
  payload: chatListState;
};

export function homeReducer(state: chatListState, action: homeAction) {
  switch (action.type) {
    case "add":
      state = action.payload;
      return state;
    default:
      return state;
  }
}
