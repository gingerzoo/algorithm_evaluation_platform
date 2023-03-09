const theme = {
  color: {
    primaryColor: "#447ED9",
    secondColor: "#plum"
  },
  textColor: {
    primaryColor: "#666666",
    secondColor: "#ffffff"
  },
  mixin: {
    boxShadow: `
      transition:box-shadow 200ms ease;

      &:hover{
          box-shadow:0 2px 4px rgba(0,0,0,.18);
      }`
  }
};

export default theme;
