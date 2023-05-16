const theme = {
  color: {
    // primaryColor: "#0965AE",
    primaryColor: "teal",
    // secondColor: "#0781D4",
    secondColor: "rgba(27,145,162,0.9)",
    thirdColor: "rgba(0,128,128,0.2)",
    blueColor: "#73C0DE",
    goldenColor: "#CCA70C",
    // orangeColor: "#F8806E",
    orangeColor: "rgba(214,101,101,0.7)",
    greenColor: "#97C8A8"
    // greenColor: "#795CCD"
  },
  textColor: {
    primaryColor: "#666666",
    secondColor: "#ffffff",
    goldenColor: "#FCCA00"
  },
  mixin: {
    btnHover: `
        background-color: rgba(40,123,140,0.8);
        &:hover {
        cursor: pointer;
          background-color: rgba(40,123,140,1);
        }
      `
  }
};

export default theme;
