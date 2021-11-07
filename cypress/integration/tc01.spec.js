
describe('TC-01 - Login function', () => {

        beforeEach(() => {
            cy.visit(Cypress.config().baseUrl)
        })

        it('Leave email and password fields empty. Click Log In button', () => {

            clickLogInButton();

            assertEmailFieldValidation('Email can\'t be blank')
            assertPasswordFieldValidation('Password can\'t be blank')
        })

        it('Type incorrect email address and incorrect password. Click Log In button', () => {

            fillFormAndSubmit('user.email.com','user')
            assertEmailFieldValidation('Email is invalid')
        })

        it('Type correct and existing email address and incorrect password. Click Log In button', () => {

            fillFormAndSubmit('user@email.com','user')
            cy.get('.error-box-array').should('contain.text', 'Invalid email or password.')
        })

        it('Type correct and existing email address without password. Click Log In button', () => {

            cy.get('#user_email').type('user@email.com')
            clickLogInButton();

            assertEmailFieldValidationNotExist()
            assertPasswordFieldValidation('Password can\'t be blank')
        })

        it('Leave email field empty and type existing password. Click Log In button', () => {

            cy.get('#user_password').type('Qwerty123')
            clickLogInButton()
            assertEmailFieldValidation('Email can\'t be blank')
        })

        it('Type correct and existing email address and correct password', () => {

            fillFormAndSubmit('user@email.com','Qwerty123')
            cy.get('#collapse-content').should('exist')
        })
    })

function fillFormAndSubmit (email, password) {
    cy.get('#user_email').type(email)
    cy.get('#user_password').type(password)
    clickLogInButton();
}

function clickLogInButton () {
    cy.get('#log_in').click()
}

function assertEmailFieldValidation (errorMessage) {
    cy.get('#email-error').should('contain.text', errorMessage)
    cy.get('#user_email').should('have.attr','aria-invalid')
}

function assertPasswordFieldValidation (errorMessage) {
    cy.get('#password-error').should('contain.text', errorMessage)
    cy.get('#user_password').should('have.attr', 'aria-invalid')
}

function assertEmailFieldValidationNotExist() {
    cy.get('#user_email').should('not.have.attr','aria-invalid')
    }





