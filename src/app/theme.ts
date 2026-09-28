import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#0b1f4d',
    colorLink: '#0b1f4d',
    borderRadius: 10,
    fontSize: 15,
  },
  components: {
    Layout: {
      headerBg: '#0b1f4d',
      bodyBg: '#f5f6fa',
    },
    Menu: {
      darkItemBg: '#0b1f4d',
      darkItemSelectedBg: '#e6007e',
    },
  },
};

export default theme;