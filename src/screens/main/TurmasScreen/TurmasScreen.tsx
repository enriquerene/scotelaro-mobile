import {Section} from "../../../components/modules/Section";
import {MiniCardTurma} from "../../../components/modules/MiniCardTurma";
import {MiniCardHorario} from "../../../components/modules/MiniCardHorario";
import ScreenContainer from "../../../components/modules/ScreenContainer";
import {Turma} from "../../../models";
import HorizontalScroller from "../../../components/modules/Scroller/HorizontalScroller";
import {useMemo} from "react";
import {XStack} from "tamagui";
import {HeroSection} from "../../../components/modules/HeroSection/HeroSection";
import {VerticalScroller} from "../../../components/modules/Scroller";

interface TurmasPorModalidade {
  [key: string]: Turma[];
}

interface TurmasScreenProps {
  turmas: Turma[];
}

export default ({turmas}: TurmasScreenProps) => {
  // Group turmas by modalidade name
  const turmasPorModalidade = useMemo<TurmasPorModalidade>(() => {
    const grouped: TurmasPorModalidade = {};
    for (const turma of turmas ?? []) {
      const modalidade = turma.modalidade?.nome ?? 'Outros';
      if (!grouped[modalidade]) grouped[modalidade] = [];
      grouped[modalidade].push(turma);
    }
    return grouped;
  }, [turmas]);

  // Sort modalidades alphabetically and return entries as [modalidade, turmas[]]
  const modalidadesOrdenadas = useMemo(() => {
    return Object.entries(turmasPorModalidade).sort(([a], [b]) => a.localeCompare(b));
  }, [turmasPorModalidade]);

  return (
    <ScreenContainer>
      <HeroSection title={"Turmas"} height={80} />
      <VerticalScroller paddingVertical={0} paddingHorizontal={12}>
        {modalidadesOrdenadas.map(([modalidadeNome, listaTurmas]) => {
          const modalidadeImage = listaTurmas[0]?.modalidade?.image as any;
          return (
            <Section titleColor={'$primary'} key={modalidadeNome} title={modalidadeNome} marginBottom={4} paddingBottom={0}>
              <XStack style={{alignItems: 'center'}}>
                <MiniCardTurma
                  key={`${modalidadeNome}-card`}
                  image={modalidadeImage}
                  title={""}
                  time={""}
                  days={""}
                  size={60}
                  overlayOpacity={30}
                />
                <HorizontalScroller marginLeft={8}>
                  {listaTurmas.map((turma) => (
                    <MiniCardHorario
                      key={turma.id}
                      horario={turma.horario}
                      dias={turma.dias}
                    />
                  ))}
                </HorizontalScroller>
              </XStack>
            </Section>
          );
        })}
      </VerticalScroller>
    </ScreenContainer>
  );
}
