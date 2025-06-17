*** Settings ***
Documentation    Validando Login Com Usuario Cadastrado


*** Test Cases ***
Login Com Email e Senha Corretos.
    Given que estou na tela de login.
    When informo o usuario ''.
        And informo a senha ''.
    Then confirmo o login.
        And deve apresentar a tela inicial.
