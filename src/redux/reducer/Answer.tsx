export const ininitalState = {
  data: [],
  loading: false,
  error: false,
};

export const answerReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_DATA":
      return {
        data: action.payload.data,
        loading: false,
        error: false,
      };
    case "REMOVE_DATA":
      return { data: [], loading: false, error: false };
    default:
      return state;
  }
};
