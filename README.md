# Work Done

## 1️⃣ User & UserProfile Module Creation
First, we created the User and UserProfile modules.

- **User module**: added basic user details like `username`, `email`, `password`, `role`.
- **UserProfile module**: added profile details like `firstName`, `lastName`, `age`.

Initially, these modules were independent.

## 2️⃣ One-to-One Relation Establishment
Then, we established a one-to-one relation between User and UserProfile.

**User entity**:
```typescript
@OneToOne(() => UserProfile, profile => profile.user, { cascade: true, onDelete: 'CASCADE' })
profile: UserProfile;
```

**UserProfile entity**:
```typescript
@OneToOne(() => User, user => user.profile)
@JoinColumn()
user: User;
```

**Benefit**:
- Each user has exactly one profile.
- Cascade and delete automatically manage related profiles.

## 3️⃣ Service Layer Testing
We explored and tested service files / business logic.

- **UserService**: `create`, `findAll`, `findById`, `update`, `remove` methods.
- **UserProfileService**: `create`, `findAll`, `findOne`, `update`, `remove` + advanced search methods.

We verified that methods returned expected results.

## 4️⃣ Password Encryption Hook
For security, we added hooks in the User entity:
```typescript
@BeforeInsert()
@BeforeUpdate()
async hashPassword() {
  if (this.password && !this.password.startsWith('$2')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
```

**Benefit**:
- Password stored encrypted in the database.
- Avoids double hashing.
- Easy password verification at login using `bcrypt.compare`.

## 5️⃣ TypeORM Queries Exploration
We explored advanced TypeORM search and query methods:

**Find with `where` clause**:
```typescript
this.profileRepo.find({ where: { firstName }, relations: ['user'] });
```

**Native query**:
```typescript
this.profileRepo.query('SELECT * FROM user_profile WHERE firstName = ?', [firstName]);
```

**Benefit**:
- Enables complex searches and optimizations.

