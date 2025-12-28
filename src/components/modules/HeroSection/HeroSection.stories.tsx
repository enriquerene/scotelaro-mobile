import {HeroSection} from "./HeroSection";
import {Meta} from "@storybook/react";

const meta: Meta<typeof HeroSection> = {
  title: 'Modules/HeroSection',
  component: HeroSection,
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text to be displayed',
    },
    titleColor: {
      control: 'color',
      description: 'Optional title color',
    },
    backgroundImage: {
      control: 'text',
      description: 'Optional background image source URL',
    },
    backgroundColor: {
      control: 'color',
      description: 'Optional background color',
    },
    overlayRGBA: {
      control: 'text',
      description: 'Optional overlay color in RGBA format (e.g., "rgba(0,0,0,0.5)")',
    },
  },
  args: {
    title: 'Example Hero Title',
  },
}

export default meta;
export const Default = {
  args: {
    title: 'Example Hero Title',
  }
};
export const WithBackgroundImage = {
  args: {
    title: 'Example Hero Title',
    titleColor: 'black',
    backgroundImage: 'https://placehold.co/600x400',
  }
};

export const WithSolidBackgroundAndOverlay = {
  args: {
    title: 'Example Hero Title',
    titleColor: '$success',
    backgroundColor: '$primary',
    overlayRGBA: 'rgba(255,255,255,0.5)',
  }
}