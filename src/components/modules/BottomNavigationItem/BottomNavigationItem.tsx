import LabeledIcon from '../../base/LabeledIcon';
import {
  CircleDollarSign, DollarSign, BadgeDollarSign,
  Group, Users2,
  Calendar, Calendar1,
  MessageSquareText,
  User2
} from '@tamagui/lucide-icons';
import {ReactElement} from "react";
import type { IconComponent } from 'tamagui';

interface BottomNavigationItemProps {
  active?: boolean;
  name: string;
}

interface NameInterface {
  label: string;
  icon: ReactElement | IconComponent;
}
interface NamesMapInterface {
  [key: string]: NameInterface;
}

const BottomNavigationItem: React.FunctionComponent<BottomNavigationItemProps> = ({ name, active }: BottomNavigationItemProps) => {
  const names: NamesMapInterface = {
    financeiro: {label: 'Financeiro', icon: CircleDollarSign},
    agenda: {label: 'Agenda', icon: Calendar},
    turmas: {label: 'Turmas', icon: Users2},
    perfil: {label: 'Perfil', icon: User2},
    notificacoes: {label: 'Notificações', icon: MessageSquareText},
  };
  const Icon: React.ReactElement | IconComponent = name in names ? names[name].icon : DollarSign;
  const label: string = name in names ? names[name].label : name;
  const getColor: () => string = () => (active ? '$primary' : 'white');
  return <LabeledIcon icon={<Icon size="$h4" color={getColor()} />} label={label} color={getColor()} bold={active} />
}

export default BottomNavigationItem;