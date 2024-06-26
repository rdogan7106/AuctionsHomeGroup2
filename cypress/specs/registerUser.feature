Feature: Register New User

  As an admin, I want to be able to register a new user.

  Scenario: Registering a new user by dashboard page after successful login
    Given I have logged in as an admin with username and password before registration
    When I have accessed on the Dashboard link in the navbar
    And I click on the User link in the side menu
    And I click on the add icon in the User table 
    And I fill the username field
    And I fill the firstname field
    And I fill the lastname field
    And I fill the personal number field
    And I fill the email field
    And I fill the phone field
    And I fill the password field
    Then I click on the register button to complete the registration
