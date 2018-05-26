- [ ] Ingredients
- [ ] list of departments
- [ ] test ACL
- [ ] get ultimate gl
- [ ] test if server working
- [ ] create new GL

- [ ] add user
- [ ] find user
- [ ] test if AT works

I think you can start from writing some test coverage for this project.
Writing tests is a good habit in software development.
It also gives you some understanding about project structure and basic API routes.



Some sort of first steps is to get tests from cutstream or ercipe-api repositories
https://github.com/atherdon/cutstream-api/tree/master/test

Before read articles from #210 - Testing section


Install req. packages for testing. follow example from cutstream.
 For a first time just take "a look-a-round" it'll be ok to have 5-10-15-20 tests, related to this functionality: **IS admin was user created?**, **do we have an ultimate list imported?**,
**this list have ingredients?**, **does ingredient A(by name) have a departmentId included **, **if we pass Ultimate GL Id and department ID, how much ingredients will we have**
add to readme explanation how to run tests, also create a fast run script at nodejs files

after making some Grocery model methods as Remote methods - we'll extend tests.

https://github.com/GroceriStar/groceristar/issues/294
https://github.com/atherdon/loopback-data-importer/issues/1
https://github.com/GroceriStar/groceristar/issues/294
