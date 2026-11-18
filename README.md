# Fernando Multimarcas: site (esqueleto fm1)

Site estático em `public/`. Publicação: Cloudflare Workers (assets), `wrangler.jsonc` na raiz.

- Estoque de exemplo: `public/estoque.json` (cada carro tem id, nome, ano, km, preço, tipo, status, foto).
- Está com `noindex` e `robots.txt` bloqueado: liberar só quando o site for ao ar.
- Próximos passos: fotos reais, Worker que lê a planilha do Google e gera a página de cada carro para o Facebook.
