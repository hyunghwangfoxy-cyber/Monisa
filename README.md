# Monisa

Uma plataforma de estudos em português com uma tutora de IA, perfis pessoais e preferências de acessibilidade. As preferências foram pensadas para acomodar diferentes maneiras de aprender, sem exigir informações sobre diagnósticos.

## Recursos

- Cadastro, confirmação de e-mail, login, recuperação de senha e saída com Netlify Identity.
- Chat de estudos pelo Netlify AI Gateway, com explicações curtas, detalhadas ou passo a passo e opção de linguagem simples.
- Perfil com nome, apresentação, interesse de estudo e foto privada em JPG, PNG ou WebP de até 2 MB.
- Temas escuro, claro e alto contraste; tamanhos de texto; redução de movimento; modo foco e lembretes silenciosos de pausa.
- Perfil, preferências e mensagens salvos no Netlify Database. Fotos armazenadas no Netlify Blobs.

## Desenvolvimento

Instale as dependências com `npm ci` e execute `netlify dev --port 8889`. Use o servidor Netlify, não apenas o Vite, para disponibilizar os endpoints e os serviços da plataforma.

Execute `npm run typecheck` para validar a aplicação e as funções sem gerar arquivos de build. A publicação automática usa o comando de build definido em `netlify.toml`.

## Serviços e configuração

O Netlify Identity precisa estar habilitado no projeto. O script de ativação foi executado durante a implementação. Novas contas recebem um e-mail de confirmação antes de entrar. As contas antigas do Firebase não foram migradas automaticamente; é necessário criar uma conta no novo sistema. Nenhuma credencial deve ser adicionada ao código do navegador.

O chat usa o SDK OpenAI exclusivamente em uma Netlify Function, com o modelo `gpt-4.1-mini` através do AI Gateway. As credenciais e o endereço do Gateway são fornecidos pelo Netlify, não pelo navegador. A conta precisa ter acesso ao Gateway e créditos disponíveis. Falhas do serviço são mostradas sem apagar a pergunta. Durante a validação local, a obtenção do acesso ao Gateway retornou `Forbidden`, portanto a geração real de respostas não foi validada.

O esquema do banco fica em `db/schema.ts`. As migrações ficam em `netlify/database/migrations` e são aplicadas pelo Netlify no deploy. Ao alterar o esquema, gere uma nova migração com `npx drizzle-kit generate --name nome_descritivo`. As dependências Drizzle foram instaladas pela linha `beta`, exigida pelo adaptador Netlify Database.

## Endpoints privados

| Endpoint | Métodos | Finalidade |
| --- | --- | --- |
| `/api/profile` | GET, PUT | Consultar e atualizar o próprio perfil e preferências |
| `/api/avatar` | GET, POST, DELETE | Consultar, enviar ou remover a própria foto |
| `/api/chat` | GET, POST, DELETE | Recuperar as últimas 24 mensagens, perguntar à IA ou apagar a conversa |

Todos os endpoints exigem uma sessão válida. Alterações exigem origem correspondente ao site. A API valida campos, tamanho e formato das fotos, e aplica um limite persistente de 20 perguntas por usuário a cada janela de 15 minutos. Mensagens e fotos não são expostas em URLs públicas de armazenamento.

As mensagens são armazenadas na conta e enviadas ao serviço de IA para gerar respostas. Apenas a conversa e as preferências de explicação são enviadas: a foto, a apresentação e o e-mail não são incluídos no pedido à IA. A pessoa pode apagar toda a conversa pela interface. O relógio de pausa pertence à sessão atual de estudo; a preferência de intervalo é salva na conta.
