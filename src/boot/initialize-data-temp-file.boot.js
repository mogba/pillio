import { SessionStorage } from "quasar";

export default () => {
  // Centralizar aqui as configurações de dados iniciais necessários 
  // para o funcionamento do sistema. Isso é temporário e deve ser
  // substituído pelos dados retornados do backend.

  SessionStorage.set("isLoggedIn", true);
  SessionStorage.set("isNotConfiguredYet", false);
};