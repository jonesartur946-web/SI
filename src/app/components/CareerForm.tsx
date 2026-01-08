import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Briefcase, Heart, TrendingUp, Users, Sparkles } from 'lucide-react';

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

interface CareerFormProps {
  onSubmit: (data: CareerFormData) => void;
  isLoading: boolean;
}

export function CareerForm({ onSubmit, isLoading }: CareerFormProps) {
  const [formData, setFormData] = useState<CareerFormData>({
    currentLevel: '',
    interests: [],
    skills: [],
    workStyle: '',
    salary: '',
    personalityType: '',
    dreamCareer: '',
    strengths: '',
    concerns: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const interests = [
    'Tecnologia',
    'Saúde',
    'Educação',
    'Arte e Design',
    'Negócios',
    'Ciências',
    'Comunicação',
    'Engenharia',
    'Direito',
    'Ambiente',
    'Esportes',
    'Culinária'
  ];

  const skills = [
    'Criatividade',
    'Lógica',
    'Comunicação',
    'Liderança',
    'Organização',
    'Empatia',
    'Análise de Dados',
    'Trabalho em Equipe'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nível Atual */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <TrendingUp className="w-4 h-4" />
          Qual seu nível acadêmico atual?
        </Label>
        <Select value={formData.currentLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, currentLevel: value }))}>
          <SelectTrigger className="border-[#10b981]">
            <SelectValue placeholder="Selecione seu nível" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fundamental">Cursando Ensino Fundamental</SelectItem>
            <SelectItem value="medio">Cursando Ensino Médio</SelectItem>
            <SelectItem value="medio-completo">Ensino Médio Completo</SelectItem>
            <SelectItem value="superior">Cursando Ensino Superior</SelectItem>
            <SelectItem value="superior-completo">Ensino Superior Completo</SelectItem>
            <SelectItem value="pos">Pós-Graduação</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Áreas de Interesse */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <Heart className="w-4 h-4" />
          Áreas de Interesse
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {interests.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => handleInterestToggle(interest)}
              className={`p-3 rounded-lg border-2 transition-all text-sm ${
                formData.interests.includes(interest)
                  ? 'bg-[#10b981] text-white border-[#10b981]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#10b981]'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Habilidades */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <Sparkles className="w-4 h-4" />
          Suas Principais Habilidades
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {skills.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => handleSkillToggle(skill)}
              className={`p-3 rounded-lg border-2 transition-all ${
                formData.skills.includes(skill)
                  ? 'bg-[#f59e0b] text-white border-[#f59e0b]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#f59e0b]'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Estilo de Trabalho */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <Users className="w-4 h-4" />
          Como você prefere trabalhar?
        </Label>
        <Select value={formData.workStyle} onValueChange={(value) => setFormData(prev => ({ ...prev, workStyle: value }))}>
          <SelectTrigger className="border-[#10b981]">
            <SelectValue placeholder="Escolha seu estilo de trabalho" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="equipe">Em equipe, colaborando com outros</SelectItem>
            <SelectItem value="independente">Independente, com autonomia</SelectItem>
            <SelectItem value="lideranca">Liderando e gerenciando pessoas</SelectItem>
            <SelectItem value="hibrido">Híbrido (equipe e trabalho solo)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tipo de Personalidade */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <Heart className="w-4 h-4" />
          Você se considera mais...
        </Label>
        <Select value={formData.personalityType} onValueChange={(value) => setFormData(prev => ({ ...prev, personalityType: value }))}>
          <SelectTrigger className="border-[#10b981]">
            <SelectValue placeholder="Escolha o que mais combina com você" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="analitico">Analítico e orientado a dados</SelectItem>
            <SelectItem value="criativo">Criativo e inovador</SelectItem>
            <SelectItem value="pratico">Prático e orientado a resultados</SelectItem>
            <SelectItem value="social">Social e voltado para pessoas</SelectItem>
            <SelectItem value="empreendedor">Empreendedor e com espírito de negócios</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Expectativa Salarial */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-[#1e3a8a]">
          <Briefcase className="w-4 h-4" />
          Expectativa de Remuneração Futura
        </Label>
        <Select value={formData.salary} onValueChange={(value) => setFormData(prev => ({ ...prev, salary: value }))}>
          <SelectTrigger className="border-[#10b981]">
            <SelectValue placeholder="Qual sua expectativa?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flexivel">Flexível - priorizo satisfação pessoal</SelectItem>
            <SelectItem value="media">Salário médio do mercado</SelectItem>
            <SelectItem value="alta">Remuneração acima da média</SelectItem>
            <SelectItem value="muito-alta">Altas remunerações são prioridade</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Carreira dos Sonhos */}
      <div className="space-y-2">
        <Label htmlFor="dreamCareer" className="text-[#1e3a8a]">
          Se pudesse escolher, qual seria sua carreira ideal?
        </Label>
        <Input
          id="dreamCareer"
          placeholder="Ex: Médico, Programador, Designer, Advogado, Professor..."
          value={formData.dreamCareer}
          onChange={(e) => setFormData(prev => ({ ...prev, dreamCareer: e.target.value }))}
          className="border-[#10b981]"
        />
      </div>

      {/* Pontos Fortes */}
      <div className="space-y-2">
        <Label htmlFor="strengths" className="text-[#1e3a8a]">
          Quais são seus maiores pontos fortes?
        </Label>
        <Textarea
          id="strengths"
          placeholder="Ex: Sou bom em resolver problemas, tenho facilidade para aprender novas tecnologias, me comunico bem..."
          value={formData.strengths}
          onChange={(e) => setFormData(prev => ({ ...prev, strengths: e.target.value }))}
          className="border-[#10b981] min-h-[80px]"
        />
      </div>

      {/* Preocupações */}
      <div className="space-y-2">
        <Label htmlFor="concerns" className="text-[#1e3a8a]">
          Quais suas preocupações sobre o futuro profissional?
        </Label>
        <Textarea
          id="concerns"
          placeholder="Ex: Não sei qual curso fazer, tenho medo de não conseguir emprego, quero estabilidade..."
          value={formData.concerns}
          onChange={(e) => setFormData(prev => ({ ...prev, concerns: e.target.value }))}
          className="border-[#10b981] min-h-[80px]"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading || !formData.currentLevel || formData.interests.length === 0}
        className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white py-6 text-lg"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Analisando seu perfil...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Gerar Recomendações de Carreira
          </span>
        )}
      </Button>
    </form>
  );
}
