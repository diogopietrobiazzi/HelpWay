const API_BASE_URL = 'https://helpwayapi-production.up.railway.app';

export const api = {
  async createDonation(data: any) {
    const response = await fetch(`${API_BASE_URL}/doacao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Erro ao criar doação');
    }
    return response.json();
  },

  async getDonations() {
    const response = await fetch(`${API_BASE_URL}/doacao`);
    if (!response.ok) {
      throw new Error('Erro ao buscar doações');
    }
    return response.json();
  },

  async getDonationById(id: number) {
    const response = await fetch(`${API_BASE_URL}/doacao/${id}`);
    if (!response.ok) {
      throw new Error('Doação não encontrada');
    }
    return response.json();
  },

  async updateDonation(id: number, data: any) {
    const response = await fetch(`${API_BASE_URL}/doacao/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Erro ao atualizar doação');
    }
    return response.json();
  },

  async updateDonationLocation(id: number, locationData: any) {
    const response = await fetch(`${API_BASE_URL}/doacao/${id}/localizacao`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(locationData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Erro ao atualizar localização da doação');
    }
    return response.json();
  },

  async createUser(data: any) {
    const response = await fetch(`${API_BASE_URL}/usuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Erro ao criar usuário');
    }
    return response.json();
  },

  async updateUser(id: number, data: any) {
    const response = await fetch(`${API_BASE_URL}/usuario/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Erro ao atualizar usuário');
    }
    return response.json();
  },

  async getUserById(id: string) {
    const res = await fetch(`${API_BASE_URL}/usuario/${id}`);
    if (!res.ok) throw new Error('Usuário não encontrado');
    return res.json();
  },

  async getUserByUsername(username: string) {
    const res = await fetch(`${API_BASE_URL}/usuario/nome/${username}`);
    if (!res.ok) throw new Error('Usuário não encontrado');
    return res.json();
  },

  async getUserByEmail(email: string) {
    const res = await fetch(`${API_BASE_URL}/usuario/email/${email}`);
    if (!res.ok) throw new Error('Usuário não encontrado');
    return res.json();
  },
};