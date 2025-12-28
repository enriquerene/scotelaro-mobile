# README - Sistema de Academia Mobile

## Princípios de Desenvolvimento

### SOLID e DRY
- **Single Responsibility Principle**: Cada classe/componente deve ter uma única responsabilidade
- **Open/Closed Principle**: Entidades devem ser abertas para extensão, fechadas para modificação
- **Liskov Substitution Principle**: Objetos de uma superclasse devem ser substituíveis por objetos de subclasses
- **Interface Segregation Principle**: Interfaces específicas são melhores que uma interface geral
- **Dependency Inversion Principle**: Dependa de abstrações, não de implementações concretas
- **DRY (Don't Repeat Yourself)**: Evitar duplicação de código através de abstrações adequadas

## Stack Tecnológica

### Core
- **React Native** (Expo SDK 49+)
- **TypeScript** (v5+)
- **Tamagui** (v1.0+ para UI components e estilização)
- **Storybook** (v7+ para documentação de componentes)

### UI Framework: Tamagui
- **Componentes otimizados** para performance
- **Temas e estilos** unificados
- **Design System** consistente
- **Suporte a temas** claro/escuro nativo
- **Otimização de bundle** automática
- **SSR/SSG** pronto para web

### Gerenciamento de Estado
- **useReducer** (para gerenciamento de estado local de componentes, substituindo múltiplos useState)
- **Zustand** (para estado global)
- **React Hook Form** (formulários) + **@tamagui/forms** para integração
- **React Query** (cache de API)
- **Tamagui Theme** (para gerenciamento de temas e estilos)

### Armazenamento Local
- **RealmDB** (alternativa ao SQLite com melhor integração React Native)
  - Vantagens:
    - Sincronização offline/online
    - Tipagem TypeScript nativa
    - Performance superior para operações complexas

### Testes
- **Jest** + **React Native Testing Library**
- **Cypress** (Component Testing)

---

## Estrutura de Arquivos Atualizada
src/ 
src/.storybook/ 
src/assets/ 
src/components/ 
src/components/ui/ 
src/components/ui/ComponentName/ 
src/components/ui/ComponentName/ComponentName.tsx 
src/components/ui/ComponentName/ComponentName.stories.tsx 
src/components/ui/ComponentName/index.test.tsx 
src/components/modules/ 
src/components/templates/ 
src/constants/ 
src/hooks/ 
src/hooks/useAuth.ts 
src/hooks/useRealm.ts 
src/models/ 
src/navigation/ 
src/navigation/AuthStack.tsx 
src/navigation/MainTabNavigator.tsx 
src/screens/ 
src/screens/auth/ 
src/screens/main/ 
src/services/ 
src/services/api.ts 
src/services/sync/ 
src/stores/ 
src/theme/ 
src/types/ 


## Boas Práticas Recomendadas

### 1. Tipagem Avançada
```typescript
// Exemplo para FormInput
type InputType = 'text' | 'password' | 'email' | 'phone';

interface FormInputProps {
  label: string;
  type?: InputType;
  initialValue?: string;
  onValidate?: (value: string) => boolean;
}
```

### 2. Documentação de Componentes
```typescript
// FormInput.stories.tsx
export default {
  title: 'UI/FormInput',
  component: FormInput,
  parameters: {
    controls: { expanded: true },
  },
} as Meta;

const Template: StoryFn<typeof FormInput> = (args) => <FormInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'E-mail',
  type: 'email'
};
```

### 3. Armazenamento Local com Realm
```typescript
// models/User.ts
class User {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  phone!: string;

  static schema: Realm.ObjectSchema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      phone: 'string'
    }
  };
}
```

### 4. Sincronização Offline
```typescript
// hooks/useRealm.ts
const setupRealm = async () => {
  const realm = await Realm.open({
    schema: [User.schema, Class.schema],
    sync: {
      user: currentUser,
      partitionValue: `user=${userId}`,
    },
  });

  return realm;
};
```

## Arquitetura de Componentes

### 1. Estrutura de Pastas
```
src/
  components/
    base/               # Componentes base que usam Tamagui diretamente
      Button/
        Button.tsx
        Button.stories.tsx
        index.ts
      Text/
        Text.tsx
        Text.stories.tsx
        index.ts
      ...
    modules/           # Componentes de módulo que usam apenas componentes base
      CardPlano/
        CardPlano.tsx
        CardPlano.stories.tsx
        index.ts
      ...
```

### 2. Componentes Base

Estes componentes são wrappers leves em cima do Tamagui e são os únicos que devem importar diretamente do Tamagui.
```typescript
// tamagui.config.ts
import { createTamagui } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'

const headingFont = createInterFont()
const bodyFont = createInterFont()

export const config = createTamagui({
  themes,
  tokens,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
})

export type AppConfig = typeof config
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
```

### 3. Exemplo de Componente Base

#### Button.tsx
```typescript
// src/components/base/Button/Button.tsx
import { styled } from 'tamagui'
import type { GetProps } from 'tamagui'

export const Button = styled(ButtonFrame, {
  name: 'Button',
  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: '$primaryContrast',
        hoverStyle: { backgroundColor: '$primaryDark' },
        pressStyle: { backgroundColor: '$primaryDarker' },
      },
      secondary: {
        backgroundColor: '$secondary',
        color: '$secondaryContrast',
        hoverStyle: { backgroundColor: '$secondaryDark' },
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
        hoverStyle: { backgroundColor: '$backgroundHover' },
      },
    } as const,
    size: {
      small: { height: 32, paddingHorizontal: 12, borderRadius: 6 },
      medium: { height: 40, paddingHorizontal: 16, borderRadius: 8 },
      large: { height: 48, paddingHorizontal: 24, borderRadius: 10 },
    } as const,
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
  } as const,
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
})

export type ButtonProps = GetProps<typeof Button>
```

#### Text.tsx
```typescript
// src/components/base/Text/Text.tsx
import { styled } from 'tamagui'
import type { GetProps } from 'tamagui'

export const Text = styled(TextFrame, {
  name: 'Text',
  variants: {
    variant: {
      h1: {
        fontSize: 32,
        lineHeight: 40,
        fontWeight: '700',
      },
      h2: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '600',
      },
      body: {
        fontSize: 16,
        lineHeight: 24,
      },
      caption: {
        fontSize: 12,
        lineHeight: 16,
        color: '$textSecondary',
      },
    } as const,
    bold: {
      true: {
        fontWeight: '600',
      },
    },
  } as const,
  defaultVariants: {
    variant: 'body',
  },
})

export type TextProps = GetProps<typeof Text>
```

- **FormInput**: Campo de entrada para formulários
  ```typescript
  interface FormInputProps {
    label: string;
    type?: 'text' | 'password' | 'email' | 'phone';
    initialValue?: string;
    onValidate?: (value: string) => boolean;
    error?: string;
  }
  ```

- **Checkbox**: Componente toggle on/off
  ```typescript
  interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
  }
  ```

- **PrimaryButton**: Botão principal de ação
  ```typescript
  interface PrimaryButtonProps {
    label: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    outline?: boolean;
    icon?: React.ReactNode;
  }
  ```

- **Link**: Componente de link navegável
  ```typescript
  interface LinkProps {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
    underline?: boolean;
  }
  ```

- **Heading**: Título de seção (estilo h3)
  ```typescript
  interface HeadingProps {
    title: string;
    align?: 'left' | 'center' | 'right';
    size?: 'small' | 'medium' | 'large';
  }
  ```

- **SecondaryButton**: Botão secundário
  ```typescript
  interface SecondaryButtonProps {
    label: string;
    onPress: () => void;
    disabled?: boolean;
    outline?: boolean;
  }
  ```

### 4. Exemplo de Componente de Módulo

#### CardPlano.tsx
```typescript
// src/components/modules/CardPlano/CardPlano.tsx
import { Button, Text, XStack, YStack, Card as BaseCard } from '@/components/base'
import type { CardPlanoProps } from './types'

export function CardPlano({
  title,
  startDate,
  endDate,
  status,
  price,
  billingCycle,
  features = [],
  onManagePlan,
  onRenew,
}: CardPlanoProps) {
  return (
    <BaseCard>
      <BaseCard.Header>
        <XStack justifyContent="space-between" alignItems="center">
          <Text variant="h3">{title}</Text>
          <Text variant="caption">{status}</Text>
        </XStack>
        
        <YStack space="sm" marginTop="md">
          <Text>Início: {startDate}</Text>
          <Text>Vencimento: {endDate}</Text>
          <Text color="textSecondary">
            {price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })} / {billingCycle === 'monthly' ? 'mês' : 'ano'}
          </Text>
        </YStack>
        
        <YStack space="sm" marginTop="md">
          {features.map((feature, i) => (
            <XStack key={i} space="xs">
              <Text>✓</Text>
              <Text>{feature}</Text>
            </XStack>
          ))}
        </YStack>
      </BaseCard.Header>
      
      <BaseCard.Footer>
        <XStack flex={1} space="sm" justifyContent="flex-end">
          {onManagePlan && (
            <Button variant="outline" onPress={onManagePlan}>
              Gerenciar
            </Button>
          )}
          {onRenew && (
            <Button onPress={onRenew}>
              Renovar
            </Button>
          )}
        </XStack>
      </BaseCard.Footer>
    </BaseCard>
  )
}
```

#### types.ts
```typescript
// src/components/modules/CardPlano/types.ts
export interface CardPlanoProps {
  title: string
  startDate: string
  endDate: string
  status: 'active' | 'expired' | 'pending' | 'cancelled'
  price: number
  billingCycle: 'monthly' | 'yearly'
  features?: string[]
  onManagePlan?: () => void
  onRenew?: () => void
}
```
```typescript
import { Card, H2, Paragraph, XStack, YStack, Button } from 'tamagui'

export function CardPlano({
  title,
  startDate,
  endDate,
  status,
  price,
  billingCycle,
  features = [],
  onManagePlan,
  onRenew,
}: CardPlanoProps) {
  return (
    <Card elevate size="$4" bordered>
      <Card.Header padded>
        <XStack jc="space-between" ai="center">
          <H2>{title}</H2>
          <Paragraph theme="alt2">{status}</Paragraph>
        </XStack>
        
        <YStack space="$2" mt="$3">
          <Paragraph>Início: {startDate}</Paragraph>
          <Paragraph>Vencimento: {endDate}</Paragraph>
          <Paragraph theme="alt1">
            {price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })} / {billingCycle === 'monthly' ? 'mês' : 'ano'}
          </Paragraph>
        </YStack>
        
        <YStack space="$2" mt="$3">
          {features.map((feature, i) => (
            <XStack key={i} space="$2">
              <Paragraph>✓</Paragraph>
              <Paragraph>{feature}</Paragraph>
            </XStack>
          ))}
        </YStack>
      </Card.Header>
      
      <Card.Footer padded>
        <XStack flex={1} space="$2" jc="flex-end">
          {onManagePlan && (
            <Button onPress={onManagePlan} themeInverse>
              Gerenciar
            </Button>
          )}
          {onRenew && (
            <Button onPress={onRenew} theme="yellow">
              Renovar
            </Button>
          )}
        </XStack>
      </Card.Footer>
    </Card>
  )
}
```

### Componentes de Módulos
- **Section**: Seção com título e link opcional
  ```typescript
  interface SectionProps {
    title: string;
    linkLabel?: string;
    onLinkPress?: () => void;
    children: React.ReactNode;
  }
  ```

- **CardResumoFinanceiro**: Card para exibição de resumo financeiro
  ```typescript
  interface CardResumoFinanceiroProps {
    nomeDoPlano: string;
    valorDoPlano: string;
    dataDeVencimento: string;
    numeroDePendencias: number;
    valorMensalAnuidade: number;
    onPress?: () => void;
  }
  ```

![CardResumoFinanceiro](./assets/images/card_resumo_financeiro_1.png)

![CardResumoFinanceiro](./assets/images/card_resumo_financeiro_2.png)


- **CardPlano**: Card para exibição do plano atual do usuário
  ```typescript
  interface CardPlanoProps {
    title: string;               // Nome do plano (ex: "Plano Premium")
    startDate: string;           // Data de início da assinatura
    endDate: string;             // Data de término da assinatura
    status: 'active' | 'expired' | 'pending' | 'cancelled';
    price: number;               // Valor mensal/anuidade
    billingCycle: 'monthly' | 'yearly';
    features: string[];          // Lista de benefícios/inclusos
    nextBillingDate?: string;    // Próxima data de cobrança (se aplicável)
    onManagePlan?: () => void;   // Ação para gerenciar o plano
    onRenew?: () => void;        // Ação para renovação
  }
  ```

- **MiniCard**: Card compacto para informações
  ```typescript
  interface MiniCardProps {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
  }
  ```

- **MiniCardTurma**: Card compacto para turmas
  ```typescript
  interface MiniCardTurmaProps {
    name: string;
    instructor: string;
    time: string;
    date: string;
    available: number;
    onPress: () => void;
  }
  ```

- **CardEvento**: Card para eventos
  ```typescript
  interface CardEventoProps {
    title: string;
    date: string;
    location: string;
    imageUrl: string;
    onPress: () => void;
  }
  ```

- **HorizontalScroller**: Componente de rolagem horizontal
  ```typescript
  interface HorizontalScrollerProps {
    children: React.ReactNode;
    showsButtons?: boolean;
    snapToInterval?: number;
  }
  ```

- **VerticalScroller**: Componente de rolagem vertical
  ```typescript
  interface VerticalScrollerProps {
    children: React.ReactNode;
    refreshable?: boolean;
    onRefresh?: () => Promise<void>;
  }
  ```

### Componentes de Templates
- **AuthFlowScreen**: Template para telas de autenticação
  ```typescript
  interface AuthFlowScreenProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
  }
  ```

- **BottomNavbar**: Barra de navegação inferior
  ```typescript
  interface BottomNavbarProps {
    items: Array<{
      label: string;
      icon: React.ReactNode;
      onPress: () => void;
      active?: boolean;
    }>;
  }
  ```

- **UserFlowScreen**: Template para telas do usuário
  ```typescript
  interface UserFlowScreenProps {
    title?: string;
    showBackButton?: boolean;
    onBackPress?: () => void;
    children: React.ReactNode;
  }
  ```

- **HeroHeader**: Cabeçalho destaque
  ```typescript
  interface HeroHeaderProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    action?: {
      label: string;
      onPress: () => void;
    };
  }
  ```

## Serviços

### Autenticação
```typescript
// services/auth.ts
export interface AuthService {
  login(email: string, password: string): Promise<User>;
  register(userData: UserRegistrationData): Promise<User>;
  forgotPassword(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
  logout(): Promise<void>;
  getCurrentUser(): User | null;
  refreshToken(): Promise<string>;
}
```

### HTTP Client
```typescript
// services/http.ts
export interface HttpClient {
  get<T>(url: string, params?: Record<string, any>): Promise<T>;
  post<T>(url: string, data?: any): Promise<T>;
  put<T>(url: string, data?: any): Promise<T>;
  delete<T>(url: string): Promise<T>;
  setAuthToken(token: string): void;
  clearAuthToken(): void;
}
```

### Pagamentos
```typescript
// services/payments.ts
export interface PaymentService {
  getPaymentHistory(): Promise<Payment[]>;
  processPayment(planId: string, paymentMethod: PaymentMethod): Promise<PaymentResult>;
  getPlanDetails(planId: string): Promise<PlanDetails>;
}
```

### Notificações
```typescript
// services/notifications.ts
export interface NotificationService {
  getNotifications(): Promise<Notification[]>;
  markAsRead(notificationId: string): Promise<void>;
  registerPushToken(token: string): Promise<void>;
  unregisterPushToken(): Promise<void>;
}
```

### Turmas e Eventos
```typescript
// services/classes.ts
export interface ClassService {
  getAvailableClasses(): Promise<Class[]>;
  getClassDetails(classId: string): Promise<ClassDetails>;
  enrollInClass(classId: string): Promise<EnrollmentResult>;
  cancelEnrollment(enrollmentId: string): Promise<void>;
}

// services/events.ts
export interface EventService {
  getUpcomingEvents(): Promise<Event[]>;
  getEventDetails(eventId: string): Promise<EventDetails>;
  registerForEvent(eventId: string): Promise<RegistrationResult>;
}
```

### Progresso do Usuário
```typescript
// services/progress.ts
export interface ProgressService {
  getUserProgress(): Promise<UserProgress>;
  updateProgress(activityData: ActivityData): Promise<UserProgress>;
  getProgressHistory(modalityId: string): Promise<ProgressHistory>;
}
```

## Catálogo de Componentes e Fluxos

### 1. Componentes por Fluxo

#### AuthFlow (Telas de Autenticação)
- **Logo**
  - Exibe a marca da academia
  - Suporta diferentes tamanhos e temas

- **Input**
  - Campos de formulário reutilizáveis
  - Validação integrada
  - Suporte a diferentes tipos (texto, senha, email, etc.)

- **Checkbox**
  - Para termos e condições
  - Opções de seleção múltipla

- **Button (grande)**
  - Ações principais (login, cadastrar, etc.)
  - Estados: normal, loading, disabled

- **Link**
  - Navegação entre telas
  - Estilo de texto clicável

- **Heading**
  - Títulos de seção
  - Diferentes níveis de hierarquia

#### UserFlow (Fluxo do Usuário)
- **Frame**
  - Layout base para telas
  - Gerencia estados de carregamento e erro

- **Navbar**
  - Navegação principal
  - Ícones e labels

- **Screen (titled)**
  - Container de tela com título
  - Suporte a scroll

- **Hero Header**
  - Destaque visual
  - Imagem de fundo opcional

- **Button (actions)**
  - Ações secundárias
  - Diferentes estilos e tamanhos

- **Section**
  - Agrupamento de conteúdo
  - Título e link opcional

- **Card Resumo do Plano**
  - Informações do plano atual
  - Status e renovação

- **MiniCard Turma**
  - Visualização compacta de turma
  - Horário e vagas disponíveis

- **MiniCard Modalidade**
  - Dados de modalidades
  - Ícones e contadores

- **MiniCard Dados Quantitativos**
  - Estatísticas e métricas
  - Gráficos em miniatura

- **Horizontal Scroller**
  - Rolagem horizontal de itens
  - Navegação por gestos

- **Vertical Scroller**
  - Lista rolável
  - Atualização puxar-para-atualizar

- **Card Evento**
  - Detalhes de eventos
  - Data, local e ações

- **Calendário**
  - Visualização de agenda
  - Navegação por datas
  - Marcação de eventos

- **ItemHistóricoPagamentos**
  - Registro de transações
  - Status e valores

- **ItemPendencias**
  - Alertas e pendências
  - Ações rápidas

- **Card Plano**
  - Exibe detalhes do plano atual do usuário
  - Status da assinatura
  - Período de vigência
  - Próxima cobrança (se aplicável)
  - Botões de ação (gerenciar, renovar, etc.)

#### AdminFlow (Painel Administrativo)
- Reutiliza componentes do UserFlow com extensões:
  - Botões de edição
  - Controles administrativos
  - Visão expandida de dados

### 5. Configuração do Tema

#### theme.ts
```typescript
// src/theme/theme.ts
import { createTamagui } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'

const headingFont = createInterFont()
const bodyFont = createInterFont()

export const config = createTamagui({
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  tokens: {
    color: {
      primary: '#007AFF',
      primaryDark: '#0063CC',
      primaryDarker: '#004C99',
      primaryContrast: '#FFFFFF',
      secondary: '#5856D6',
      secondaryDark: '#3A39A8',
      secondaryContrast: '#FFFFFF',
      background: '#FFFFFF',
      backgroundHover: '#F5F5F7',
      text: '#000000',
      textSecondary: '#8E8E93',
      borderColor: '#D1D1D6',
    },
    space: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    radius: {
      sm: 4,
      md: 8,
      lg: 12,
      full: 9999,
    },
  },
  themes: {
    light: {
      background: '#FFFFFF',
      backgroundHover: '#F5F5F7',
      color: '#000000',
      colorHover: '#1D1D1F',
      borderColor: '#D1D1D6',
    },
    dark: {
      background: '#000000',
      backgroundHover: '#1C1C1E',
      color: '#FFFFFF',
      colorHover: '#EBEBF5',
      borderColor: '#38383A',
    },
  },
})

export type AppConfig = typeof config
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
```

### 6. Provedor de Tema

#### AppProvider.tsx
```typescript
// src/providers/AppProvider.tsx
import { TamaguiProvider } from 'tamagui'
import { config } from '@/theme/theme'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      {children}
    </TamaguiProvider>
  )
}
```

### 7. Componentes Compartilhados

#### Exemplo: Notificação
```typescript
import { Toast, useToastState } from '@tamagui/toast'

export function Notification() {
  const currentToast = useToastState()
  
  if (!currentToast) return null
  
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="quick"
      viewport={{ padding: 8 }}
    >
      <YStack>
        <Toast.Title>{currentToast.title}</Toast.Title>
        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  )
}
```

#### Exemplo: Seção de Detalhes
```typescript
import { Sheet } from 'tamagui'

export function DetailSheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  return (
    <Sheet
      modal
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={[50, 100]}
      snapPointsMode="percent"
      dismissOnSnapToBottom
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame>
        <Sheet.ScrollView>
          {children}
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  )
}
```

### Componentes Compartilhados

#### Notificação (Push-like)
- Exibe mensagens temporárias
- Diferentes níveis (info, sucesso, erro)
- Fechamento automático/controlado

#### Seção de Detalhes
- Overlay expansível
- Pode ser arrastado para cima
- Transição para tela cheia
- Botão de voltar no modo tela cheia

### 3. Fluxos de Navegação

#### AuthFlow
1. **Login**
   - Email/senha
   - Biometria (opcional)
   - Lembrar-me
   - Esqueci minha senha
   - Criar conta

2. **Cadastro**
   - Informações pessoais
   - Senha segura
   - Termos e condições
   - Verificação de email

3. **Recuperação de Acesso**
   - Solicitação de redefinição
   - Código de verificação
   - Nova senha

#### UserFlow
1. **Dashboard**
   - Resumo do plano
   - Próximas aulas
   - Eventos em destaque
   - Progresso

2. **Plano e Pagamentos**
   - Detalhes do plano
   - Histórico
   - Métodos de pagamento

3. **Agenda**
   - Calendário
   - Lista de turmas
   - Inscrições

4. **Progresso**
   - Estatísticas
   - Histórico
   - Metas

5. **Perfil**
   - Dados pessoais
   - Preferências
   - Configurações

#### AdminFlow
1. **Dashboard**
   - Métricas gerais
   - Alertas
   - Acesso rápido

2. **Gerenciamento**
   - Usuários
   - Turmas
   - Pagamentos
   - Relatórios

### UserFlow
Fluxo principal do usuário autenticado, incluindo:

1. **Dashboard**
   - Resumo do plano atual
   - Próximas aulas agendadas
   - Eventos em destaque
   - Progresso rápido

2. **Plano e Pagamentos**
   - Detalhes do plano inscrito
   - Histórico de pagamentos
   - Renovação de plano
   - Métodos de pagamento

3. **Agenda e Turmas**
   - Calendário de eventos
   - Lista de turmas disponíveis
   - Inscrição em turmas
   - Filtros por modalidade/horário

4. **Progresso**
   - Evolução nas modalidades
   - Histórico de atividades
   - Metas e conquistas

5. **Perfil**
   - Dados do usuário
   - Preferências
   - Configurações de notificação

6. **Notificações**
   - Mensagens da academia
   - Alertas de pagamento
   - Lembretes de aulas

## Conformidade com Plataformas

### Android
- Seguir Material Design Guidelines
- Adaptação para diferentes tamanhos de tela
- Suporte a gestos nativos Android
- Implementação de notificações conforme padrões Android
- Conformidade com Google Play Store policies

### iOS
- Seguir Human Interface Guidelines
- Suporte a gestos nativos iOS
- Adaptação para diferentes modelos de iPhone/iPad
- Implementação de notificações conforme padrões Apple
- Conformidade com App Store Review Guidelines

## Diagramas de Referência
1. Arquitetura Global
https://./docs/architecture-diagram.png
(Ver Anexo 1 para detalhes completos)

2. Fluxo de Dados
https://./docs/data-flow.png
(Ver Anexo 2 para sequência detalhada)

3. Component Hierarchy
https://./docs/component-tree.png
(Ver Anexo 3 para relações entre componentes)
