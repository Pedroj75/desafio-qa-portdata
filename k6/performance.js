import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = "https://github.com";
const EMAIL = __ENV.GITHUB_EMAIL;
const PASSWORD = __ENV.GITHUB_PASSWORD;
const USERNAME = __ENV.GITHUB_USERNAME;

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const loginPage = http.get(`${BASE_URL}/login`);
  check(loginPage, {
    "login page status 200": (r) => r.status === 200,
  });

  const token = loginPage
    .html()
    .find('input[name="authenticity_token"]')
    .first()
    .attr("value");

  const jar = http.cookieJar();

  const loginResponse = http.post(
    `${BASE_URL}/session`,
    {
      commit: "Sign in",
      authenticity_token: token,
      login: EMAIL,
      password: PASSWORD,
    },
    { jar }
  );

  check(loginResponse, {
    "login bem-sucedido": (r) => r.status === 200 || r.status === 302,
    "tempo de login abaixo de 3s": (r) => r.timings.duration < 3000,
  });

  sleep(1);

  const repoPage = http.get(`${BASE_URL}/${USERNAME}?tab=repositories`, { jar });
  check(repoPage, {
    "aba repositories respondeu": (r) => r.status > 0,
    "tempo de repositories abaixo de 3s": (r) => r.timings.duration < 3000,
  });

  sleep(1);

  const logoutPage = http.get(`${BASE_URL}/logout`, { jar });
  check(logoutPage, {
    "logout status 200 ou 302": (r) => r.status === 200 || r.status === 302,
    "tempo de logout abaixo de 3s": (r) => r.timings.duration < 3000,
  });
}