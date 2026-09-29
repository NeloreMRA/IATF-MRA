# IATF MRA

Sistema de gestão reprodutiva (IATF, matrizes, estoque de sêmen, embriões, FIV) em um único arquivo: `index.html` (HTML + CSS + JS, dados no Firebase/Firestore).
`backups/` e `scripts/backup.js` são gerados pelo backup diário automático (`.github/workflows/backup.yml`) — não editar à mão.

## Fluxo de trabalho
- O dono do projeto autorizou: depois de testar, **abrir o PR e fazer o merge no `main` direto**, sem pedir confirmação.
- Antes de começar uma mudança nova, atualizar o branch a partir do `main` (o backup diário faz commits no `main` todo dia).
- Testar no navegador antes de enviar (todas as telas abrindo sem erro).

## Preferências do usuário
- Responder em português, de forma simples (usuário não é programador).
- Excel exportado sempre como planilha comum: sem formatação de tabela, cores, filtros ou painel congelado.
- Telas enxutas: evitar textos longos de explicação (a ajuda fica no botão "?" de cada tela).
- Estação nova começa em branco; só Estoque de Sêmen e Embriões são compartilhados entre estações.
