# Advice Health Challenge: Gerenciador de Tarefas

## 📋 Descrição do Desafio

Desenvolver uma aplicação web de gerenciamento de tarefas (To-Do List) com funcionalidades avançadas. O foco está na qualidade do código, boas práticas de desenvolvimento e arquitetura, além da entrega de um produto funcional.

### 📝 Requisitos

#### Funcionalidades Obrigatórias (20 pontos)

- [x] **CRUD de Tarefas** (5 pts)
- [x] **Cadastro e Login de Usuário** (5 pts)
- [x] **Marcar tarefas como concluídas/não concluídas** (2 pts)
- [x] **Filtragem de tarefas por status, prioridade ou prazo** (1 pt)
- [x] **Paginação de tarefas** (1 pt)
- [x] **Frontend em React (Next.js)** (3 pts)
- [x] **Backend com Django REST Framework** (3 pts)

#### Funcionalidades Opcionais (10 pontos)

- [x] **Categorias para tarefas** (2 pts)
- [x] **Compartilhamento de tarefas com outros usuários** (2 pts)
- [x] **Aplicação dockerizada (Docker + Docker Compose)** (3 pts)
- [x] **Testes unitários com pytest no backend** (3 pts)

---

## 🚀 Instruções para Rodar o Projeto

### Pré-requisitos

- Docker e Docker Compose instalados
- (Opcional para ambiente local): Python 3.10+, Node.js 18+

### Usando Docker

```bash
# Na raiz do projeto
docker-compose up --build
```

- Backend: http://localhost:8000/

- Frontend: http://localhost:3000/

- Admin (Django): http://localhost:8000/admin/

### Executar Localmente (sem Docker)

#### Backend

```bash
cd backend
python -m venv env
source env/bin/activate  # ou .\env\Scripts\activate no Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

### 🔁 Endpoints da API

Prefixo da API: `/api/`
🧑 Usuários
| Método | Rota | Descrição |
| ------ | -------------- | ----------------------------------------------- |
| POST | `/users/` | Registro de novo usuário |
| POST | `/token/` | Obter token JWT |
| GET | `/users/list/` | Listar todos os usuários (exceto o autenticado) |

✅ Tarefas
| Método | Rota | Descrição |
| --------- | ----------------------- | -------------------------------- |
| GET | `/tasks/` | Listar tarefas do usuário |
| POST | `/tasks/` | Criar nova tarefa |
| GET | `/tasks/<id>/` | Detalhes de uma tarefa |
| PUT/PATCH | `/tasks/<id>/` | Atualizar tarefa |
| DELETE | `/tasks/<id>/` | Deletar tarefa |
| PATCH | `/tasks/<id>/complete/` | Marcar como concluída |
| POST | `/tasks/<id>/share/` | Compartilhar com outros usuários |

#### 🧪 Testes

Os testes são feitos com pytest + pytest-django.

##### Executar Testes

```bash
cd backend
pytest
```

#### 🏗️ Arquitetura e Decisões de Design

🔹 Backend (Django REST Framework):

- Estrutura organizada em apps: users, tasks, api
- JWT para autenticação
- Serializers, ViewSets e Routers para facilitar extensões futuras
- Uso de permissions customizadas para acesso seguro às tarefas
- Cobertura com testes unitários usando pytest e APIClient
- Suporte a compartilhamento de tarefas via ManyToManyField

🔹 Frontend (Next.js + TailwindCSS)

- Interface reativa e responsiva
- Uso de React Query para gerenciamento de dados assíncronos
- Login persistente via JWT + cookies
- Separação clara entre páginas, componentes e serviços (API)

🔹 Docker

- Compose com 3 serviços: web (backend), frontend e db (PostgreSQL)
- Volumes persistentes para dados do banco
- Configuração de wait-for-it.sh para garantir inicialização correta
- Ideal para desenvolvimento local com isolamento completo

#### 📌 Regras de Negócio

- Tarefas são ordenadas por prazo e status de conclusão
- Tarefas com prazo vencido não podem ser marcadas como concluídas
- O autor de uma tarefa pode compartilhá-la com outros usuários
- Apenas o autor pode editar/excluir tarefas

#### 📧 Entrega

O projeto deve ser enviado para o e-mail rh@advicehealth.com.br com o link do repositório Git. Lembre-se:

- Commits pequenos e significativos
- README completo
- Priorização da qualidade do código

#### 👨‍💻 Autor

Desenvolvido por Gabriel Dantas.
