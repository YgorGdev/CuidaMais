import { BotMessageSquare, BatteryCharging, Fingerprint, ShieldHalf, PlugZap, GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Funcionalidades", href: "#" },
  { label: "Fluxo de Trabalho", href: "#" },
  { label: "Planos", href: "#" },
  { label: "Depoimentos", href: "#" },
];

export const testimonials = [
  {
    user: "João Silva",
    company: "Soluções Estelares",
    image: user1,
    text: "A plataforma otimizou nosso fluxo de trabalho como nunca antes. Hoje temos controle total sobre nossos processos e projetos.",
  },
  {
    user: "Maria Souza",
    company: "Horizonte Azul Tech",
    image: user2,
    text: "A gestão de tarefas e equipes ficou muito mais eficiente. A interface é intuitiva e a equipe de suporte é excelente!",
  },
  {
    user: "Carlos Ferreira",
    company: "Quântica Sistemas",
    image: user3,
    text: "A automação de processos nos poupou muito tempo. Finalmente conseguimos integrar tudo em um único lugar.",
  },
  {
    user: "Renata Costa",
    company: "Fusão Corporativa",
    image: user4,
    text: "O sistema trouxe visibilidade total das operações. Recomendo para qualquer empresa que busca eficiência e controle.",
  },
  {
    user: "Miguel Lima",
    company: "Criações Estratégicas",
    image: user5,
    text: "A agilidade no atendimento e a capacidade do sistema de se adaptar às nossas demandas foram diferenciais decisivos.",
  },
  {
    user: "Ana Clara",
    company: "Sinergia Digital",
    image: user6,
    text: "Com esse sistema, conseguimos centralizar todas as áreas da empresa e melhorar drasticamente a comunicação interna.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Painel Personalizado",
    description: "Visualize métricas e atividades em tempo real com dashboards interativos e configuráveis.",
  },
  {
    icon: <Fingerprint />,
    text: "Controle de Acesso",
    description: "Gerencie permissões de usuários com segurança e defina diferentes níveis de acesso.",
  },
  {
    icon: <ShieldHalf />,
    text: "Automação de Tarefas",
    description: "Reduza retrabalhos com fluxos automatizados para tarefas recorrentes.",
  },
  {
    icon: <BatteryCharging />,
    text: "Monitoramento de Desempenho",
    description: "Acompanhe a produtividade da equipe e identifique gargalos nos processos.",
  },
  {
    icon: <PlugZap />,
    text: "Integrações Inteligentes",
    description: "Conecte-se a CRMs, ERPs, e outras ferramentas essenciais ao seu negócio.",
  },
  {
    icon: <GlobeLock />,
    text: "Segurança de Dados",
    description: "Garanta a proteção das informações com criptografia e backups automáticos.",
  },
];

export const checklistItems = [
  {
    title: "Centralização de Processos",
    description: "Gerencie projetos, equipes, documentos e metas em uma única plataforma.",
  },
  {
    title: "Gestão Colaborativa",
    description: "Compartilhe responsabilidades e acompanhe tarefas em tempo real com sua equipe.",
  },
  {
    title: "Indicadores e Relatórios",
    description: "Gere relatórios automáticos com dados estratégicos para a tomada de decisões.",
  },
  {
    title: "Agilidade na Comunicação",
    description: "Reduza o uso de e-mails com comentários em tarefas e notificações em tempo real.",
  },
];

export const pricingOptions = [
  {
    title: "Iniciante",
    price: "R$0",
    features: [
      "Gestão de tarefas básica",
      "Armazenamento até 2 GB",
      "Usuários ilimitados",
      "Suporte via e-mail",
    ],
  },
  {
    title: "Profissional",
    price: "R$49",
    features: [
      "Gestão de projetos avançada",
      "Armazenamento até 50 GB",
      "Relatórios e dashboards",
      "Suporte prioritário",
    ],
  },
  {
    title: "Corporativo",
    price: "R$199",
    features: [
      "Funcionalidades completas",
      "Armazenamento ilimitado",
      "Automação de fluxos",
      "Suporte dedicado + Treinamento",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Guia de Início Rápido" },
  { href: "#", text: "Documentação Técnica" },
  { href: "#", text: "Central de Ajuda" },
  { href: "#", text: "Referência da API" },
  { href: "#", text: "Comunidade de Usuários" },
];

export const platformLinks = [
  { href: "#", text: "Funcionalidades" },
  { href: "#", text: "Integrações" },
  { href: "#", text: "Requisitos Técnicos" },
  { href: "#", text: "Atualizações" },
  { href: "#", text: "Histórico de Versões" },
];

export const communityLinks = [
  { href: "#", text: "Eventos e Webinars" },
  { href: "#", text: "Fóruns de Discussão" },
  { href: "#", text: "Parcerias" },
  { href: "#", text: "Desafios e Hackathons" },
  { href: "#", text: "Oportunidades de Carreira" },
];
