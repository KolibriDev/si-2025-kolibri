import { theme } from "../Theme/theme";
import { Icon as IconType, Type } from "./iconMap";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const colors = theme.color;

export type Size = "small" | "medium" | "large";
export type IconMapType = Type;
export type IconMapIcon = IconType;

export interface IconProps {
  type?: Type;
  icon: IconType;
  title?: string;
  titleId?: string;
  color?: keyof typeof colors;
  useStroke?: boolean;
  size?: Size;
  className?: string;
  skipPlaceholderSize?: boolean;
  ariaHidden?: boolean;
}

export interface SvgProps {
  title?: string;
  titleId?: string;
  className?: string;
  width?: string;
  height?: string;
  fill?: string;
  color?: string;
}

export interface PlaceholderProps
  extends Pick<IconProps, "skipPlaceholderSize" | "className">,
    Required<Pick<IconProps, "size">> {}
