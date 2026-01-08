import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { BookOpen, Sparkles, Target, Clock } from 'lucide-react';

interface FormData {
  gradeLevel: string;
  subjects: string[];
  studyTime: string;
  learningStyle: string;
  goals: string;
  challenges: string;
}

interface RecommendationFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export function RecommendationForm({ onSubmit, isLoading }: RecommendationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    gradeLevel: '',
    subjects: [],
    studyTime: '',
    learningStyle: '',
    goals: '',
    challenges: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const subjects = [
    'Matemática',
    'Português',
    'Física',
    'Química',
    'Biologia',
    'História',
    'Geografia',
    'Inglês'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nível de Ensino */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <BookOpen className="w-4 h-4" />
          Nível de Ensino
        </Label>
        <Select value={formData.gradeLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, gradeLevel: value }))}>
          <SelectTrigger className="border-[#3b82f6]">
            <SelectValue placeholder="Selecione seu nível" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fundamental1">Ensino Fundamental I (1º ao 5º ano)</SelectItem>
            <SelectItem value="fundamental2">Ensino Fundamental II (6º ao 9º ano)</SelectItem>
            <SelectItem value="medio">Ensino Médio</SelectItem>
            <SelectItem value="pre-vestibular">Pré-Vestibular</SelectItem>
            <SelectItem value="superior">Ensino Superior</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Matérias de Interesse */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <Target className="w-4 h-4" />
          Matérias de Interesse
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {subjects.map((subject) => (
            <button
              key={subject}
              type="button"
              onClick={() => handleSubjectToggle(subject)}
              className={`p-3 rounded-lg border-2 transition-all ${
                formData.subjects.includes(subject)
                  ? 'bg-[#3b82f6] text-white border-[#3b82f6]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#3b82f6]'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* Tempo Disponível */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <Clock className="w-4 h-4" />
          Tempo Disponível por Dia
        </Label>
        <Select value={formData.studyTime} onValueChange={(value) => setFormData(prev => ({ ...prev, studyTime: value }))}>
          <SelectTrigger className="border-[#3b82f6]">
            <SelectValue placeholder="Quanto tempo você pode estudar?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30min">30 minutos</SelectItem>
            <SelectItem value="1h">1 hora</SelectItem>
            <SelectItem value="2h">2 horas</SelectItem>
            <SelectItem value="3h">3 horas</SelectItem>
            <SelectItem value="4h+">4 horas ou mais</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Estilo de Aprendizagem */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <Sparkles className="w-4 h-4" />
          Como você aprende melhor?
        </Label>
        <Select value={formData.learningStyle} onValueChange={(value) => setFormData(prev => ({ ...prev, learningStyle: value }))}>
          <SelectTrigger className="border-[#3b82f6]">
            <SelectValue placeholder="Escolha seu estilo de aprendizagem" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="visual">Visual (vídeos, diagramas, imagens)</SelectItem>
            <SelectItem value="auditivo">Auditivo (áudios, explicações faladas)</SelectItem>
            <SelectItem value="leitura">Leitura/Escrita (livros, resumos, textos)</SelectItem>
            <SelectItem value="pratico">Prático (exercícios, experimentos)</SelectItem>
            <SelectItem value="misto">Misto (combinação de vários)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Objetivos */}
      <div className="space-y-2">
        <Label htmlFor="goals" className="text-[#1e3a8a]">
          Quais são seus objetivos?
        </Label>
        <Textarea
          id="goals"
          placeholder="Ex: Melhorar minhas notas em Matemática, passar no vestibular, aprender inglês..."
          value={formData.goals}
          onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
          className="border-[#3b82f6] min-h-[80px]"
        />
      </div>

      {/* Desafios */}
      <div className="space-y-2">
        <Label htmlFor="challenges" className="text-[#1e3a8a]">
          Quais são suas maiores dificuldades?
        </Label>
        <Textarea
          id="challenges"
          placeholder="Ex: Dificuldade para me concentrar, não sei por onde começar, tenho dúvidas em tópicos específicos..."
          value={formData.challenges}
          onChange={(e) => setFormData(prev => ({ ...prev, challenges: e.target.value }))}
          className="border-[#3b82f6] min-h-[80px]"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading || !formData.gradeLevel || formData.subjects.length === 0}
        className="w-full bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white py-6 text-lg"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processando com IA...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Gerar Recomendações Personalizadas
          </span>
        )}
      </Button>
    </form>
  );
}
