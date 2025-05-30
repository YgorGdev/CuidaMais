
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Users, Plus, Search, Edit, Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Resident {
  id: string;
  name: string;
  age: number;
  gender: string;
  room: string;
  admissionDate: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalConditions: string;
  status: 'ativo' | 'transferido' | 'falecido';
}

const Residents = () => {
  const [residents, setResidents] = useState<Resident[]>([
    {
      id: '1',
      name: 'Maria Silva',
      age: 78,
      gender: 'Feminino',
      room: 'A-101',
      admissionDate: '2023-01-15',
      emergencyContact: 'João Silva (Filho)',
      emergencyPhone: '(11) 99999-1234',
      medicalConditions: 'Hipertensão, Diabetes',
      status: 'ativo'
    },
    {
      id: '2',
      name: 'Pedro Santos',
      age: 82,
      gender: 'Masculino',
      room: 'B-205',
      admissionDate: '2022-11-03',
      emergencyContact: 'Ana Santos (Filha)',
      emergencyPhone: '(11) 99999-5678',
      medicalConditions: 'Alzheimer inicial',
      status: 'ativo'
    },
    {
      id: '3',
      name: 'Rosa Oliveira',
      age: 75,
      gender: 'Feminino',
      room: 'A-103',
      admissionDate: '2023-03-20',
      emergencyContact: 'Carlos Oliveira (Neto)',
      emergencyPhone: '(11) 99999-9876',
      medicalConditions: 'Artrite, Osteoporose',
      status: 'ativo'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    room: '',
    admissionDate: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalConditions: '',
    status: 'ativo' as const
  });

  const filteredResidents = residents.filter(resident =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.gender || !formData.room) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const newResident: Resident = {
      id: editingResident?.id || Date.now().toString(),
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      room: formData.room,
      admissionDate: formData.admissionDate || new Date().toISOString().split('T')[0],
      emergencyContact: formData.emergencyContact,
      emergencyPhone: formData.emergencyPhone,
      medicalConditions: formData.medicalConditions,
      status: formData.status
    };

    if (editingResident) {
      setResidents(residents.map(r => r.id === editingResident.id ? newResident : r));
      toast({
        title: "Sucesso",
        description: "Residente atualizado com sucesso!"
      });
    } else {
      setResidents([...residents, newResident]);
      toast({
        title: "Sucesso",
        description: "Residente cadastrado com sucesso!"
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      gender: '',
      room: '',
      admissionDate: '',
      emergencyContact: '',
      emergencyPhone: '',
      medicalConditions: '',
      status: 'ativo'
    });
    setEditingResident(null);
  };

  const handleEdit = (resident: Resident) => {
    setEditingResident(resident);
    setFormData({
      name: resident.name,
      age: resident.age.toString(),
      gender: resident.gender,
      room: resident.room,
      admissionDate: resident.admissionDate,
      emergencyContact: resident.emergencyContact,
      emergencyPhone: resident.emergencyPhone,
      medicalConditions: resident.medicalConditions,
      status: resident.status
    });
    setIsDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'transferido': return 'bg-yellow-100 text-yellow-800';
      case 'falecido': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Residentes</h1>
              <p className="text-gray-600">Gerenciamento de residentes do asilo</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Novo Residente
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingResident ? 'Editar Residente' : 'Cadastrar Novo Residente'}
                </DialogTitle>
                <DialogDescription>
                  Preencha as informações do residente
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Digite o nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Idade *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      placeholder="Digite a idade"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gender">Gênero *</Label>
                    <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o gênero" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Masculino">Masculino</SelectItem>
                        <SelectItem value="Feminino">Feminino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="room">Quarto *</Label>
                    <Input
                      id="room"
                      value={formData.room}
                      onChange={(e) => setFormData({...formData, room: e.target.value})}
                      placeholder="Ex: A-101"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="admissionDate">Data de Admissão</Label>
                    <Input
                      id="admissionDate"
                      type="date"
                      value={formData.admissionDate}
                      onChange={(e) => setFormData({...formData, admissionDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="transferido">Transferido</SelectItem>
                        <SelectItem value="falecido">Falecido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyContact">Contato de Emergência</Label>
                    <Input
                      id="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                      placeholder="Nome e parentesco"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyPhone">Telefone de Emergência</Label>
                    <Input
                      id="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={(e) => setFormData({...formData, emergencyPhone: e.target.value})}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="medicalConditions">Condições Médicas</Label>
                  <Textarea
                    id="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={(e) => setFormData({...formData, medicalConditions: e.target.value})}
                    placeholder="Descreva as condições médicas relevantes"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    {editingResident ? 'Atualizar' : 'Cadastrar'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-gray-400" />
          <Input
            placeholder="Buscar por nome ou quarto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{residents.filter(r => r.status === 'ativo').length}</div>
              <p className="text-sm text-gray-600">Ativos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">{residents.filter(r => r.status === 'transferido').length}</div>
              <p className="text-sm text-gray-600">Transferidos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-600">{residents.filter(r => r.status === 'falecido').length}</div>
              <p className="text-sm text-gray-600">Falecidos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{residents.length}</div>
              <p className="text-sm text-gray-600">Total</p>
            </CardContent>
          </Card>
        </div>

        {/* Residents List */}
        <div className="grid gap-4">
          {filteredResidents.map((resident) => (
            <Card key={resident.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{resident.name}</h3>
                      <p className="text-sm text-gray-600">{resident.age} anos • {resident.gender} • Quarto {resident.room}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(resident.status)}>
                      {resident.status.charAt(0).toUpperCase() + resident.status.slice(1)}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(resident)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Admissão:</span>
                    <span className="ml-2 text-gray-600">
                      {new Date(resident.admissionDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Contato:</span>
                    <span className="ml-2 text-gray-600">{resident.emergencyContact}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Telefone:</span>
                    <span className="ml-2 text-gray-600">{resident.emergencyPhone}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Condições:</span>
                    <span className="ml-2 text-gray-600">{resident.medicalConditions || 'Nenhuma'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResidents.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum residente encontrado</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Tente ajustar os filtros de busca.' : 'Cadastre o primeiro residente para começar.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Residents;
