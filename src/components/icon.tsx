import {
  CaretDown as PhCaretDown,
  List as PhList,
  X as PhX,
} from "@phosphor-icons/react/dist/ssr";
import type { IconProps as PhosphorIconProps } from "@phosphor-icons/react";
import {
  Bathtub,
  Bed,
  Buildings,
  ChartBar,
  Envelope,
  FolderSimple,
  FrameCorners,
  Globe,
  Heart,
  House,
  InstagramLogo,
  LinkedinLogo,
  MagnifyingGlass,
  MapPin,
  Phone,
  PinterestLogo,
  ShieldCheck,
  Tag,
  UserCircle,
  UsersThree,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
export type IconName =
  | "heart"
  | "globe"
  | "shield"
  | "user"
  | "bed"
  | "bath"
  | "area"
  | "house"
  | "tag"
  | "chart"
  | "pin"
  | "folder"
  | "people"
  | "buildings"
  | "phone"
  | "mail"
  | "search"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "pinterest";

const registry: Record<IconName, React.ComponentType<PhosphorIconProps>> = {
  heart: Heart,
  globe: Globe,
  shield: ShieldCheck,
  user: UserCircle,
  bed: Bed,
  bath: Bathtub,
  area: FrameCorners,
  house: House,
  tag: Tag,
  chart: ChartBar,
  pin: MapPin,
  folder: FolderSimple,
  people: UsersThree,
  buildings: Buildings,
  phone: Phone,
  mail: Envelope,
  search: MagnifyingGlass,
  instagram: InstagramLogo,
  linkedin: LinkedinLogo,
  youtube: YoutubeLogo,
  pinterest: PinterestLogo,
};

type IconProps = PhosphorIconProps & { name: IconName };

export function Icon({ name, ...props }: IconProps) {
  const Component = registry[name];
  return <Component weight="light" aria-hidden {...props} />;
}

export function CaretDown(props: PhosphorIconProps) {
  return <PhCaretDown weight="bold" aria-hidden {...props} />;
}

export function MenuIcon(props: PhosphorIconProps) {
  return <PhList weight="light" aria-hidden {...props} />;
}

export function CloseIcon(props: PhosphorIconProps) {
  return <PhX weight="light" aria-hidden {...props} />;
}
