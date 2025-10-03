# Work Done

## 1️⃣ User & UserProfile Module Creation

First, I created the User and UserProfile modules.

* In the User module, I added basic user details like username, email, password, and role.
* In the UserProfile module, I added profile details like first name, last name, and age.

Initially, these modules were independent.

## 2️⃣ One-to-One Relation Establishment

Then, I established a one-to-one relation between User and UserProfile.

**Benefit**:

* Each user has exactly one profile.
* Related profiles are automatically managed during creation or deletion.

## 3️⃣ Service Layer and Business Logic Testing

I explored and tested the service layer and business logic methods.

* In UserService, I created methods to add, find, update, and remove users.
* In UserProfileService, I created methods to add, find, update, remove profiles, and perform advanced searches.

I tested all service methods to ensure they return the expected results and handle errors correctly.

## 4️⃣ Password Encryption Hook

For security, I added hooks to encrypt the password before saving or updating a user.

**Benefit**:

* Passwords are stored securely in the database.
* Double hashing is avoided.
* Password verification at login is easy.

## 5️⃣ TypeORM Queries Exploration

I explored advanced TypeORM search and query methods.

**Benefit**:

* Allows performing complex searches and optimizations.
