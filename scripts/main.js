class GreenScreenApp extends Application {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "greenScreenDice",
      template: "modules/green-screen-dice/templates/dice-display.html",
      resizable: true,
      width: 400,
      height: 300
    });
  }

  async showResult(result) {
    this.data.result = result;
    this.render(true);
    
    // Oculta após X segundos (configurável)
    setTimeout(() => this.hideResult(), game.settings.get("green-screen-dice", "displayTime"));
  }

  hideResult() {
    this.data.result = "";
    this.render(true);
  }
}

// Inicialização
Hooks.once("init", () => {
  game.greenScreen = new GreenScreenApp();
  
  // Configurações
  game.settings.register("green-screen-dice", "displayTime", {
    name: "Tempo de Exibição (ms)",
    scope: "world",
    config: true,
    default: 5000,
    type: Number
  });
});

// Captura rolagens
Hooks.on("createChatMessage", (message) => {
  if (message.isRoll && message.roll) {
    const result = message.roll.total; // Número puro
    game.greenScreen.showResult(result);
  }
});
