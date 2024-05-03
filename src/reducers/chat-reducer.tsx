export type chatState = {
  from: string;
  to: string;
  message: string;
  created_at: string;
}[];

export type chatAction = {
  type: "add-all" | "add";
  payload: chatState;
};

export function chatReducer(state: chatState, action: chatAction) {
  switch (action.type) {
    case "add-all":
      state = action.payload;
      return state;
    case "add":
      // state.push(action.payload[0]);
      return [...state, action.payload[0]];
    default:
      return state;
  }
}
