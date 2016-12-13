Feature: Package Verification
  In order to gain confidence in cucumber-browser-preset-myob releases
  As a contributor
  I want scenarios using the features of the library to be supported

  Scenario: Page Object Support
    Given there are resources
    When I navigate to the Resource List page
    Then I see resources

  Scenario: Flow Object Support
    Given there are resources
    When I view a resource
    Then I am on the Resource page

  Scenario: Stub Support
    Given there are no resources
    When I navigate to the Resource List page
    Then I see no resources
