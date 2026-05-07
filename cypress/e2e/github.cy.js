describe("GitHub E2E Tests", () => {
  const email = Cypress.env("GITHUB_EMAIL");
  const password = Cypress.env("GITHUB_PASSWORD");
  const username = Cypress.env("GITHUB_USERNAME");
  const repoName = Cypress.env("GITHUB_REPO_NAME");

  beforeEach(() => {
    cy.session("github-session", () => {
      cy.visit("/login");
      cy.get("#login_field").type(email);
      cy.get("#password").type(password);
      cy.get('[name="commit"]').click();
      cy.url().should("eq", "https://github.com/");
    });
  });

  it("Valida autenticação e redirecionamento", () => {
    cy.visit("/");
    cy.url().should("eq", "https://github.com/");
    cy.get(`[data-login="${username}"]`).should("be.visible");
  });

  it("Valida nome do usuário abaixo da foto de perfil", () => {
    cy.visit("/");
    cy.get(`[data-login="${username}"]`).click();
    cy.contains(username).should("be.visible");
    cy.get("body").click(0, 0);
  });

  it("Navega até Repositories e acessa um repositório aleatório", () => {
    cy.visit(`/${username}?tab=repositories`);
    cy.get('a[itemprop="name codeRepository"]').first().click();
    cy.url().should("include", `/${username}`);
  });

  it("Navega até a aba Pull Requests", () => {
    cy.visit(`/${username}/teste-cypress/pulls`);
    cy.url().should("include", "pulls");
  });

  it("Cria um novo repositório usando XPath", () => {
  const repoName = `repo-teste-${Date.now()}`;

  cy.intercept("POST", "**/repositories/check-name").as("checkName");
  cy.visit("/new");
  cy.xpath('//input[@id="repository-name-input"]')
    .should("be.visible")
    .clear()
    .type(repoName);
  cy.wait("@checkName");
  cy.xpath('//main//form//button[@type="submit"]')
    .should("contain.text", "Create repository")
    .and("be.visible")
    .and("not.be.disabled")
    .click();
  cy.url({ timeout: 20000 })
    .should("include", `/${username}/${repoName}`);
});

  it("Realiza logout e valida", () => {
  cy.visit("/");
  cy.get(`[data-login="${username}"]`).click();
  cy.xpath('//a[@href="/logout"]').click();
  cy.url().should("include", "/logout");
  cy.xpath('//input[@value="Sign out"]').click();
  cy.location("pathname", { timeout: 10000 }).should("eq", "/");
});
});