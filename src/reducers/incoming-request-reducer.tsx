type incomingRequestState = {
  id_friendship: string;
  photo_profile: string;
  fullname: string;
  created_at: Date;
  status: string;
}[];

export type actionRequestState = {
  type: "delete";
  payload?: {
    id_friendship?: string;
  };
};

export function incomingRequestReducer(
  state: incomingRequestState,
  action: actionRequestState
) {
  switch (action.type) {
    case "delete":
      return state.filter(
        (ir) => ir.id_friendship !== action.payload?.id_friendship
      );
    default:
      return state;
  }
}
