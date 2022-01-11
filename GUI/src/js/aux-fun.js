export function changeTheme() {
  var baseTheme = document.getElementsByClassName("theme-base");
  var enfasisTheme = document.getElementsByClassName("theme-enfasis");

  if (enfasisTheme != null && enfasisTheme.length > 0) {
    Array.from(baseTheme).forEach(function (element) {
      element.classList.add("theme-base-dark");
      element.classList.remove("theme-base");
    });
    Array.from(enfasisTheme).forEach(function (element) {
      element.classList.add("theme-enfasis-dark");
      element.classList.remove("theme-enfasis");
    });
  } else {
    var baseThemeDark = document.getElementsByClassName("theme-base-dark");
    var enfasisThemeDark = document.getElementsByClassName("theme-enfasis-dark");

    Array.from(baseThemeDark).forEach(function (element) {
      element.classList.add("theme-base");
      element.classList.remove("theme-base-dark");
    });

    Array.from(enfasisThemeDark).forEach(function (element) {
      element.classList.add("theme-enfasis");
      element.classList.remove("theme-enfasis-dark");
    });
  }
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const moduloAuxiliar = { changeTheme, sleep };

export default moduloAuxiliar;
