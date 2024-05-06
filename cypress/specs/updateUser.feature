Feature: Update a User
    As an admin, I want to be able to update a user's information.

    Scenario: Updating a user by dashboard page after successful login
        Given I am logged in with username and password before the update process
        When I  access the user update from
        And I fill the username, firstname, lastname,personalNumber, email, phone, password fields
        Then I click on the update button to complete the update 
