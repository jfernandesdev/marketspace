# Marketspace <img src="https://github.com/jfernandesdev/marketspace/blob/efab1ab636871fe9ec72b011c7fab64b25c86a3f/mobile/src/assets/logoIcon.svg" style="width: 100px;"/>

### Descrição : 
Um aplicativo de anúncio de produtos estilo OLX

- [x] Login e cadastro de usuários;
- [x] Gerenciamento de produtos (cadastro, edição, exclusão, ativar/desativar);
- [x] Listagem de produtos com busca e filtros;
- [x] Gerenciamento de múltiplas imagens;
- [x] Integração API.

---

### Principais tecnologias utilizadas: 🚀

- Mobile:
  - Expo | ~51.0.28
  - React Native | 0.74.5
  - Typescript | ~5.3.3 -D
  - @Gluestack-ui | ^1.1.34
  - React Hook Form | ^7.53.0
  - Yup | ^1.4.0
  - Axios | ^1.7.7
  - Async Storage | 1.23.1

- API:
  - Prisma | ^4.6.1
  - Express | ^4.18.2
  - Jsonwebtoken | ^8.5.1
  - Multer | ^1.4.5-lts.1
  - Sqlite3 | ^5.1.2

---

## Screens 📲

| Onboard | SignIn | SignUp | Home | Filter |
| --- | --- | --- | --- | --- |
| <img src="https://github.com/jfernandesdev/marketspace/blob/efab1ab636871fe9ec72b011c7fab64b25c86a3f/mobile/assets/screendocs/onboard.jpg" width="250px" /> | <img src="https://github.com/jfernandesdev/marketspace/blob/efab1ab636871fe9ec72b011c7fab64b25c86a3f/mobile/assets/screendocs/signin.jpg"  width="250px" /> | <img src="https://github.com/jfernandesdev/marketspace/blob/efab1ab636871fe9ec72b011c7fab64b25c86a3f/mobile/assets/screendocs/signup.jpg"  width="250px" /> | <img src="https://github.com/jfernandesdev/marketspace/blob/efab1ab636871fe9ec72b011c7fab64b25c86a3f/mobile/assets/screendocs/home.jpg"  width="250px" /> | <img src="https://github.com/jfernandesdev/marketspace/blob/efab1ab636871fe9ec72b011c7fab64b25c86a3f/mobile/assets/screendocs/filter.jpg"  width="250px" /> |

---

| MyAds | Details | Add Ad | Preview | Delete |
| --- | --- | --- | --- | --- |
| <img src="https://github.com/jfernandesdev/marketspace/blob/efab1ab636871fe9ec72b011c7fab64b25c86a3f/mobile/assets/screendocs/my-ads.jpg"  width="250px" /> | <img src="https://github.com/jfernandesdev/marketspace/blob/efab1ab636871fe9ec72b011c7fab64b25c86a3f/mobile/assets/screendocs/details.jpg"  width="250px" /> | <img src="https://github.com/jfernandesdev/marketspace/blob/efab1ab636871fe9ec72b011c7fab64b25c86a3f/mobile/assets/screendocs/add-ad.jpg"  width="250px" /> | <img src="https://github.com/jfernandesdev/marketspace/blob/efab1ab636871fe9ec72b011c7fab64b25c86a3f/mobile/assets/screendocs/preview.jpg"  width="250px" /> | <img src="https://github.com/jfernandesdev/marketspace/blob/efab1ab636871fe9ec72b011c7fab64b25c86a3f/mobile/assets/screendocs/delete.jpg"  width="250px" /> |

---

### Rodando a API localmente (Porta 3333): 🔌

- Pré-requisitos: Node.js v18 instalado.

1. **Clone o repositório e instale as dependências:**
   ```bash
   git clone https://github.com/jfernandesdev/marketspace.git
   cd marketspace/api
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   - Renomeie o arquivo `.env-example` para `.env`.
   - No arquivo `.env`, defina o `JWT_SECRET` com um valor de sua preferência.

3. **Executar as migration do banco de dados:**
   ```bash
   npm run migrate-run
   ```

4. **Carregar os dados iniciais (formas de pagamentos):**
   ```bash
   npm run seed-run
   ```

5. **Visualizar o banco de dados (opcional):**
   - Use o Beekeeper Studio ou outro cliente SQL para acessar o banco de dados local na pasta `database`.

---

### Rodando o App Mobile: 📱

1. **Instalar as dependências:**
   ```bash
   cd marketspace/mobile
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   - Renomeie o arquivo `.env-example` para `.env`.
   - No arquivo `.env`, configure `BASE_URL` com o endereço IP local da sua máquina seguido de `:3333` (para o dispositivo físico ter acesso).

3. **Iniciar o app:**
   - Com o emulador aberto ou um dispositivo físico conectado via USB, execute:
     ```bash
     npx expo start
     ```

<img src="https://i.ibb.co/Yckq764/footer-signature.png" alt="footer-signature" border="0"  width='400px' />
