// Simulação de processamento de IA para recomendações de carreira

export interface CareerFormData {
  currentLevel: string;
  interests: string[];
  skills: string[];
  workStyle: string;
  salary: string;
  personalityType: string;
  dreamCareer: string;
  strengths: string;
  concerns: string;
}

export interface CareerRecommendation {
  topCareers: Array<{
    title: string;
    description: string;
    education: string;
    growth: string;
    salary: string;
  }>;
  courses: string[];
  skills: string[];
  roadmap: string[];
  opportunities: string[];
  motivation: string;
}

// Banco de dados de carreiras simulado
const careerDatabase: Record<string, any> = {
  Tecnologia: {
    careers: [
      {
        title: 'Desenvolvedor de Software',
        description: 'Crie aplicações, sistemas e soluções tecnológicas que impactam milhões de pessoas.',
        education: 'Ciência da Computação, Engenharia de Software, Sistemas de Informação',
        growth: 'Alto - setor em expansão',
        salary: 'Kz 400.000 - Kz 1.500.000+'
      },
      {
        title: 'Analista de Dados / Data Scientist',
        description: 'Transforme dados em insights valiosos para tomada de decisões estratégicas.',
        education: 'Estatística, Ciência de Dados, Matemática Aplicada',
        growth: 'Muito Alto - profissão do futuro',
        salary: 'Kz 500.000 - Kz 2.000.000+'
      }
    ]
  },
  Saúde: {
    careers: [
      {
        title: 'Médico',
        description: 'Cuide da saúde e salve vidas, com especialização em diversas áreas.',
        education: 'Medicina (6 anos) + Residência',
        growth: 'Estável - sempre necessário',
        salary: 'Kz 600.000 - Kz 3.000.000+'
      },
      {
        title: 'Enfermeiro',
        description: 'Preste cuidados diretos aos pacientes e coordene equipes de saúde.',
        education: 'Enfermagem (5 anos)',
        growth: 'Alto - demanda crescente',
        salary: 'Kz 280.000 - Kz 900.000+'
      }
    ]
  },
  Educação: {
    careers: [
      {
        title: 'Professor / Educador',
        description: 'Transforme vidas através do conhecimento e forme futuras gerações.',
        education: 'Licenciatura na área de interesse',
        growth: 'Estável',
        salary: 'Kz 200.000 - Kz 800.000+'
      },
      {
        title: 'Pedagogo',
        description: 'Desenvolva estratégias de ensino e coordene processos educacionais.',
        education: 'Pedagogia',
        growth: 'Médio',
        salary: 'Kz 240.000 - Kz 650.000+'
      }
    ]
  },
  'Arte e Design': {
    careers: [
      {
        title: 'Designer UX/UI',
        description: 'Crie experiências digitais incríveis e interfaces intuitivas.',
        education: 'Design, Design Digital, cursos especializados',
        growth: 'Muito Alto',
        salary: 'Kz 320.000 - Kz 1.400.000+'
      },
      {
        title: 'Designer Gráfico',
        description: 'Desenvolva identidades visuais, materiais gráficos e peças criativas.',
        education: 'Design Gráfico, Publicidade',
        growth: 'Médio',
        salary: 'Kz 200.000 - Kz 950.000+'
      }
    ]
  },
  Negócios: {
    careers: [
      {
        title: 'Administrador de Empresas',
        description: 'Gerencie negócios, otimize processos e tome decisões estratégicas.',
        education: 'Administração',
        growth: 'Estável',
        salary: 'Kz 280.000 - Kz 1.200.000+'
      },
      {
        title: 'Analista de Marketing',
        description: 'Desenvolva estratégias para promover produtos e conquistar clientes.',
        education: 'Marketing, Publicidade, Administração',
        growth: 'Alto',
        salary: 'Kz 240.000 - Kz 1.200.000+'
      }
    ]
  },
  Engenharia: {
    careers: [
      {
        title: 'Engenheiro Civil',
        description: 'Projete e execute obras de infraestrutura e construções.',
        education: 'Engenharia Civil (5 anos)',
        growth: 'Médio a Alto',
        salary: 'Kz 400.000 - Kz 1.600.000+'
      },
      {
        title: 'Engenheiro de Produção',
        description: 'Otimize processos produtivos e aumente a eficiência empresarial.',
        education: 'Engenharia de Produção',
        growth: 'Alto',
        salary: 'Kz 400.000 - Kz 1.400.000+'
      }
    ]
  },
  Direito: {
    careers: [
      {
        title: 'Advogado',
        description: 'Defenda direitos, atue em diversas áreas jurídicas e faça justiça.',
        education: 'Direito (5 anos) + OAB',
        growth: 'Médio',
        salary: 'Kz 240.000 - Kz 2.400.000+'
      }
    ]
  }
};

export async function generateCareerRecommendation(formData: CareerFormData): Promise<CareerRecommendation> {
  // Simular delay de processamento
  await new Promise(resolve => setTimeout(resolve, 2500));

  const topCareers: CareerRecommendation['topCareers'] = [];
  
  // Selecionar carreiras baseadas nos interesses
  formData.interests.forEach(interest => {
    if (careerDatabase[interest]) {
      topCareers.push(...careerDatabase[interest].careers);
    }
  });

  // Se não encontrou carreiras ou encontrou poucas, adicionar genéricas
  if (topCareers.length < 2) {
    if (formData.personalityType === 'analitico') {
      topCareers.push(careerDatabase.Tecnologia.careers[1]); // Data Scientist
    }
    if (formData.personalityType === 'criativo') {
      topCareers.push(careerDatabase['Arte e Design'].careers[0]); // Designer
    }
    if (formData.personalityType === 'social') {
      topCareers.push(careerDatabase.Educação.careers[0]); // Professor
    }
  }

  // Limitar a 3 carreiras principais
  const finalCareers = topCareers.slice(0, 3);

  // Gerar cursos recomendados
  const courses: string[] = [];
  const uniqueEducation = new Set<string>();
  
  finalCareers.forEach(career => {
    const educationOptions = career.education.split(',');
    educationOptions.forEach(edu => {
      const trimmed = edu.trim();
      if (trimmed && !uniqueEducation.has(trimmed)) {
        uniqueEducation.add(trimmed);
        courses.push(trimmed);
      }
    });
  });

  // Adicionar cursos complementares baseados em interesses
  if (formData.interests.includes('Tecnologia')) {
    courses.push('Cursos de programação (Python, JavaScript, Java)');
    courses.push('Certificações em Cloud Computing (AWS, Azure, Google Cloud)');
  }
  if (formData.interests.includes('Comunicação')) {
    courses.push('Cursos de oratória e comunicação eficaz');
    courses.push('Marketing Digital e Mídias Sociais');
  }

  // Gerar habilidades a desenvolver
  const skills: string[] = [];
  
  if (formData.skills.includes('Criatividade')) {
    skills.push('Design Thinking e metodologias criativas');
  }
  if (formData.skills.includes('Lógica')) {
    skills.push('Raciocínio lógico e resolução de problemas complexos');
  }
  if (formData.skills.includes('Comunicação')) {
    skills.push('Comunicação assertiva e persuasiva');
  }
  if (formData.skills.includes('Liderança')) {
    skills.push('Gestão de equipes e liderança transformacional');
  }
  
  skills.push('Inglês avançado (diferencial em qualquer carreira)');
  skills.push('Gestão de tempo e produtividade');
  skills.push('Inteligência emocional e resiliência');
  skills.push('Networking e relacionamento profissional');

  // Gerar roadmap personalizado
  const roadmap: string[] = [];
  
  if (formData.currentLevel === 'fundamental' || formData.currentLevel === 'medio') {
    roadmap.push('Foque em concluir o ensino médio com boas notas');
    roadmap.push('Participe de atividades extracurriculares relacionadas às suas áreas de interesse');
    roadmap.push('Comece a desenvolver habilidades através de cursos online gratuitos');
    roadmap.push('Pesquise sobre as profissões e converse com profissionais da área');
    roadmap.push('Prepare-se para o ENEM e vestibulares das universidades desejadas');
  } else if (formData.currentLevel === 'medio-completo') {
    roadmap.push('Escolha o curso superior alinhado com suas carreiras de interesse');
    roadmap.push('Pesquise universidades, grade curricular e reputação no mercado');
    roadmap.push('Considere programas de bolsas de estudo e financiamento estudantil');
    roadmap.push('Enquanto estuda, faça cursos complementares online');
    roadmap.push('Busque estágios desde o início da graduação');
  } else {
    roadmap.push('Avalie especializações e pós-graduações na sua área de interesse');
    roadmap.push('Construa um portfólio ou currículo destacando suas experiências');
    roadmap.push('Desenvolva networking através de eventos e plataformas profissionais');
    roadmap.push('Busque mentorias com profissionais experientes da área');
    roadmap.push('Mantenha-se atualizado com tendências do mercado');
  }

  // Oportunidades de mercado
  const opportunities: string[] = [
    'Mercado aquecido para profissionais qualificados e atualizados',
    'Possibilidade de trabalho remoto em diversas áreas',
    'Crescimento de startups e empresas inovadoras em Angola e no mundo',
    'Demanda por profissionais que combinam habilidades técnicas e soft skills',
    'Oportunidades de empreendedorismo e trabalho autônomo'
  ];

  if (formData.interests.includes('Tecnologia')) {
    opportunities.push('Tecnologia é uma das áreas com maior crescimento global');
  }
  if (formData.interests.includes('Saúde')) {
    opportunities.push('Área da saúde sempre tem demanda, especialmente pós-pandemia');
  }

  // Mensagem motivacional
  let motivation = `Parabéns por investir tempo em planejar seu futuro profissional! `;
  
  const careerTitles = finalCareers.map(c => c.title).join(', ');
  motivation += `Com base no seu perfil, identificamos que você tem grande potencial para carreiras como ${careerTitles}. `;
  
  if (formData.personalityType === 'criativo') {
    motivation += `Sua criatividade é um diferencial valioso no mercado atual. `;
  } else if (formData.personalityType === 'analitico') {
    motivation += `Seu perfil analítico é altamente valorizado em carreiras estratégicas. `;
  } else if (formData.personalityType === 'social') {
    motivation += `Sua habilidade com pessoas abre portas em diversas profissões. `;
  }
  
  motivation += `Lembre-se: o sucesso profissional vem da combinação entre paixão, dedicação e aprendizado contínuo. Você está no caminho certo!`;

  return {
    topCareers: finalCareers,
    courses,
    skills,
    roadmap,
    opportunities,
    motivation
  };
}