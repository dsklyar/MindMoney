const payments = (state = [], action) => {
  console.log(action);
  switch(action.type) {
    case "SAVE_PAYMENT": {
      return [
        ...state,
        action.payload
      ];
    }
    default: {
      return state;
    }
  }
};

export default payments;
