
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Activity, Plus, Clock, Users, Target, Play, Pause, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ActivityItem {
  id: string;
  name: string;
  type: 'fisica' | 'mental' | 'social' | 'recreativa' | 'terapeutica';
  description: string;
  duration: number; // em minutos
  maxParticipants: number;
  responsible: string;
  materials: string;
  objectives: string;
  frequency: string;
  status: 'planejada' | 'andamento' | 'concluida' | 'cancelada';
  scheduledDate: string;
  scheduledTime: string;
  participants: string[];
}

const Activities = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      name: 'Fisioterapia em Grupo',
      type: 'fisica',
      description: 'Exercícios de mobilidade e fortalecimento muscular',
      duration: 45,
      maxParticipants: 8,
      responsible: 'Dra. Ana Fisioterapeuta',
      materials: 'Colchonetes, pesos leves, bolas',
      objectives: 'Melhorar mobilidade e força muscular',
      frequency: 'Terças e quintas, 15:00',
      status: 'andamento',
      scheduledDate: '2024-01-15',
      scheduledTime: '15:00',
      participants: ['Maria Silva', 'Pedro Santos', 'Rosa Oliveira']
    },
    {
      id: '2',
      name: 'Bingo da Memória',
      type: 'mental',
      description: 'Jogo de bingo com perguntas sobre memórias pessoais',
      duration: 60,
      maxParticipants: 15,
      responsible: 'Psicóloga Clara',
      materials: 'Cartelas de bingo, questões personalizadas',
      objectives: 'Estimular memória e socialização',
      frequency: 'Sextas, 16:00',
      status: 'planejada',
      scheduledDate: '2024-01-17',
      scheduledTime: '16:00',
      participants: []
    },
    {
      id: '3',
      name: 'Jardinagem Terapêutica',
      type: 'terapeutica',
      description: 'Cuidado das plantas do jardim interno',
      duration: 90,
      maxParticipants: 6,
      responsible: 'Terapeuta João',
      materials: 'Ferramentas de jardim, vasos, sementes',
      objectives: 'Reduzir ansiedade e promover bem-estar',
      frequency: 'Segundas, 10:00',
      status: 'concluida',
      scheduledDate: '2024-01-13',
      scheduledTime: '10:00',
      participants: ['Maria Silva', 'Rosa Oliveira']
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ActivityItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'recreativa' as const,
    description: '',
    duration: '',
    maxParticipants: '',
    responsible: '',
    materials: '',
    objectives: '',
    frequency: '',
    status: 'planejada' as const,
    scheduledDate: '',
    scheduledTime: ''
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fisica': return 'bg-green-100 text-green-800';
      case 'mental': return 'bg-blue-100 text-blue-800';
      case 'social': return 'bg-purple-100 text-purple-800';
      case 'recreativa': return 'bg-yellow-100 text-yellow-800';
      case 'terapeutica': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planejada': return 'bg-blue-100 text-blue-800';
      case 'andamento': return 'bg-orange-100 text-orange-800';
      case 'concluida': return 'bg-green-100 text-green-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planejada': return <Clock className="w-4 h-4" />;
      case 'andamento': return <Play className="w-4 h-4" />;
      case 'concluida': return <CheckCircle className="w-4 h-4" />;
      case 'cancelada': return <Pause className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'fisica': return 'Física';
      case 'mental': return 'Mental';
      case 'social': return 'Social';
      case 'recreativa': return 'Recreativa';
      case 'terapeutica': return 'Terapêutica';
      default: return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'planejada': return 'Planejada';
      case 'andamento': return 'Em Andamento';
      case 'concluida': return 'Concluída';
      case 'cancelada': return 'Cancelada';
      default: return status;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.duration) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const newActivity: ActivityItem = {
      id: editingActivity?.id || Date.now().toString(),
      name: formData.name,
      type: formData.type,
      description: formData.description,
      duration: parseInt(formData.duration),
      maxParticipants: parseInt(formData.maxParticipants) || 0,
      responsible: formData.responsible,
      materials: formData.materials,
      objectives: formData.objectives,
      frequency: formData.frequency,
      status: formData.status,
      scheduledDate: formData.scheduledDate,
      scheduledTime: formData.scheduledTime,
      participants: editingActivity?.participants || []
    };

    if (editingActivity) {
      setActivities(activities.map(a => a.id === editingActivity.id ? newActivity : a));
      toast({
        title: "Sucesso",
        description: "Atividade atualizada com sucesso!"
      });
    } else {
      setActivities([...activities, newActivity]);
      toast({
        title: "Sucesso",
        description: "Atividade cadastrada com sucesso!"
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'recreativa',
      description: '',
      duration: '',
      maxParticipants: '',
      responsible: '',
      materials: '',
      objectives: '',
      frequency: '',
      status: 'planejada',
      scheduledDate: '',
      scheduledTime: ''
    });
    setEditingActivity(null);
  };

  const handleEdit = (activity: ActivityItem) => {
    setEditingActivity(activity);
    setFormData({
      name: activity.name,
      type: activity.type,
      description: activity.description,
      duration: activity.duration.toString(),
      maxParticipants: activity.maxParticipants.toString(),
      responsible: activity.responsible,
      materials: activity.materials,
      objectives: activity.objectives,
      frequency: activity.frequency,
      status: activity.status,
      scheduledDate: activity.scheduledDate,
      scheduledTime: activity.scheduledTime
    });
    setIsDialogOpen(true);
  };

  const updateActivityStatus = (id: string, newStatus: ActivityItem['status']) => {
    setActivities(activities.map(a => 
      a.id === id ? { ...a, status: newStatus } : a
    ));
    toast({
      title: "Status atualizado",
      description: `Atividade marcada como ${getStatusLabel(newStatus).toLowerCase()}`
    });
  };

  const stats = {
    total: activities.length,
    planejadas: activities.filter(a => a.status === 'planejada').length,
    andamento: activities.filter(a => a.status === 'andamento').length,
    concluidas: activities.filter(a => a.status === 'concluida').length
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Atividades</h1>
              <p className="text-gray-600">Gerenciamento de atividades terapêuticas e recreativas</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Nova Atividade
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingActivity ? 'Editar Atividade' : 'Cadastrar Nova Atividade'}
                </DialogTitle>
                <DialogDescription>
                  Preencha as informações da atividade
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome da Atividade *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Digite o nome da atividade"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Tipo *</Label>
                    <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fisica">Física</SelectItem>
                        <SelectItem value="mental">Mental</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="recreativa">Recreativa</SelectItem>
                        <SelectItem value="terapeutica">Terapêutica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Descreva a atividade"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="duration">Duração (min) *</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="60"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxParticipants">Máx. Participantes</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      value={formData.maxParticipants}
                      onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
                      placeholder="10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planejada">Planejada</SelectItem>
                        <SelectItem value="andamento">Em Andamento</SelectItem>
                        <SelectItem value="concluida">Concluída</SelectItem>
                        <SelectItem value="cancelada">Cancelada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="scheduledDate">Data Programada</Label>
                    <Input
                      id="scheduledDate"
                      type="date"
                      value={formData.scheduledDate}
                      onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="scheduledTime">Horário</Label>
                    <Input
                      id="scheduledTime"
                      type="time"
                      value={formData.scheduledTime}
                      onChange={(e) => setFormData({...formData, scheduledTime: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="responsible">Responsável</Label>
                  <Input
                    id="responsible"
                    value={formData.responsible}
                    onChange={(e) => setFormData({...formData, responsible: e.target.value})}
                    placeholder="Nome do profissional responsável"
                  />
                </div>

                <div>
                  <Label htmlFor="frequency">Frequência</Label>
                  <Input
                    id="frequency"
                    value={formData.frequency}
                    onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                    placeholder="Ex: Segundas e quartas, 14:00"
                  />
                </div>

                <div>
                  <Label htmlFor="materials">Materiais Necessários</Label>
                  <Input
                    id="materials"
                    value={formData.materials}
                    onChange={(e) => setFormData({...formData, materials: e.target.value})}
                    placeholder="Liste os materiais necessários"
                  />
                </div>

                <div>
                  <Label htmlFor="objectives">Objetivos</Label>
                  <Textarea
                    id="objectives"
                    value={formData.objectives}
                    onChange={(e) => setFormData({...formData, objectives: e.target.value})}
                    placeholder="Quais os objetivos desta atividade?"
                    rows={2}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    {editingActivity ? 'Atualizar' : 'Cadastrar'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <p className="text-sm text-gray-600">Total de Atividades</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">{stats.planejadas}</div>
              <p className="text-sm text-gray-600">Planejadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">{stats.andamento}</div>
              <p className="text-sm text-gray-600">Em Andamento</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{stats.concluidas}</div>
              <p className="text-sm text-gray-600">Concluídas</p>
            </CardContent>
          </Card>
        </div>

        {/* Activities List */}
        <div className="grid gap-4">
          {activities.map((activity) => (
            <Card key={activity.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{activity.name}</CardTitle>
                      <CardDescription className="flex items-center space-x-2">
                        <Badge className={getTypeColor(activity.type)}>
                          {getTypeLabel(activity.type)}
                        </Badge>
                        <span>•</span>
                        <span>{activity.duration} min</span>
                        {activity.responsible && (
                          <>
                            <span>•</span>
                            <span>{activity.responsible}</span>
                          </>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(activity.status)}>
                      {getStatusIcon(activity.status)}
                      <span className="ml-1">{getStatusLabel(activity.status)}</span>
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(activity)}
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {activity.description && (
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {activity.scheduledDate && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        {new Date(activity.scheduledDate).toLocaleDateString('pt-BR')}
                        {activity.scheduledTime && ` às ${activity.scheduledTime}`}
                      </span>
                    </div>
                  )}
                  
                  {activity.maxParticipants > 0 && (
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        {activity.participants.length}/{activity.maxParticipants} participantes
                      </span>
                    </div>
                  )}
                  
                  {activity.frequency && (
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{activity.frequency}</span>
                    </div>
                  )}
                  
                  {activity.materials && (
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{activity.materials}</span>
                    </div>
                  )}
                </div>

                {activity.objectives && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-1">Objetivos:</h4>
                    <p className="text-sm text-blue-800">{activity.objectives}</p>
                  </div>
                )}

                {activity.participants.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Participantes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {activity.participants.map((participant, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {participant}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Status Actions */}
                <div className="mt-4 flex space-x-2">
                  {activity.status === 'planejada' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateActivityStatus(activity.id, 'andamento')}
                      className="text-orange-600 border-orange-200 hover:bg-orange-50"
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Iniciar
                    </Button>
                  )}
                  {activity.status === 'andamento' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateActivityStatus(activity.id, 'concluida')}
                      className="text-green-600 border-green-200 hover:bg-green-50"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Concluir
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {activities.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma atividade cadastrada</h3>
              <p className="text-gray-600">
                Cadastre a primeira atividade para começar.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Activities;
