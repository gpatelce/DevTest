# Salesforce Developer Technical Assignment


## User Story 1

  As an end user, I want to able to access a web page to input my South Africa ID Number to check if
there are any important public holidays on my date of birth.

##### Acceptance Criteria

1. A web page with an input field to input an ID Number.
2. An info / description section on the web page to provide information as to what the page
does.
3. A search button that will be used to execute a “Search” action.

Public Web Page:
[LWR Public Page](https://sfadmincom-dev-ed.develop.my.site.com) [https://sfadmincom-dev-ed.develop.my.site.com]

<img width="1421" alt="image" src="https://user-images.githubusercontent.com/36921526/229933504-fcba43e1-795d-4856-a829-7b681be4d681.png">




## User Story 2
  As an end user, I must enter a valid South Africa ID Number before I can submit a search action so that value can decoded into its relevant parts / information.

#### Acceptance Criteria

1. The search button should be disabled until a valid ID number is input.
2. The validity of the ID number must be determined based on the below publication describing how to validate an ID number.
3. A message or prompt should be displayed when an invalid ID number is input.

<img width="1422" alt="image" src="https://user-images.githubusercontent.com/36921526/229933666-9d752634-ebbc-4f54-a27e-a33f8ef110bf.png">




## User Story 3

As a developer, I want to ensure we store information extracted key information about an ID number and a count of searches for a given ID number so that we can track how often the specific ID number is queried.

#### Acceptance Criteria

1. Only valid ID number searches should be stored in the database in a table.
2. The ID number itself should be a unique key / reference for future updates.
3. Decoded information about the ID number must be stored against the record in the
database.
4. A counter on the record must be incremented each time a visitor searches using the same SA ID number.


<img width="1414" alt="image" src="https://user-images.githubusercontent.com/36921526/229935183-ae0e237c-4e91-4ab0-abdb-17547b1530d3.png">



## User Story 4
As an end user, I want to know what the banking / public holidays there are for the year of a given ID
number so that I can display the results back to the visitor.

#### Acceptance Criteria
1. After saving or updating the ID record in User Story 3, the Calendarific API should be called to retrieve a list of banking / public holidays.
2. The list of all banking / public holidays should be displayed back to the visitor on the page.


<img width="1402" alt="image" src="https://user-images.githubusercontent.com/36921526/229935002-f40aedda-8e7a-40ff-8925-bc6ffe4984ee.png">


