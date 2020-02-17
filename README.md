# 418
Rate my dorm

## Workflow
As we are working on this app together we should use git branches to work simultaneously without interfering with each others changes. #Develop# has been set as the default branch.

### Master Branch
This branch should only contain code that is currently *live*. Our definition of live may be a bit different considering this is a school project, but ideally changes that are completed during a sprint should probably be merged here at the end of the sprint.

### Develop Branch
This branch should always contain working content, but the content is not fully released yet. Once a feature/fix is completed it should be merged into #develop#.

### Feature/Bugfix Branches
When you select a new task to work on, you should first checkout the #develop# branch, and create your own branch off of it. For example, if I am working on creating a footer for the site I would first checkout #develop# then create a new branch with a name such as #feature/footer_page#. This way we have a descriptive name for what the branch contains, and also your branch will contain all changes currently merged into the #develop# branch.
