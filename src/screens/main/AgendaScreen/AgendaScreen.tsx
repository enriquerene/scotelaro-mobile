import React, {useMemo, useState} from 'react';
import ScreenContainer from '../../../components/modules/ScreenContainer';
import {HeroSection} from '../../../components/modules/HeroSection/HeroSection';
import {Section} from '../../../components/modules/Section';
import HorizontalScroller from '../../../components/modules/Scroller/HorizontalScroller';
import {VerticalScroller} from '../../../components/modules/Scroller';
import {MiniCardEvento, MiniCardEventoPlaceholder} from '../../../components/modules/MiniCardEvento';
import {Evento} from '../../../models';
import {Calendar, DateData, MarkedDates} from 'react-native-calendars';
import {YStack} from 'tamagui';

interface AgendaScreenProps {
  eventos: Evento[];
}

// Converts 'dd/MM' (e.g. '15/10') to ISO 'YYYY-MM-DD' using current year
function ddmmToISO(date: string, baseYear = new Date().getFullYear()): string | null {
  const match = date.match(/^(\d{1,2})\/(\d{1,2})$/);
  if (!match) return null;
  const [_, d, m] = match;
  const day = String(parseInt(d, 10)).padStart(2, '0');
  const month = String(parseInt(m, 10)).padStart(2, '0');
  return `${baseYear}-${month}-${day}`;
}

export default function AgendaScreen({eventos}: AgendaScreenProps) {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  const {markedDates, eventsByDay} = useMemo(() => {
    const marks: MarkedDates = {};
    const byDay: Record<string, Evento[]> = {};
    for (const ev of eventos ?? []) {
      const iso = ddmmToISO(ev.date);
      if (!iso) continue;
      marks[iso] = {
        marked: true,
        dotColor: '#F59E0B',
        selected: selected === iso,
        selectedColor: '#111827',
      } as any;
      if (!byDay[iso]) byDay[iso] = [];
      byDay[iso].push(ev);
    }
    if (selected && marks[selected]) {
      // ensure selected styling when user taps a day even if it had no event earlier
      marks[selected] = {
        ...(marks[selected] as any),
        selected: true,
        selectedColor: '#111827',
      } as any;
    }
    return {markedDates: marks, eventsByDay: byDay};
  }, [eventos, selected]);

  const handleDayPress = (day: DateData) => {
    setSelected(day.dateString);
  };

  const eventsToShow = useMemo(() => {
    if (selected && eventsByDay[selected]?.length) return eventsByDay[selected];
    // If no selection or selected day has no events, show all marked events
    return Object.keys(eventsByDay)
      .sort()
      .flatMap((k) => eventsByDay[k]);
  }, [selected, eventsByDay]);

  return (
    <ScreenContainer>
      <HeroSection title="Agenda" height={80} />
      <YStack paddingHorizontal={12}>
        <Calendar markedDates={markedDates} onDayPress={handleDayPress} />
        <Section title="Na sua Agenda" titleColor={'$primary'} paddingTop={0}>
          <HorizontalScroller>
            {(eventsToShow ?? []).length === 0 ? (
              <MiniCardEventoPlaceholder />
            ) : (
              (eventsToShow ?? []).map((ev) => (
                <MiniCardEvento
                  key={ev.id}
                  title={ev.title}
                  date={ev.date}
                  time={ev.time}
                  address={ev.address}
                />
              ))
            )}
          </HorizontalScroller>
        </Section>
      </YStack>
    </ScreenContainer>
  );
}
