import { StorybookConfig } from "@storybook/react-native-web-vite";

const main: StorybookConfig = {
  stories: [
    "../src/components/base/**/*.stories.mdx",
    "../src/components/base/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/components/modules/**/*.stories.mdx",
    "../src/components/modules/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/components/templates/**/*.stories.mdx",
    "../src/components/templates/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-essentials"
  ],

  framework: {
    name: "@storybook/react-native-web-vite",
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};

export default main;
