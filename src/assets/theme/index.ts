const theme = {
  color: {
    primaryColor: "#0965AE",
    secondColor: "#0781D4",
    blueColor: "#73C0DE",
    goldenColor: "#CCA70C",
    orangeColor: "#F8806E",
    greenColor: "#7BC55E"
  },
  textColor: {
    primaryColor: "#666666",
    secondColor: "#ffffff",
    goldenColor: "#FCCA00"
  },
  mixin: {
    btnHover: `
        background-color: #0781D4;
        &:hover {
        cursor: pointer;
          background-color: #0965AE;
        }
      `
  }
};

export default theme;
