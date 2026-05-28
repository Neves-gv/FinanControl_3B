const documentacao = {
  openapi: '3.0.3',
  info: {
    title: 'API Financeira - FinanControl',
    description: 'Documentação da API de gerenciamento financeiro - FinanControl',
    version: '1.0.0'
  },
  servers: [
    { url: 'http://localhost:3000', description: 'localhost' },
    { url: 'https://api-murex-one-28.vercel.app', description: 'vercel' }
  ],
  tags: [
    { name: 'Usuários', description: 'Operações relacionadas aos usuários' },
    { name: 'Categorias', description: 'Operações relacionadas as categorias' },
    { name: 'Subcategorias', description: 'Operações relacionadas as subcategorias' },
    { name: 'Transações', description: 'Operações relacionadas as transações' },
    { name: 'Dashboard', description: 'Operações relacionadas ao dashboard' }
  ],
  paths: {
    "/usuarios": {
      get: {
        tags: ["Usuários"],
        summary: "Listar todos os usuários",
        security: [
          {
            bearerAuth: []
          }
        ],
        responses: {
          200: {
            description: "Dados obtidos com sucesso!",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: '#/components/schemas/Listar_Usuarios' }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Usuários'],
        summary: 'Cadastrar novo usuário',
        security: [
          {
            bearerAuth: []
          }
        ],
        description: "Recebe nome, email, senha para cadastrar novo usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cadastrar_Usuario" }
            }
          }
        },
        responses: {
          201: { description: "Usuário cadastrado com sucesso!" },
          500: { description: "Erro interno no servidor" }
        }
      }
    },
    "/usuarios/{id_usuario}": {
      put: {
        tags: ['Usuários'],
        summary: 'Atualizar todos os dados do usuário',
        security: [
          {
            bearerAuth: []
          }
        ],
        description: 'Atualiza todos os dados de um usuário existente, é necessário enviar todos os campos',
        parameters: [
          {
            name: "id_usuario",
            in: "path",
            required: true,
            description: "ID do usuário a ser atualizado",
            schema: { type: 'integer', example: 1 }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Atualizar_Usuario" },
              example: {
                nome: "Ricardo Santos",
                email: "ricardo5@sesisp.com",
                senha: "senhaAtualizada"
              }
            }
          }
        },
        responses: {
          201: { description: "Usuário atualizado com sucesso!" },
          404: {
            description: "Usuário não encontrado",
            content: {
              "application/json": {
                example: { message: "Usuário não encontrado" }
              }
            }
          },
          500: { description: "Erro interno no servidor" }
        }
      },
      delete: {
        tags: ['Usuários'],
        summary: 'Remover Usuário',
        security: [
          {
            bearerAuth: []
          }
        ],
        description: 'Remove usuário existente pelo ID',
        parameters: [
          {
            name: "id_usuario",
            in: "path",
            required: true,
            description: "ID do usuário a ser removido",
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          200: { description: "Usuário removido com sucesso!" },
          404: {
            description: "Usuário não encontrado",
            content: {
              "application/json": {
                example: { message: "Usuário não encontrado" }
              }
            }
          },
          500: { description: "Erro interno no servidor" }
        }
      }
    },
    "/login": {
      post: {
        tags: ['Usuários'],
        summary: 'Realizar Login',
        description: "Autentica um usuário e retorna seus dados",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Login_Usuario" }
            }
          }
        },
        responses: {
          200: {
            description: "Login realizado com sucesso!",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Resposta_Login" }
              }
            }
          },
          500: { description: "Erro interno no servidor" }
        }
      }
    },
    "/categorias": {
      get: {
        tags: ["Categorias"],
        summary: "Listar todas as categorias ativas",
        security: [
          {
            bearerAuth: []
          }
        ],
        responses: {
          200: {
            description: "Dados obtidos com sucesso!",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Listar_Categorias" }
                }
              }
            }
          },
          500: { description: "Erro interno no servidor" }
        }
      },
      post: {
        tags: ["Categorias"],
        summary: "Cadastrar nova categoria",
        security: [
          {
            bearerAuth: []
          }
        ],
        description: "Recebe nome, descricao, tipo, cor e icone para cadastrar nova categoria",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cadastrar_Categoria" }
            }
          }
        },
        responses: {
          201: { description: "Categoria cadastrada com sucesso!" },
          500: { description: "Erro interno no servidor" }
        }
      }
    },
    "/categorias/{id_categoria}": {
      put: {
        tags: ["Categorias"],
        summary: "Atualizar todos os dados da categoria",
        security: [
          {
            bearerAuth: []
          }
        ],
        description: "Atualiza todos os campos de uma categoria existente, é necessário enviar todos os campos",
        parameters: [
          {
            name: "id_categoria",
            in: "path",
            required: true,
            description: "ID da categoria a ser atualizada",
            schema: { type: "integer", example: 1 }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cadastrar_Categoria" }
            }
          }
        },
        responses: {
          200: { description: "Categoria atualizada com sucesso!" },
          404: {
            description: "Categoria não encontrada",
            content: {
              "application/json": {
                example: { message: "Categoria não encontrada" }
              }
            }
          },
          500: { description: "Erro interno no servidor" }
        }
      },
      patch: {
        tags: ["Categorias"],
        summary: "Atualizar parcialmente a categoria",
        security: [
          {
            bearerAuth: []
          }
        ],
        description: "Atualiza apenas os campos enviados no corpo da requisição",
        parameters: [
          {
            name: "id_categoria",
            in: "path",
            required: true,
            description: "ID da categoria a ser atualizada",
            schema: { type: "integer", example: 1 }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Patch_Categoria" }
            }
          }
        },
        responses: {
          200: { description: "Categoria atualizada com sucesso!" },
          400: {
            description: "Nenhum campo enviado para atualizar",
            content: {
              "application/json": {
                example: { message: "Nenhum campo a atualizar" }
              }
            }
          },
          404: {
            description: "Categoria não encontrada",
            content: {
              "application/json": {
                example: { message: "Categoria não encontrada" }
              }
            }
          },
          500: { description: "Erro interno no servidor" }
        }
      },
      delete: {
        tags: ["Categorias"],
        summary: "Remover categoria",
        security: [
          {
            bearerAuth: []
          }
        ],
        description: "Desativa uma categoria existente pelo ID (soft delete)",
        parameters: [
          {
            name: "id_categoria",
            in: "path",
            required: true,
            description: "ID da categoria a ser removida",
            schema: { type: "integer", example: 1 }
          }
        ],
        responses: {
          200: { description: "Categoria removida com sucesso!" },
          500: { description: "Erro interno no servidor" }
        }
      }
    },
    "/subcategorias": {
      get: {
        tags: ["Subcategorias"],
        summary: "Listar todas as subcategorias ativas",
        security: [
          {
            bearerAuth: []
          }
        ],
        responses: {
          200: {
            description: "Dados obtidos com sucesso!",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: '#/components/schemas/Listar_Subcategorias' }
                }
              }
            }
          },
          500: { description: "Erro interno no servidor" }
        }
      },
      post: {
        tags: ["Subcategorias"],
        summary: "Cadastrar nova subcategoria",
        security: [
          {
            bearerAuth: []
          }
        ],
        description: "Recebe nome e id_categoria para cadastrar uma nova subcategoria",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cadastrar_Subcategoria" }
            }
          }
        },
        responses: {
          201: { description: "Subcategoria cadastrada com sucesso!" },
          404: {
            description: "Categoria não encontrada",
            content: {
              "application/json": {
                example: { message: "Categoria não encontrada" }
              }
            }
          },
          500: { description: "Erro interno no servidor" }
        }
      }
    },
    "/subcategorias/categoria/{id_categoria}": {
      get: {
        tags: ["Subcategorias"],
        summary: "Listar subcategorias por categoria",
        security: [
          {
            bearerAuth: []
          }
        ],
        description: "Retorna todas as subcategorias ativas vinculadas a uma categoria",
        parameters: [
          {
            name: "id_categoria",
            in: "path",
            required: true,
            description: "ID da categoria para filtrar subcategorias",
            schema: { type: "integer", example: 1 }
          }
        ],
        responses: {
          200: {
            description: "Dados obtidos com sucesso!",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: '#/components/schemas/Listar_Subcategorias' }
                }
              }
            }
          },
          500: { description: "Erro interno no servidor" }
        }
      }
    },
    "/subcategorias/{id_subcategoria}": {
      put: {
        tags: ["Subcategorias"],
        summary: "Atualizar todos os dados da subcategoria",
        security: [
          {
            bearerAuth: []
          }
        ],
        description: "Atualiza todos os dados de uma subcategoria existente, é necessário enviar todos os campos",
        parameters: [
          {
            name: "id_subcategoria",
            in: "path",
            required: true,
            description: "ID da subcategoria a ser atualizada",
            schema: { type: "integer", example: 1 }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Atualizar_Subcategoria" }
            }
          }
        },
        responses: {
          200: { description: "Subcategoria atualizada com sucesso!" },
          404: {
            description: "Subcategoria ou Categoria não encontrada",
            content: {
              "application/json": {
                example: { message: "Subcategoria não encontrada" }
              }
            }
          },
          500: { description: "Erro interno no servidor" }
        }
      },
      patch: {
        tags: ["Subcategorias"],
        summary: "Atualizar parcialmente a subcategoria",
        security: [
          {
            bearerAuth: []
          }
        ],
        description: "Atualiza apenas os campos enviados no corpo da requisição",
        parameters: [
          {
            name: "id_subcategoria",
            in: "path",
            required: true,
            description: "ID da subcategoria a ser atualizada",
            schema: { type: "integer", example: 1 }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Patch_Subcategoria" }
            }
          }
        },
        responses: {
          200: { description: "Subcategoria atualizada com sucesso!" },
          400: {
            description: "Nenhum campo enviado para atualizar",
            content: {
              "application/json": {
                example: { message: "Nenhum campo a atualizar" }
              }
            }
          },
          404: {
            description: "Subcategoria não encontrada",
            content: {
              "application/json": {
                example: { message: "Subcategoria não encontrada" }
              }
            }
          },
          500: { description: "Erro interno no servidor" }
        }
      },
      delete: {
        tags: ["Subcategorias"],
        summary: "Remover subcategoria",
        security: [
          {
            bearerAuth: []
          }
        ],
        description: "Remove (desativa) uma subcategoria existente pelo ID",
        parameters: [
          {
            name: "id_subcategoria",
            in: "path",
            required: true,
            description: "ID da subcategoria a ser removida",
            schema: { type: "integer", example: 1 }
          }
        ],
        responses: {
          200: { description: "Subcategoria removida com sucesso!" },
          500: { description: "Erro interno no servidor" }
        }
      }
    },
    "/transacoes": {
      get: {
        tags: ["Transações"],
        summary: "Listar todas as transações",
        security: [
          {
            bearerAuth: []
          }
        ],
        description: "Retorna todas as transações com nome da categoria e subcategoria",
        responses: {
          200: {
            description: "Dados obtidos com sucesso!",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Listar_Transacoes" }
                }
              }
            }
          },
          500: { description: "Erro interno do servidor" }
        }
      },
      post: {
        tags: ["Transações"],
        summary: "Cadastrar nova transação",
        security: [
          {
            bearerAuth: []
          }
        ],
        description: "Cadastra uma nova transação financeira",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cadastrar_Transacao" }
            }
          }
        },
        responses: {
          201: { description: "Transação cadastrada com sucesso!" },
          500: { description: "Erro interno do servidor" }
        }
      }
    },
    "/transacoes/tipo/{tipo}": {
      get: {
        tags: ["Transações"],
        summary: "Listar transações por tipo",
        security: [
          {
            bearerAuth: []
          }
        ],
        description: "Retorna todas as transações filtradas por tipo. E = Entrada, S = Saída",
        parameters: [
          {
            name: "tipo",
            in: "path",
            required: true,
            description: "Tipo da transação (E = Entrada / S = Saída)",
            schema: { type: "string", enum: ["E", "S"], example: "S" }
          }
        ],
        responses: {
          200: {
            description: "Dados obtidos com sucesso!",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Listar_Transacoes" }
                }
              }
            }
          },
          400: {
            description: "Tipo inválido",
            content: {
              "application/json": {
                example: { message: "Tipo inválido. Use E para Entrada ou S para Saída." }
              }
            }
          },
          500: { description: "Erro interno no servidor" }
        }
      }
    },
    "/transacoes/categoria/{id_categoria}": {
      get: {
        tags: ["Transações"],
        summary: "Listar transações por categoria",
        security: [
          {
            bearerAuth: []
          }
        ],
        description: "Retorna todas as transações de uma categoria específica",
        parameters: [
          {
            name: "id_categoria",
            in: "path",
            required: true,
            description: "ID da categoria para filtrar transações",
            schema: { type: "integer", example: 1 }
          }
        ],
        responses: {
          200: {
            description: "Dados obtidos com sucesso!",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Listar_Transacoes" }
                }
              }
            }
          },
          500: { description: "Erro interno do servidor" }
        }
      }
    },
    "/transacoes/subcategoria/{id_subcategoria}": {
      get: {
        tags: ["Transações"],
        summary: "Listar transações por subcategoria",
        security: [
          {
            bearerAuth: []
          }
        ],
        description: "Retorna todas as transações de uma subcategoria específica",
        parameters: [
          {
            name: "id_subcategoria",
            in: "path",
            required: true,
            description: "ID da subcategoria para filtrar transações",
            schema: { type: "integer", example: 1 }
          }
        ],
        responses: {
          200: {
            description: "Dados obtidos com sucesso!",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Listar_Transacoes" }
                }
              }
            }
          },
          500: { description: "Erro interno do servidor" }
        }
      }
    },
    "/transacoes/periodo": {
      get: {
        tags: ["Transações"],
        summary: "Listar transações por período",
        security: [
          {
            bearerAuth: []
          }
        ],
        description: "Retorna todas as transações entre duas datas. Formato: DD/MM/YYYY",
        parameters: [
          {
            name: "inicio",
            in: "query",
            required: true,
            description: "Data de início do período",
            schema: { type: "string", example: "01/01/2024" }
          },
          {
            name: "fim",
            in: "query",
            required: true,
            description: "Data de fim do período",
            schema: { type: "string", example: "31/01/2024" }
          }
        ],
        responses: {
          200: {
            description: "Dados obtidos com sucesso!",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Listar_Transacoes" }
                }
              }
            }
          },
          400: {
            description: "Datas não informadas",
            content: {
              "application/json": {
                example: { message: "Informe as datas de inicio e fim. Ex: ?inicio=01/01/2024&fim=31/01/2024" }
              }
            }
          },
          500: { description: "Erro interno do servidor" }
        }
      }
    },
    "/transacoes/{id_transacao}": {
      put: {
        tags: ["Transações"],
        summary: "Atualizar todos os dados da transação",
        security: [
          {
            bearerAuth: []
          }
        ],
        description: "Atualiza todos os campos de uma transação existente",
        parameters: [
          {
            name: "id_transacao",
            in: "path",
            required: true,
            description: "ID da transação a ser atualizada",
            schema: { type: "integer", example: 1 }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cadastrar_Transacao" }
            }
          }
        },
        responses: {
          200: { description: "Transação atualizada com sucesso!" },
          404: {
            description: "Transação não encontrada",
            content: {
              "application/json": {
                example: { message: "Transação não encontrada." }
              }
            }
          },
          500: { description: "Erro interno do servidor" }
        }
      },
      delete: {
        tags: ["Transações"],
        summary: "Deletar transação",
        security: [
          {
            bearerAuth: []
          }
        ],
        description: "Remove permanentemente uma transação pelo ID",
        parameters: [
          {
            name: "id_transacao",
            in: "path",
            required: true,
            description: "ID da transação a ser removida",
            schema: { type: "integer", example: 1 }
          }
        ],
        responses: {
          200: { description: "Transação removida com sucesso!" },
          404: {
            description: "Transação não encontrada",
            content: {
              "application/json": {
                example: { message: "Transação não encontrada." }
              }
            }
          },
          500: { description: "Erro interno do servidor" }
        }
      }
    },
    "/transacoes/total": {
      get: {
        tags: ["Transações"],
        summary: "Listar todas as transações",
        security: [
          {
            bearerAuth: []
          }
        ],
        description: "Retorna todos os valores com base no tipo infomado(E/S) ",
        parameters: [
          {
            name: "tipo",
            in: "query",
            required: true,
            description: "Tipo de transação: E para Entradas ou S para Saídas",
            schema: {
              type: "string",
              enum: ["E", "S"],
              example: "E"
            }
          }
        ],
        responses: {
          200: {
            description: "Dados obtidos com sucesso!",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Total_Transacoes" }
                }
              }
            }
          },
          500: { description: "Erro interno do servidor" }
        }
      }
    },
    "/dashboard": {
      "get": {
        "summary": "Obtém todos os dados consolidados do dashboard",
        security: [
          {
            bearerAuth: []
          }
        ],
        "description": "Retorna o resumo do mês atual, gastos por categoria, maiores despesas, evolução mensal e as transações mais recentes em uma única chamada.",
        "responses": {
          "200": {
            "description": "Dados do dashboard retornados com sucesso.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "resumoMesAtual": {
                      "type": "object",
                      "properties": {
                        "entradas": { "type": "number", "example": 5500.00 },
                        "saidas": { "type": "number", "example": 3200.50 },
                        "saldo": { "type": "number", "example": 2299.50 }
                      }
                    },
                    "categorias": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "nome": { "type": "string", "example": "Alimentação" },
                          "total": { "type": "number", "example": 1250.00 }
                        }
                      }
                    },
                    "maioresGastos": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "descricao": { "type": "string", "example": "Aluguel" },
                          "valor": { "type": "number", "example": 1500.00 },
                          "data": { "type": "string", "example": "10/05/2026" }
                        }
                      }
                    },
                    "evolucaoMensal": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "mes": { "type": "string", "example": "05/2026" },
                          "entradas": { "type": "number", "example": 5500.00 },
                          "saidas": { "type": "number", "example": 3200.50 }
                        }
                      }
                    },
                    "ultimasTransacoes": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "descricao": { "type": "string", "example": "Supermercado" },
                          "valor": { "type": "number", "example": 180.30 },
                          "tipo": { "type": "string", "example": "S", "description": "E para Entrada, S para Saída" },
                          "data": { "type": "string", "example": "17/05/2026" }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT obtido no login'
        }
      },
      schemas: {
        Listar_Usuarios: {
          type: 'object',
          properties: {
            id: { type: "integer", example: 1 },
            nome: { type: "string", example: "Ricardo" },
            email: { type: "string", example: "ricardo@email.com" }
          }
        },
        Cadastrar_Usuario: {
          type: 'object',
          properties: {
            nome: { type: "string", example: "Ricardo" },
            email: { type: "string", example: "ricardo2@email.com" },
            senha: { type: "string", example: "Senha123" }
          }
        },
        Atualizar_Usuario: {
          type: 'object',
          required: ["nome", "email", "senha"],
          properties: {
            nome: { type: "string", example: "Nina" },
            email: { type: "string", example: "nina@email.com" },
            senha: { type: "string", example: "Senha123" }
          }
        },
        Login_Usuario: {
          type: 'object',
          required: ['email', 'senha'],
          properties: {
            email: { type: "string", example: "ricardo2@email.com" },
            senha: { type: "string", example: "Senha123" }
          }
        },
        Resposta_Login: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Login realizado com sucesso' },
            token: { type: 'string', description: 'Token JWT gerado', example: 'eyJhbGciOiJIUzI1Ni...' },
            usuario: {
              type: 'object',
              properties: {
                id_usuario: { type: "integer", example: 1 },
                nome: { type: "string", example: 'Ricardo' },
                email: { type: "string", example: "ricardo@email.com" }
              }
            }
          }
        },
        Listar_Categorias: {
          type: "object",
          properties: {
            id_categoria: { type: "integer", example: 1 },
            nome: { type: "string", example: "Saúde" },
            descricao: { type: "string", example: "Gastos com saúde" },
            tipo: { type: "string", enum: ["E", "S"], example: "S" },
            cor: { type: "string", example: "#FF5733" },
            icone: { type: "string", example: "heart" },
            ativo: { type: "boolean", example: true }
          }
        },
        Cadastrar_Categoria: {
          type: "object",
          required: ["nome", "tipo"],
          properties: {
            nome: { type: "string", example: "Saúde" },
            descricao: { type: "string", example: "Gastos com saúde" },
            tipo: { type: "string", enum: ["E", "S"], example: "S" },
            cor: { type: "string", example: "#FF5733" },
            icone: { type: "string", example: "heart" }
          }
        },
        Patch_Categoria: {
          type: "object",
          properties: {
            nome: { type: "string", example: "Saúde" },
            descricao: { type: "string", example: "Gastos com saúde" },
            tipo: { type: "string", enum: ["E", "S"], example: "S" },
            cor: { type: "string", example: "#FF5733" },
            icone: { type: "string", example: "heart" }
          }
        },
        Listar_Subcategorias: {
          type: "object",
          properties: {
            id_subcategoria: { type: "integer", example: 1 },
            nome: { type: "string", example: "Consulta Médica" },
            ativo: { type: "boolean", example: true },
            id_categoria: { type: "integer", example: 2 }
          }
        },
        Cadastrar_Subcategoria: {
          type: "object",
          required: ["nome", "id_categoria"],
          properties: {
            nome: { type: "string", example: "Consulta Médica" },
            id_categoria: { type: "integer", example: 2 }
          }
        },
        Atualizar_Subcategoria: {
          type: "object",
          required: ["nome", "id_categoria"],
          properties: {
            nome: { type: "string", example: "Exame de Sangue" },
            id_categoria: { type: "integer", example: 2 }
          }
        },
        Patch_Subcategoria: {
          type: "object",
          properties: {
            nome: { type: "string", example: "Exame de Sangue" },
            id_categoria: { type: "integer", example: 3 }
          }
        },
        Listar_Transacoes: {
          type: "object",
          properties: {
            id_transacao: { type: "integer", example: 1 },
            valor: { type: "number", example: 150.00 },
            descricao: { type: "string", example: "Consulta médica" },
            data_registro: { type: "string", example: "15/01/2024 10:30:00" },
            data_vencimento: { type: "string", example: "20/01/2024" },
            data_pagamento: { type: "string", example: "18/01/2024" },
            tipo: { type: "string", enum: ["E", "S"], example: "S" },
            id_categoria: { type: "integer", example: 2 },
            nome_categoria: { type: "string", example: "Saúde" },
            id_subcategoria: { type: "integer", example: 5 },
            nome_subcategoria: { type: "string", example: "Consulta Médica" }
          }
        },
        Cadastrar_Transacao: {
          type: "object",
          required: ["valor", "tipo"],
          properties: {
            valor: { type: "number", example: 150.00 },
            descricao: { type: "string", example: "Consulta médica" },
            data_vencimento: { type: "string", example: "20/01/2024" },
            data_pagamento: { type: "string", example: "18/01/2024" },
            tipo: { type: "string", enum: ["E", "S"], example: "S" },
            id_subcategoria: { type: "integer", example: 5 },
            id_categoria: { type: "integer", example: 2 }
          }
        },
        Total_Transacoes: {
          type: "object",
          properties: {
            total: {
              type: "number",
              format: "float",
              example: 1550.10,
              description: "Soma total dos valores das transações filtradas"
            }
          }
        }
      }
    }
  }
}

export default documentacao;