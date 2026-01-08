// Simulação de processamento de IA para recomendações de estudo
// Em produção, isso seria substituído por uma chamada real a uma API de IA

interface FormData {
  gradeLevel: string;
  subjects: string[];
  studyTime: string;
  learningStyle: string;
  goals: string;
  challenges: string;
}

interface Recommendation {
  studyPlan: string[];
  techniques: string[];
  resources: string[];
  schedule: string[];
  tips: string[];
  motivation: string;
}

const gradeLevelMap: Record<string, string> = {
  fundamental1: 'Ensino Fundamental I',
  fundamental2: 'Ensino Fundamental II',
  medio: 'Ensino Médio',
  'pre-vestibular': 'Pré-Vestibular',
  superior: 'Ensino Superior'
};

const studyTimeMap: Record<string, number> = {
  '30min': 30,
  '1h': 60,
  '2h': 120,
  '3h': 180,
  '4h+': 240
};

const learningStyleMap: Record<string, string> = {
  visual: 'Visual',
  auditivo: 'Auditivo',
  leitura: 'Leitura/Escrita',
  pratico: 'Prático',
  misto: 'Misto'
};

export async function generateRecommendation(formData: FormData): Promise<Recommendation> {
  // Simular delay de processamento de IA
  await new Promise(resolve => setTimeout(resolve, 2000));

  const studyMinutes = studyTimeMap[formData.studyTime] || 60;
  const gradeLevel = gradeLevelMap[formData.gradeLevel];
  const learningStyle = learningStyleMap[formData.learningStyle];
  const subjects = formData.subjects.join(', ');

  // Gerar plano de estudos baseado nos dados do formulário
  const studyPlan: string[] = [];
  
  if (formData.subjects.length === 1) {
    studyPlan.push(`Concentre-se em ${formData.subjects[0]} com sessões de ${studyMinutes} minutos diários`);
  } else if (formData.subjects.length <= 3) {
    studyPlan.push(`Alterne entre ${subjects} em dias diferentes da semana para melhor absorção`);
  } else {
    studyPlan.push(`Organize ${formData.subjects.length} matérias em blocos temáticos, priorizando as mais desafiadoras`);
  }

  studyPlan.push(`Dedique os primeiros 15 minutos para revisar o conteúdo da sessão anterior`);
  studyPlan.push(`Reserve ${Math.min(30, Math.floor(studyMinutes * 0.3))} minutos para exercícios práticos`);
  
  if (studyMinutes >= 90) {
    studyPlan.push(`Faça pausas de 10 minutos a cada 50 minutos de estudo (Técnica Pomodoro adaptada)`);
  }

  // Técnicas baseadas no estilo de aprendizagem
  const techniques: string[] = [];
  
  if (formData.learningStyle === 'visual' || formData.learningStyle === 'misto') {
    techniques.push('Mapas mentais: Crie diagramas visuais conectando conceitos principais');
    techniques.push('Flashcards coloridos: Use cores diferentes para categorias de conteúdo');
  }
  
  if (formData.learningStyle === 'auditivo' || formData.learningStyle === 'misto') {
    techniques.push('Grave resumos em áudio: Grave suas próprias explicações e ouça durante atividades rotineiras');
    techniques.push('Explique em voz alta: Ensine o conteúdo para alguém ou para si mesmo');
  }
  
  if (formData.learningStyle === 'leitura' || formData.learningStyle === 'misto') {
    techniques.push('Resumos estruturados: Crie resumos organizados com tópicos e subtópicos');
    techniques.push('Técnica Cornell: Divida suas anotações em seções de notas, pistas e resumo');
  }
  
  if (formData.learningStyle === 'pratico' || formData.learningStyle === 'misto') {
    techniques.push('Resolução de problemas: Faça o máximo de exercícios práticos possível');
    techniques.push('Aplicação real: Conecte teoria com exemplos do dia a dia');
  }

  techniques.push('Revisão espaçada: Revise o conteúdo após 1 dia, 1 semana e 1 mês');

  // Recursos recomendados
  const resources: string[] = [];
  
  if (formData.subjects.includes('Matemática')) {
    resources.push('Khan Academy (plataforma gratuita com videoaulas de matemática)');
  }
  if (formData.subjects.includes('Física') || formData.subjects.includes('Química')) {
    resources.push('YouTube: Canais como "Professor Ferretto" e "Química em Ação"');
  }
  if (formData.subjects.includes('Inglês')) {
    resources.push('Duolingo e BBC Learning English (apps e sites gratuitos)');
  }
  if (formData.subjects.includes('Português')) {
    resources.push('Plataforma Descomplica e Blog Brasil Escola (gramática e redação)');
  }
  
  resources.push('Aplicativo Anki para flashcards com repetição espaçada');
  resources.push('Google Scholar para pesquisas acadêmicas de qualidade');
  resources.push('Biblioteca escolar ou municipal para materiais complementares');

  // Cronograma
  const schedule: string[] = [];
  
  if (studyMinutes >= 120) {
    schedule.push('Segunda, Quarta, Sexta: Foco nas matérias de exatas e raciocínio lógico');
    schedule.push('Terça, Quinta: Concentração em humanas e linguagens');
    schedule.push('Sábado: Revisão geral e resolução de exercícios diversos');
    schedule.push('Domingo: Revisão leve e planejamento da semana seguinte');
  } else if (studyMinutes >= 60) {
    schedule.push('Segunda a Sexta: Uma matéria diferente por dia, rotacionando semanalmente');
    schedule.push('Fim de semana: Revisão dos conteúdos da semana e exercícios');
  } else {
    schedule.push('Alterne entre as matérias prioritárias em dias diferentes');
    schedule.push('Fim de semana: 10-15 minutos de revisão rápida');
  }

  // Dicas personalizadas
  const tips: string[] = [
    'Mantenha um ambiente de estudo organizado e livre de distrações',
    'Use um timer para controlar o tempo de estudo e pausas',
    'Celebre pequenas conquistas para manter a motivação',
    'Durma bem: o sono é essencial para consolidar o aprendizado',
    'Hidrate-se e faça lanches saudáveis durante os estudos'
  ];

  if (formData.challenges.toLowerCase().includes('concentra')) {
    tips.push('Para melhorar a concentração: desligue notificações e use a técnica Pomodoro');
  }
  if (formData.challenges.toLowerCase().includes('começar') || formData.challenges.toLowerCase().includes('onde')) {
    tips.push('Comece pelos tópicos mais básicos e vá progredindo gradualmente');
  }

  // Mensagem motivacional personalizada
  let motivation = `Excelente escolha em buscar organização nos estudos! `;
  
  if (formData.gradeLevel === 'pre-vestibular') {
    motivation += `Com dedicação e o plano certo, você está no caminho para alcançar aprovação no vestibular. `;
  } else if (formData.gradeLevel === 'superior') {
    motivation += `O ensino superior exige disciplina, e você está no caminho certo ao buscar estratégias eficazes. `;
  }
  
  motivation += `Este plano foi criado especialmente para você, considerando seu tempo disponível, estilo de aprendizagem ${learningStyle.toLowerCase()} e objetivos. Lembre-se: consistência é mais importante que perfeição. Pequenos passos diários levam a grandes conquistas!`;

  return {
    studyPlan,
    techniques,
    resources,
    schedule,
    tips,
    motivation
  };
}
