import {HeroSection} from "../../../components/modules/HeroSection/HeroSection";
import {Section} from "../../../components/modules/Section";
import CardResumoFinanceiro from "../../../components/modules/CardResumoFinanceiro";
import {MiniCardTurma} from "../../../components/modules/MiniCardTurma";
import {MiniCardEvento} from "../../../components/modules/MiniCardEvento";
import ScreenContainer from "../../../components/modules/ScreenContainer";
import {Plano, Turma, Evento} from "../../../models";
import HorizontalScroller from "../../../components/modules/Scroller/HorizontalScroller";
import {YStack} from "tamagui";

interface HomeScreenProps {
  plano: Plano;
  turmas: Turma[];
  eventos: Evento[];
  onTurmasLinkPress: () => void;
  onEventosLinkPress: () => void
}
export default ({plano, turmas, onTurmasLinkPress, eventos, onEventosLinkPress}: HomeScreenProps) => {
  console.log('onTurmasLinkPress: ', onTurmasLinkPress);
  console.log('onEventosLinkPress: ', onEventosLinkPress);
  const handleTurmasLinkPress = () => {
    console.log('handleTurmasLinkPress');
    if (onTurmasLinkPress) {
      onTurmasLinkPress();
    }
  }
  const handleEventosLinkPress = () => {
    console.log('handleEventosLinkPress');
    if (onEventosLinkPress) {
      onEventosLinkPress();
    }
  }
  return (
    <ScreenContainer>
      <HeroSection
        title="Nome do usuário"
        height={120}
      />
      <YStack paddingHorizontal={12}>
        <Section title="">
          <CardResumoFinanceiro nomeDoPlano={plano.nome} valorDoPlano={plano.valor} dataDeVencimento={plano.dataVencimento}
                                numeroDePendencias={plano.pendencias} />
        </Section>
        <Section title="Suas Turmas" linkLabel="Ver todas" onLinkPress={handleTurmasLinkPress}>
          <HorizontalScroller>
            {turmas.map(
              (v, i) => (
                <MiniCardTurma key={v.id ?? i} image={v.image} title={v.title} time={v.horario} days={v.dias}/>
              )
            )}
          </HorizontalScroller>
        </Section>
        <Section title="Na sua Agenda" linkLabel="Agenda completa" onLinkPress={handleEventosLinkPress}>
          <HorizontalScroller>
            {eventos.map(
              (v, i) => (
                <MiniCardEvento key={v.id ?? i} title={v.title} date={v.date} time={v.time} address={v.address}/>
              )
            )}
          </HorizontalScroller>
        </Section>
      </YStack>
    </ScreenContainer>
  );
}
