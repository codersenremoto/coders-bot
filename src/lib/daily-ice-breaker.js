import { getCurrentWeekDay } from "./utils.js";

const fridayBreaker = `¡Hey Coders! ¡Ya es viernes! 😎 😎 😎 
Espero que haya sido una muy buena semana y que paséis un muy bien merecido finde. 🎉

¿Te animas y nos cuentas cual ha sido tu highlight de la semana? Todo vale, libro, post, noticia, herramienta, sitio...
https://media.giphy.com/media/utUEJY2cXzVvnrB152/giphy.gif`;

const iceBreakerPerDay = {
  friday: fridayBreaker,
}


export function iceBreakerForToday() {
  const weekDay = getCurrentWeekDay();

  return iceBreakerPerDay[weekDay];
}
