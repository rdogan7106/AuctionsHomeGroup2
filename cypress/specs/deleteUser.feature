Feature: Delete a User
    As an admin, I want to be able to delete a user.
    Background:
        Given I am logged in with username. and password.
        
    Scenario: Deleting a user by dashboard page after successful login       
        When I click on the User link in the side menu while in my Dashboard Panel
        And I click on the delete icon for the first user in the User table
        Then the user should be deleted from the system
