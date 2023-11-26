const theme = {
  color: {
    // primaryColor: "#0965AE",
    primaryColor: "teal",
    // secondColor: "#0781D4",
    secondColor: "rgba(27,145,162,0.9)",
    thirdColor: "rgba(0,128,128,0.1)",
    forthColor: "rgba(0,128,128,0.2)",
    blueColor: "#73C0DE",
    goldenColor: "#CCA70C",
    // orangeColor: "#F8806E",
    orangeColor: "rgba(214,101,101,0.7)",
    greenColor: "#97C8A8"
    // greenColor: "#795CCD"
  },
  textColor: {
    primaryColor: "#666666",
    secondColor: "rgba(244,244,244,1)",
    thirdColor: "#555555"
  },
  mixin: {
    btnHover: `
        color:white;
        border-radius: 10px;
        background-color: rgba(40,123,140,0.8);
        box-shadow: 3px 3px 2px  rgba(40, 123, 140, 0.6);
        &:hover {
        cursor: pointer;
          background-color: rgba(40,123,140,1);
        }
      `
  }
};

export default theme;
